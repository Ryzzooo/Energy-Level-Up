/* ===== TTS ENERGY QUEST ENGINE ===== */
const TTS_CATS = {
    energi: { label: '⚡ Energi Terbarukan' },
    ssi: { label: '🧠 SSI & Argumentasi' },
    lingkungan: { label: '🌍 Lingkungan' }
};
const tts = { built: false, bound: false, level: 0, cur: null, cells: {}, words: {}, order: [], wrongKeys: new Set(), sound: false, tab: 'across', audio: null, toastT: null };
const TTS_RANKS = ['Pemula Energi 🌱', 'Pejuang Surya ☀️', 'Penjaga Bumi 🌍', 'Master Transisi Energi ⚡'];

function ttsFmt(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
}
function ttsKey(r, c) { return `${r},${c}`; }
function ttsWordCells(w) {
    const out = [];
    for (let i = 0; i < w.word.length; i++) {
        out.push(w.dir === 'across' ? ttsKey(w.row, w.col + i) : ttsKey(w.row + i, w.col));
    }
    return out;
}

function ttsBuild() {
    tts.cells = {}; tts.words = {}; tts.order = [];
    tts.cur.words.forEach(w => {
        tts.words[w.id] = w;
        tts.order.push(w.id);
        ttsWordCells(w).forEach((k, i) => {
            if (!tts.cells[k]) tts.cells[k] = { key: k, answer: w.word[i], words: [], num: null };
            tts.cells[k].words.push(w.id);
            if (i === 0) tts.cells[k].num = w.num;
        });
    });
    // Papan
    const board = document.getElementById('ttsBoardContainer');
    board.style.gridTemplateColumns = `repeat(${tts.cur.cols}, minmax(0, 1fr))`;
    let html = '';
    for (let r = 0; r < tts.cur.rows; r++) {
        for (let c = 0; c < tts.cur.cols; c++) {
            const k = ttsKey(r, c);
            const cell = tts.cells[k];
            if (!cell) { html += `<div class="tts-cell blank" aria-hidden="true"></div>`; continue; }
            html += `<button type="button" class="tts-cell" data-k="${k}" id="ttsc-${r}-${c}" role="gridcell" aria-label="Baris ${r + 1} kolom ${c + 1}">${cell.num ? `<span class="tts-num">${cell.num}</span>` : ''}<span class="tts-ch"></span></button>`;
        }
    }
    board.innerHTML = html;
    if (!tts.bound) ttsBindOnce();
    tts.built = true;
}
function ttsBindOnce() {
    tts.bound = true;
    document.getElementById('ttsBoardContainer').addEventListener('click', e => {
        const b = e.target.closest('.tts-cell[data-k]');
        if (b) ttsClickCell(b.dataset.k);
    });
    // Keyboard layar
    document.querySelectorAll('#ttsKeyboard [data-row]').forEach((row, idx) => {
        let h = '';
        if (idx === 2) h += `<button type="button" class="tts-key wide" data-act="dir" aria-label="Ganti arah">⇄</button>`;
        row.dataset.row.split('').forEach(ch => { h += `<button type="button" class="tts-key" data-ch="${ch}">${ch}</button>`; });
        if (idx === 2) h += `<button type="button" class="tts-key wide" data-act="back" aria-label="Hapus">⌫</button>`;
        row.innerHTML = h;
    });
    document.getElementById('ttsKeyboard').addEventListener('click', e => {
        const b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.ch) ttsType(b.dataset.ch);
        else if (b.dataset.act === 'back') ttsBackspace();
        else if (b.dataset.act === 'dir') ttsToggleDir();
    });
}

