/* INITIALIZATION & ROUTING */
window.addEventListener('DOMContentLoaded', () => {
    // Gambar yang dipakai dua kali memakai sumber yang sama (hemat ukuran file)
    document.querySelectorAll('img[data-clone]').forEach(i => { const o = document.getElementById(i.dataset.clone); if (o) i.src = o.src; });
    // Set current report date
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('reportDate').innerText = dateStr;

    // Start at landing page
    navigateTo('landing');
});

function setHdr() {
    const h = document.getElementById('mainHeader');
    document.documentElement.style.setProperty('--hdr', ((h && h.offsetHeight) || 68) + 'px');
}
window.addEventListener('resize', setHdr);

function navigateTo(targetId) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(sec => {
        sec.classList.add('hidden');
    });

    // Show selected page
    const targetSection = document.getElementById(`sec-${targetId}`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // Header visibility logic
    const header = document.getElementById('mainHeader');
    if (targetId === 'landing') {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    // Update nav active states
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.target === targetId) {
            btn.classList.add('bg-purple-100', 'text-purple-900', 'font-extrabold');
        } else {
            btn.classList.remove('bg-purple-100', 'text-purple-900', 'font-extrabold');
        }
    });

    // Tinggi header -> posisi bilah pintasan halaman
    setHdr();
    // Video: muat saat dibuka, hentikan saat ditinggalkan
    if (targetId === 'video') { if (!document.getElementById('videoFrame').getAttribute('src')) setVideo(videoIndex, false); } else { stopVideo(); }
    // Bottom nav (mobile)
    document.getElementById('bottomNav').classList.toggle('hidden', targetId === 'landing');
    document.querySelectorAll('.bnav-btn').forEach(b => b.classList.toggle('active', b.dataset.bnav === targetId));

    // Hentikan timer TTS jika meninggalkan halaman game
    if (targetId !== 'game') ttsLeave();

    // Trigger specific page renders
    if (targetId === 'kuis') {
        renderCurrentQuestion();
    } else if (targetId === 'game') {
        initCrossword();
    } else if (targetId === 'laporan') {
        updateReportData();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
