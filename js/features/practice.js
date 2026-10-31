/* SIMULATOR: KOMPOSISI CAMPURAN BIODIESEL (hanya komposisi volume) */
function updateBlendSim(val) {
    const b = Number(val);
    document.getElementById('blendValue').innerText = `B${b}`;
    document.getElementById('blendFame').style.width = `${b}%`;
    document.getElementById('blendFameTxt').innerText = `${b} L biodiesel`;
    document.getElementById('blendSolarTxt').innerText = `${100 - b} L solar fosil`;
}
function setBlend(b) {
    document.getElementById('blendSlider').value = b;
    updateBlendSim(b);
}

function submitPractice(topicNum) {
    const claim = document.getElementById(`practice${topicNum}_claim`).value;
    const data = document.getElementById(`practice${topicNum}_data`).value.trim();
    const warrant = document.getElementById(`practice${topicNum}_warrant`).value.trim();
    const rebuttal = document.getElementById(`practice${topicNum}_rebuttal`).value.trim();

    const feedbackBox = document.getElementById(`practice${topicNum}_feedback`);

    if (!claim || !data || !warrant || !rebuttal) {
        feedbackBox.className = "p-4 rounded-xl bg-rose-100 text-rose-900 border-2 border-rose-300 text-sm font-bold";
        feedbackBox.innerHTML = "⚠️ Harap lengkapi semua 4 komponen (Claim, Data, Warrant, Rebuttal) sebelum mengevaluasi!";
        feedbackBox.classList.remove('hidden');
        return;
    }

    const claimSel = document.getElementById(`practice${topicNum}_claim`);
    Sheets.send('latihan', {
        topik: topicNum,
        klaim_dipilih: claimSel.options[claimSel.selectedIndex].text,
        hasil: claim === "correct" ? 'Tepat' : 'Kurang tepat',
        data, warrant, rebuttal
    });

    if (claim === "correct") {
        feedbackBox.className = "p-4 rounded-xl bg-emerald-100 text-emerald-900 border-2 border-emerald-300 text-sm space-y-1";
        feedbackBox.innerHTML = `
                    <div class="font-extrabold flex items-center gap-2 text-base">
                        <span>🎉</span> Analisis Toulmin Kamu Luar Biasa!
                    </div>
                    <p>Klaim yang kamu pilih sangat tepat dan didukung oleh penjelasan Data, Warrant, serta Rebuttal yang komprehensif.</p>
                `;
    } else {
        feedbackBox.className = "p-4 rounded-xl bg-amber-100 text-amber-900 border-2 border-amber-300 text-sm space-y-1";
        feedbackBox.innerHTML = `
                    <div class="font-extrabold flex items-center gap-2">
                        <span>💡</span> Catatan Evaluasi Klaim:
                    </div>
                    <p>Pilihan klaim kamu kurang seimbang. Pastikan klaim mempertimbangkan aspek sosiosaintifik (manfaat dan dampaknya secara ilmiah).</p>
                `;
    }

    feedbackBox.classList.remove('hidden');
}