function initCrossword() {
    if (!appState.ttsLevels.length) {
        appState.ttsLevels = ttsData.levels.map((l, i) => i === 0 ? appState.tts : ttsFreshState());
    }
    ttsSelectLevel(tts.level);
}
function ttsSelectLevel(i) {
    ttsStopTimer();
    tts.level = i;
    tts.cur = ttsData.levels[i];
    appState.tts = appState.ttsLevels[i];
    const st = appState.tts;
    tts.wrongKeys.clear();
    ttsBuild();
    ttsRenderClues();
    ttsSwitchTab(tts.tab);
    ttsRenderFacts();
    ttsRenderLevelBar();
    ttsRenderAll();
    document.getElementById('ttsStartOverlay').classList.toggle('gone', st.started);
    if (st.started && !st.completed) {
        if (!st.activeWordId) ttsSelectWord(tts.order[0]);
        ttsStartTimer();
    }
}
function ttsRenderLevelBar() {
    const bar = document.getElementById('ttsLevelBar');
    bar.innerHTML = ttsData.levels.map((l, i) => {
        const st = appState.ttsLevels[i];
        const done = st.completed;
        const diffCls = l.diff === 'Mudah' ? 'bg-emerald-100 text-emerald-800' : l.diff === 'Sedang' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800';
        return `<button type="button" class="tts-lv ${i === tts.level ? 'on' : ''} ${done ? 'done' : ''}" onclick="ttsSelectLevel(${i})" aria-label="Level ${l.id}: ${l.name}">
                    <span class="flex items-center justify-between w-full"><span class="tts-lv-num">${l.id}</span><span class="text-lg">${done ? '🏅' : l.emoji}</span></span>
                    <span class="block text-[12px] font-extrabold leading-tight mt-1 text-left">${l.name}</span>
                    <span class="flex items-center justify-between w-full mt-1.5"><span class="text-[9px] font-black px-1.5 py-0.5 rounded-full ${diffCls}">${l.diff}</span><span class="text-[10px] font-bold text-gray-500">${st.solvedWords.length}/${l.words.length}</span></span>
                </button>`;
    }).join('');
    const l = tts.cur;
    document.getElementById('ttsLevelInfo').innerHTML = `<span class="text-xl">${l.emoji}</span> <b>Level ${l.id}: ${l.name}</b> <span class="text-gray-500">· ${l.sub}. ${l.desc}</span>`;
}
function ttsRenderFacts() {
    const st = appState.tts;
    const list = document.getElementById('ttsFactList');
    if (!st.solvedWords.length) {
        list.innerHTML = '<li class="italic text-gray-400">Belum ada fakta yang terbuka.</li>';
        document.getElementById('ttsFactText').innerText = 'Selesaikan satu kata untuk membuka fakta seru tentang energi dan argumentasi ilmiah!';
    } else {
        list.innerHTML = st.solvedWords.slice().reverse().map(id => { const w = tts.words[id]; return `<li class="p-2 rounded-xl bg-amber-50 border border-amber-200"><b class="text-purple-900">${w.word}</b>: ${w.fact}</li>`; }).join('');
        const last = tts.words[st.solvedWords[st.solvedWords.length - 1]];
        document.getElementById('ttsFactText').innerText = last.fact;
    }
    document.getElementById('ttsFactCount').innerText = st.solvedWords.length;
}

function ttsLeave() { ttsStopTimer(); }
function ttsStartTimer() {
    const st = appState.tts;
    ttsStopTimer();
    st.timerInterval = setInterval(() => {
        st.seconds++;
        const el = document.getElementById('ttsTimerText');
        if (el) el.innerText = ttsFmt(st.seconds);
    }, 1000);
}
function ttsStopTimer() {
    const st = appState.tts;
    if (st.timerInterval) { clearInterval(st.timerInterval); st.timerInterval = null; }
}

function ttsStart() {
    const st = appState.tts;
    st.started = true;
    document.getElementById('ttsStartOverlay').classList.add('gone');
    ttsStartTimer();
    ttsSelectWord(tts.order[0]);
    ttsBeep('start');
}

