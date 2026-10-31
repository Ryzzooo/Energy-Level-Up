/* REFLECTION SAVING */
function saveReflection(e) {
    e.preventDefault();
    appState.reflection.claim = document.getElementById('ref_claim').value.trim();
    appState.reflection.data = document.getElementById('ref_data').value.trim();
    appState.reflection.warrant = document.getElementById('ref_warrant').value.trim();
    appState.reflection.rebuttal = document.getElementById('ref_rebuttal').value.trim();

    Sheets.send('refleksi', {
        claim: appState.reflection.claim,
        data: appState.reflection.data,
        warrant: appState.reflection.warrant,
        rebuttal: appState.reflection.rebuttal
    });

    alert('Catatan refleksi argumentasi Toulmin kamu berhasil disimpan ke Laporan!');
}
