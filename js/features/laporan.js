/* LAPORAN PORTFOLIO UPDATE */
function updateReportData() {
    // Student Info
    document.getElementById('reportStudentName').innerText = appState.user.name || 'Siswa Belum Mengisi Identitas';
    document.getElementById('reportStudentClass').innerText = appState.user.class || 'X-1';

    // Calculate quiz scores
    calculateToulminScores();

    // Quiz Scores across 4 Parts
    document.getElementById('repClaimScore').innerText = `${appState.quiz.scores.part1} / 100`;
    document.getElementById('repDataScore').innerText = `${appState.quiz.scores.part2} / 100`;
    document.getElementById('repWarrantScore').innerText = `${appState.quiz.scores.part3} / 100`;
    document.getElementById('repRebuttalScore').innerText = `${appState.quiz.scores.part4Count} / 10 Kasus`;
    document.getElementById('repTotalScore').innerText = `${appState.quiz.scores.grandTotal} / 260`;

    const masteryEl = document.getElementById('repMasteryBadge');
    if (masteryEl) {
        const total = appState.quiz.scores.grandTotal;
        if (total >= 220 && appState.quiz.scores.part4Count >= 5) {
            masteryEl.innerText = 'Tingkat: Mahir (Expert TAP)';
        } else if (total >= 160) {
            masteryEl.innerText = 'Tingkat: Cakap';
        } else if (total >= 80) {
            masteryEl.innerText = 'Tingkat: Berkembang';
        } else {
            masteryEl.innerText = 'Tingkat: Pemula';
        }
    }

    // Ice Breaking TTS (6 level)
    const lvls = appState.ttsLevels.length ? appState.ttsLevels : [appState.tts];
    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
    const solvedAll = lvls.reduce((n, x) => n + x.solvedWords.length, 0);
    const wordsAll = ttsData.levels.reduce((n, l) => n + l.words.length, 0);
    const doneLv = lvls.filter(x => x.completed).length;
    setTxt('repTtsStatus', solvedAll || lvls.some(x => x.started) ? `${solvedAll} dari ${wordsAll} istilah terpecahkan · ${doneLv} dari ${ttsData.levels.length} level selesai` : `Belum dimainkan (0 dari ${wordsAll} istilah)`);
    setTxt('repTtsTime', ttsFmt(lvls.reduce((n, x) => n + x.seconds, 0)));
    setTxt('repTtsScore', lvls.reduce((n, x) => n + x.score, 0));
    const bestRank = lvls.filter(x => x.completed).reduce((m, x) => Math.max(m, TTS_RANKS.indexOf(x.rank)), -1);
    setTxt('repTtsRank', bestRank >= 0 ? TTS_RANKS[bestRank] : '-');
    const rl = document.getElementById('repTtsLevels');
    if (rl) rl.innerHTML = ttsData.levels.map((l, i) => {
        const x = lvls[i] || { solvedWords: [], completed: false, score: 0 };
        return `<span class="px-2 py-1 rounded-lg border ${x.completed ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-gray-200 text-gray-600'} font-bold">${l.emoji} L${l.id} ${l.name}: ${x.solvedWords.length}/${l.words.length}${x.completed ? ' ✓ ' + x.score + ' poin' : ''}</span>`;
    }).join('');

    // Refleksi Notes
    document.getElementById('repRefClaim').innerText = appState.reflection.claim || '(Belum diisi)';
    document.getElementById('repRefData').innerText = appState.reflection.data || '(Belum diisi)';
    document.getElementById('repRefWarrant').innerText = appState.reflection.warrant || '(Belum diisi)';
    document.getElementById('repRefRebuttal').innerText = appState.reflection.rebuttal || '(Belum diisi)';

    // Render Part 4 Toulmin Essays into Report
    const essayContainer = document.getElementById('repEssayContainer');
    if (essayContainer) {
        let savedEssaysHTML = '';
        for (let cId = 31; cId <= 40; cId++) {
            const essay = appState.quiz.answers.part4[cId];
            if (essay && essay.saved) {
                const caseObj = toulminQuizData.part4.find(c => c.id === cId);
                savedEssaysHTML += `
                            <div class="p-3 bg-white rounded-xl border border-purple-200 space-y-2 mb-3">
                                <div class="font-extrabold text-purple-950 flex items-center gap-1.5 text-xs sm:text-sm">
                                    <span class="text-pink-600">📌</span> ${caseObj ? caseObj.title : `Kasus #${cId}`}
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                    <div class="p-2.5 bg-pink-50/60 rounded-xl border border-pink-200">
                                        <strong class="text-pink-900 block font-bold">🎯 Claim (Klaim Posisi):</strong>
                                        <p class="text-gray-800 mt-0.5 leading-relaxed">${essay.claim}</p>
                                    </div>
                                    <div class="p-2.5 bg-blue-50/60 rounded-xl border border-blue-200">
                                        <strong class="text-blue-900 block font-bold">📊 Data (Bukti Ilmiah):</strong>
                                        <p class="text-gray-800 mt-0.5 leading-relaxed">${essay.data}</p>
                                    </div>
                                    <div class="p-2.5 bg-amber-50/60 rounded-xl border border-amber-200">
                                        <strong class="text-amber-900 block font-bold">🔗 Warrant (Alasan Ilmiah):</strong>
                                        <p class="text-gray-800 mt-0.5 leading-relaxed">${essay.warrant}</p>
                                    </div>
                                    <div class="p-2.5 bg-purple-50/60 rounded-xl border border-purple-200">
                                        <strong class="text-purple-900 block font-bold">🛡️ Rebuttal (Sanggahan / Batasan):</strong>
                                        <p class="text-gray-800 mt-0.5 leading-relaxed">${essay.rebuttal}</p>
                                    </div>
                                </div>
                            </div>
                        `;
            }
        }

        if (savedEssaysHTML) {
            essayContainer.innerHTML = savedEssaysHTML;
        } else {
            essayContainer.innerHTML = `
                        <div class="text-gray-500 italic">
                            Belum ada argumen esai Bagian 4 yang tersimpan. Siswa dapat mengisi argumen di Kuis Bagian 4 (Kasus #31–#40).
                        </div>
                    `;
        }
    }
}