/* ---------- Seleksi ---------- */
function ttsFirstOpenKey(w) {
    const st = appState.tts;
    const ks = ttsWordCells(w);
    return ks.find(k => !st.locked[k] && !st.entries[k]) || ks.find(k => !st.locked[k]) || ks[0];
}
function ttsSelectWord(id, preferKey) {
    const st = appState.tts;
    const w = tts.words[id];
    if (!w) return;
    st.activeWordId = id;
    st.activeKey = (preferKey && ttsWordCells(w).includes(preferKey)) ? preferKey : ttsFirstOpenKey(w);
    ttsRenderAll();
}
function ttsClickCell(k) {
    const st = appState.tts;
    if (!st.started) return;
    const cell = tts.cells[k];
    if (!cell) return;
    const cur = st.activeWordId && tts.words[st.activeWordId];
    if (st.activeKey === k && cell.words.length > 1) {
        const other = cell.words.find(id => id !== st.activeWordId) || cell.words[0];
        ttsSelectWord(other, k);
        return;
    }
    let pick = cell.words.find(id => cur && tts.words[id].dir === cur.dir) || cell.words.find(id => !st.solvedWords.includes(id)) || cell.words[0];
    ttsSelectWord(pick, k);
}
function ttsToggleDir() {
    const st = appState.tts;
    if (!st.started || !st.activeKey) return;
    const cell = tts.cells[st.activeKey];
    if (cell && cell.words.length > 1) {
        const other = cell.words.find(id => id !== st.activeWordId);
        ttsSelectWord(other, st.activeKey);
    } else ttsToast('Kotak ini hanya punya satu arah kata 🙂', 'warn');
}
function ttsNextWord(step) {
    const st = appState.tts;
    if (!st.started) return;
    const idx = Math.max(0, tts.order.indexOf(st.activeWordId));
    for (let i = 1; i <= tts.order.length; i++) {
        const id = tts.order[(idx + step * i + tts.order.length * 2) % tts.order.length];
        if (!st.solvedWords.includes(id)) { ttsSelectWord(id); return; }
    }
}
function ttsMoveCursor(dr, dc) {
    const st = appState.tts;
    if (!st.activeKey) return;
    let [r, c] = st.activeKey.split(',').map(Number);
    for (let i = 0; i < Math.max(tts.cur.rows, tts.cur.cols); i++) {
        r += dr; c += dc;
        const k = ttsKey(r, c);
        if (tts.cells[k]) {
            const want = dc !== 0 ? 'across' : 'down';
            const cell = tts.cells[k];
            const id = cell.words.find(w => tts.words[w].dir === want) || cell.words[0];
            ttsSelectWord(id, k);
            return;
        }
        if (r < 0 || c < 0 || r >= tts.cur.rows || c >= tts.cur.cols) return;
    }
}

/* ---------- Input ---------- */
function ttsType(ch) {
    const st = appState.tts;
    if (!st.started || st.completed || !st.activeKey) return;
    let k = st.activeKey;
    const w = tts.words[st.activeWordId];
    if (!st.locked[k]) {
        st.entries[k] = ch;
        tts.wrongKeys.delete(k);
        ttsCheckWordsAt(k, true);
    }
    // maju ke kotak kosong berikutnya pada kata aktif
    if (!st.completed && w) {
        const ks = ttsWordCells(w);
        const i = ks.indexOf(k);
        const nxt = ks.slice(i + 1).find(x => !st.locked[x]) || ks.slice(i + 1)[0];
        if (nxt) st.activeKey = nxt;
    }
    ttsRenderAll();
}
function ttsBackspace() {
    const st = appState.tts;
    if (!st.started || st.completed || !st.activeKey) return;
    const w = tts.words[st.activeWordId];
    const ks = ttsWordCells(w);
    let k = st.activeKey;
    if (st.entries[k] && !st.locked[k]) {
        delete st.entries[k];
    } else {
        const i = ks.indexOf(k);
        for (let j = i - 1; j >= 0; j--) {
            if (!st.locked[ks[j]]) { k = ks[j]; delete st.entries[k]; break; }
        }
    }
    tts.wrongKeys.delete(k);
    st.activeKey = k;
    ttsRenderAll();
}
function ttsCheckWordsAt(k, fromTyping) {
    const st = appState.tts;
    tts.cells[k].words.forEach(id => {
        if (st.solvedWords.includes(id)) return;
        const w = tts.words[id];
        const ks = ttsWordCells(w);
        const filled = ks.every(x => st.entries[x]);
        if (!filled) return;
        const ok = ks.every((x, i) => st.entries[x] === w.word[i]);
        if (ok) ttsSolveWord(w);
        else if (fromTyping) {
            st.combo = 0;
            ks.forEach(x => { if (!st.locked[x]) tts.wrongKeys.add(x); });
            ttsToast('Belum tepat, coba periksa lagi hurufnya! 🤔', 'bad');
            ttsBeep('bad');
            setTimeout(() => { ks.forEach(x => tts.wrongKeys.delete(x)); ttsRenderBoard(); }, 900);
        }
    });
}
function ttsSolveWord(w) {
    const st = appState.tts;
    st.solvedWords.push(w.id);
    const ks = ttsWordCells(w);
    ks.forEach(x => { st.locked[x] = true; tts.wrongKeys.delete(x); });
    st.combo++;
    st.bestCombo = Math.max(st.bestCombo, st.combo);
    const noHint = !st.wordHints[w.id];
    const comboBonus = Math.min(25, (st.combo - 1) * 5);
    const gained = w.word.length * 10 + (noHint ? 20 : 0) + comboBonus;
    st.score += gained;
    ttsPopCells(ks);
    ttsShowFact(w, gained, noHint);
    ttsBeep('good');
    if (typeof confetti === 'function') {
        try { confetti({ particleCount: 40, spread: 60, startVelocity: 28, origin: { y: 0.6 }, zIndex: 100, colors: ['#a855f7', '#f9a8d4', '#fde047', '#86efac', '#7dd3fc'] }); } catch (e) {}
    }
    if (st.solvedWords.length === tts.cur.words.length) setTimeout(ttsFinish, 700);
    else if (st.activeWordId === w.id) {
        setTimeout(() => { if (!appState.tts.completed && appState.tts.activeWordId === w.id) ttsNextWord(1); }, 450);
    }
}
function ttsPopCells(ks) {
    ks.forEach((k, i) => {
        const el = document.querySelector(`.tts-cell[data-k="${k}"]`);
        if (!el) return;
        el.style.animationDelay = `${i * 60}ms`;
        el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
        setTimeout(() => { el.classList.remove('pop'); el.style.animationDelay = ''; }, 900 + i * 60);
    });
}
function ttsShowFact(w, gained, noHint) {
    const box = document.getElementById('ttsFactBox');
    document.getElementById('ttsFactText').innerHTML =
        `<span class="inline-block bg-white/80 text-amber-900 font-black text-[11px] px-2 py-0.5 rounded-full mb-1">${w.word} +${gained} poin${noHint ? ' · tanpa hint ✨' : ''}</span><br>${w.fact}`;
    box.classList.remove('flash'); void box.offsetWidth; box.classList.add('flash');
    const list = document.getElementById('ttsFactList');
    if (appState.tts.solvedWords.length === 1) list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', `<li class="p-2 rounded-xl bg-amber-50 border border-amber-200"><b class="text-purple-900">${w.word}</b>: ${w.fact}</li>`);
    document.getElementById('ttsFactCount').innerText = appState.tts.solvedWords.length;
    ttsRenderLevelBar();
    ttsToast(`✅ ${w.word} benar! +${gained}`, 'good');
}

/* ---------- Alat bantu ---------- */
function ttsUseHint() {
    const st = appState.tts;
    if (!st.started || st.completed) return ttsToast('Tekan "Mulai Bermain" dulu, ya 🙂', 'warn');
    if (st.hintsLeft <= 0) return ttsToast('Hint sudah habis. Semangat, kamu pasti bisa! 💪', 'warn');
    const w = tts.words[st.activeWordId];
    if (!w) return ttsToast('Pilih sebuah kotak dulu.', 'warn');
    let k = st.activeKey;
    if (st.locked[k]) k = ttsWordCells(w).find(x => !st.locked[x]);
    if (!k) return;
    st.entries[k] = tts.cells[k].answer;
    st.locked[k] = true; st.hinted[k] = true;
    tts.wrongKeys.delete(k);
    tts.cells[k].words.forEach(id => { st.wordHints[id] = true; });
    st.hintsLeft--; st.hintsUsed++;
    ttsBeep('hint');
    ttsCheckWordsAt(k, false);
    if (!st.completed && !st.solvedWords.includes(w.id)) st.activeKey = ttsFirstOpenKey(w);
    ttsRenderAll();
}
function ttsCheckBoard() {
    const st = appState.tts;
    if (!st.started || st.completed) return ttsToast('Tekan "Mulai Bermain" dulu, ya 🙂', 'warn');
    let wrong = 0, filled = 0;
    Object.keys(st.entries).forEach(k => {
        if (st.locked[k]) return;
        filled++;
        if (st.entries[k] !== tts.cells[k].answer) { tts.wrongKeys.add(k); wrong++; }
    });
    ttsRenderBoard();
    if (wrong) {
        ttsToast(`Ada ${wrong} huruf yang belum tepat 🔎`, 'bad');
        ttsBeep('bad');
        setTimeout(() => { tts.wrongKeys.clear(); ttsRenderBoard(); }, 1500);
    } else ttsToast(filled ? 'Semua huruf yang terisi sudah benar! 👏' : 'Papan masih kosong, ayo mulai mengisi!', filled ? 'good' : 'warn');
}
function ttsReset(skipConfirm) {
    const st = appState.tts;
    if (st.started && !st.completed && !skipConfirm && !confirm('Ulangi dari awal? Progres teka-teki akan dihapus.')) return;
    ttsStopTimer();
    appState.tts = appState.ttsLevels[tts.level] = ttsFreshState();
    ttsSelectLevel(tts.level);
}

/* ---------- Selesai ---------- */
function ttsFinish() {
    const st = appState.tts;
    if (st.completed) return;
    st.completed = true;
    ttsStopTimer();
    const nW = tts.cur.words.length;
    const budget = nW * 40;
    const timeBonus = Math.max(0, Math.round((budget - st.seconds) / budget * 100));
    st.score += timeBonus;
    st.finalScore = st.score;
    st.stars = 3 - (st.hintsUsed >= 2 ? 1 : 0) - (st.seconds > nW * 56 ? 1 : 0);
    st.stars = Math.max(1, st.stars);
    let maxS = 100 + nW * 20;
    tts.cur.words.forEach((w, i) => { maxS += w.word.length * 10 + Math.min(25, i * 5); });
    const ratio = st.score / maxS;
    st.rank = TTS_RANKS[ratio >= 0.88 ? 3 : ratio >= 0.72 ? 2 : ratio >= 0.55 ? 1 : 0];
    Sheets.send('tts', {
        level: tts.cur.id,
        nama_level: tts.cur.name,
        skor: st.score,
        waktu_detik: st.seconds,
        bintang: st.stars,
        rank: st.rank,
        hint_dipakai: st.hintsUsed,
        combo_terbaik: st.bestCombo
    });
    Sheets.summary();
    ttsRenderAll();
    document.getElementById('ttsVictoryTime').innerText = ttsFmt(st.seconds);
    document.getElementById('ttsVictoryScore').innerText = st.score;
    document.getElementById('ttsVictoryCombo').innerText = `x${st.bestCombo}`;
    document.getElementById('ttsVictoryRank').innerText = st.rank;
    const lvl = tts.cur;
    document.getElementById('ttsVictoryLevel').innerText = `Level ${lvl.id}: ${lvl.name}`;
    const nextIdx = ttsData.levels.findIndex((l, i) => i !== tts.level && !appState.ttsLevels[i].completed && i > tts.level) >= 0
        ? ttsData.levels.findIndex((l, i) => i > tts.level && !appState.ttsLevels[i].completed)
        : ttsData.levels.findIndex((l, i) => !appState.ttsLevels[i].completed);
    const allDone = appState.ttsLevels.every(x => x.completed);
    const nb = document.getElementById('ttsNextLevelBtn');
    nb.classList.toggle('hidden', nextIdx < 0);
    nb.dataset.next = nextIdx;
    if (nextIdx >= 0) nb.innerHTML = `Level ${ttsData.levels[nextIdx].id}: ${ttsData.levels[nextIdx].name} <i class="fa-solid fa-arrow-right ml-1"></i>`;
    document.getElementById('ttsVictoryExtra').innerText = allDone ? '🎉 Luar biasa! Kamu sudah menuntaskan SEMUA 6 level TTS!' : `Level selesai: ${appState.ttsLevels.filter(x => x.completed).length} dari ${ttsData.levels.length}`;
    ttsRenderLevelBar();
    const stars = document.querySelectorAll('#ttsStars .tts-star');
    stars.forEach(s => s.classList.remove('on'));
    document.getElementById('ttsVictoryModal').classList.remove('hidden');
    stars.forEach((s, i) => { if (i < st.stars) setTimeout(() => s.classList.add('on'), 350 + i * 300); });
    ttsBeep('win');
    if (typeof confetti === 'function') {
        try {
            [0, 350, 700].forEach((d, i) => setTimeout(() => confetti({ particleCount: 90, spread: 80, origin: { x: [0.2, 0.8, 0.5][i], y: 0.65 }, zIndex: 100 }), d));
        } catch (e) {}
    }
}
function ttsCloseVictory() { document.getElementById('ttsVictoryModal').classList.add('hidden'); }
function ttsGoNext() {
    const i = parseInt(document.getElementById('ttsNextLevelBtn').dataset.next, 10);
    ttsCloseVictory();
    if (i >= 0) { ttsSelectLevel(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }
}

/* ---------- Render ---------- */
function ttsRenderAll() {
    ttsRenderBoard(); ttsRenderActive(); ttsRenderHud(); ttsRenderClueStates();
}
function ttsRenderBoard() {
    const st = appState.tts;
    const activeWord = st.activeWordId ? tts.words[st.activeWordId] : null;
    const inWord = activeWord ? new Set(ttsWordCells(activeWord)) : new Set();
    document.querySelectorAll('.tts-cell[data-k]').forEach(el => {
        const k = el.dataset.k;
        const ch = st.entries[k] || '';
        el.querySelector('.tts-ch').textContent = ch;
        el.classList.toggle('inword', inWord.has(k));
        el.classList.toggle('active', st.activeKey === k && !st.completed);
        el.classList.toggle('solved', !!st.locked[k] && !st.hinted[k] || (!!st.hinted[k] && st.solvedWords.some(id => tts.cells[k].words.includes(id))));
        el.classList.toggle('hinted', !!st.hinted[k] && !el.classList.contains('solved'));
        el.classList.toggle('wrong', tts.wrongKeys.has(k));
    });
}
function ttsRenderActive() {
    const st = appState.tts;
    const w = st.activeWordId ? tts.words[st.activeWordId] : null;
    const t = document.getElementById('ttsActiveClueTitle');
    const d = document.getElementById('ttsActiveClueDesc');
    const c = document.getElementById('ttsActiveCat');
    if (!w) { return; }
    t.innerText = `📍 ${w.num} ${w.dir === 'across' ? 'Mendatar' : 'Menurun'} (${w.word.length} huruf)`;
    d.innerText = w.clue;
    c.innerHTML = `<span class="tts-cat ${w.cat}">${TTS_CATS[w.cat].label}</span>`;
}
function ttsRenderHud() {
    const st = appState.tts;
    const total = tts.cur.words.length;
    const set = (id, v, bump) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.innerText !== String(v)) { el.innerText = v; if (bump) { el.classList.remove('tts-bump'); void el.offsetWidth; el.classList.add('tts-bump'); } }
    };
    set('ttsTimerText', ttsFmt(st.seconds));
    set('ttsScoreText', st.score, true);
    set('ttsProgressCount', `${st.solvedWords.length} / ${total}`, true);
    set('ttsComboText', `x${st.combo}`, true);
    set('ttsHintBadge', st.hintsLeft);
    document.getElementById('ttsProgressBar').style.width = `${Math.round(st.solvedWords.length / total * 100)}%`;
    document.getElementById('btnTtsHint').disabled = st.hintsLeft <= 0;
    document.getElementById('btnTtsSound').innerText = tts.sound ? '🔊' : '🔇';
}
function ttsRenderClues() {
    ['across', 'down'].forEach(dir => {
        const list = document.getElementById(dir === 'across' ? 'ttsCluesListAcross' : 'ttsCluesListDown');
        list.innerHTML = tts.cur.words.filter(w => w.dir === dir).map(w => `
                    <button type="button" class="tts-clue" data-id="${w.id}">
                        <span class="n">${w.num}</span>
                        <span class="flex-1 min-w-0">
                            <span class="block text-xs font-semibold text-gray-700 leading-snug">${w.clue}</span>
                            <span class="mt-1 flex items-center gap-2"><span class="tts-cat ${w.cat}">${TTS_CATS[w.cat].label}</span><span class="text-[10px] font-bold text-gray-400">${w.word.length} huruf</span><span class="tts-ans text-[11px] font-black text-emerald-700"></span></span>
                        </span>
                    </button>`).join('');
        list.onclick = e => {
            const b = e.target.closest('.tts-clue');
            if (!b || !appState.tts.started) { if (b) ttsToast('Tekan "Mulai Bermain" dulu, ya 🙂', 'warn'); return; }
            ttsSelectWord(b.dataset.id);
            document.getElementById('ttsBoardContainer').scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
    });
    const a = tts.cur.words.filter(w => w.dir === 'across').length;
    const d = tts.cur.words.length - a;
    document.getElementById('ttsTabBtnAcross').innerText = `➡️ Mendatar (${a})`;
    document.getElementById('ttsTabBtnDown').innerText = `⬇️ Menurun (${d})`;
}
function ttsRenderClueStates() {
    const st = appState.tts;
    document.querySelectorAll('.tts-clue').forEach(el => {
        const id = el.dataset.id;
        const done = st.solvedWords.includes(id);
        el.classList.toggle('done', done);
        el.classList.toggle('active', st.activeWordId === id && !done);
        el.querySelector('.tts-ans').innerText = done ? `✓ ${tts.words[id].word}` : '';
    });
    // otomatis pindah tab sesuai kata aktif
    const w = st.activeWordId && tts.words[st.activeWordId];
    if (w && w.dir !== tts.tab) ttsSwitchTab(w.dir);
}
function ttsSwitchTab(dir) {
    tts.tab = dir;
    document.getElementById('ttsCluesListAcross').classList.toggle('hidden', dir !== 'across');
    document.getElementById('ttsCluesListDown').classList.toggle('hidden', dir !== 'down');
    const on = ['bg-white', 'text-purple-900', 'shadow-sm'], off = ['text-gray-600'];
    [['across', 'ttsTabBtnAcross'], ['down', 'ttsTabBtnDown']].forEach(([d, id]) => {
        const b = document.getElementById(id);
        on.forEach(c => b.classList.toggle(c, d === dir));
        off.forEach(c => b.classList.toggle(c, d !== dir));
    });
}

/* ---------- Toast, suara, keyboard ---------- */
function ttsToast(msg, kind) {
    const el = document.getElementById('ttsToast');
    if (!el) return;
    el.className = `tts-toast show ${kind || ''}`;
    el.innerText = msg;
    clearTimeout(tts.toastT);
    tts.toastT = setTimeout(() => el.classList.remove('show'), 2200);
}
function ttsToggleSound() {
    tts.sound = !tts.sound;
    document.getElementById('btnTtsSound').innerText = tts.sound ? '🔊' : '🔇';
    if (tts.sound) ttsBeep('good');
}
function ttsBeep(kind) {
    if (!tts.sound) return;
    try {
        tts.audio = tts.audio || new (window.AudioContext || window.webkitAudioContext)();
        const ctx = tts.audio;
        const seqs = { good: [523, 659, 784], bad: [196, 160], hint: [660], start: [392, 523], win: [523, 659, 784, 1047, 1319] };
        (seqs[kind] || [440]).forEach((f, i) => {
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.type = kind === 'bad' ? 'sawtooth' : 'triangle';
            o.frequency.value = f;
            const t0 = ctx.currentTime + i * 0.11;
            g.gain.setValueAtTime(0.0001, t0);
            g.gain.exponentialRampToValueAtTime(0.15, t0 + 0.02);
            g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.2);
            o.connect(g); g.connect(ctx.destination);
            o.start(t0); o.stop(t0 + 0.22);
        });
    } catch (e) {}
}
function ttsToggleKb() {
    const kb = document.getElementById('ttsKeyboard');
    const visible = getComputedStyle(kb).display !== 'none';
    kb.classList.toggle('hide', visible);
    kb.classList.toggle('show', !visible);
}
document.addEventListener('keydown', e => {
    const sec = document.getElementById('sec-game');
    if (!sec || sec.classList.contains('hidden')) return;
    if (!document.getElementById('ttsVictoryModal').classList.contains('hidden')) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.ctrlKey || e.metaKey || e.altKey) return;
    const st = appState.tts;
    if (!st.started || st.completed) return;
    if (/^[a-zA-Z]$/.test(e.key)) { e.preventDefault(); ttsType(e.key.toUpperCase()); }
    else if (e.key === 'Backspace') { e.preventDefault(); ttsBackspace(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); ttsMoveCursor(0, 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); ttsMoveCursor(0, -1); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); ttsMoveCursor(1, 0); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); ttsMoveCursor(-1, 0); }
    else if (e.key === 'Tab') { e.preventDefault(); ttsNextWord(e.shiftKey ? -1 : 1); }
    else if (e.key === 'Enter' || e.key === ' ') { if (tag !== 'button') { e.preventDefault(); ttsToggleDir(); } }
});
