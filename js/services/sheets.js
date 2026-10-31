/* PENGIRIM DATA SISWA KE GOOGLE SHEETS (via Google Apps Script Web App)
 *
 * - Data dikirim di latar belakang; tampilan dan alur media tidak berubah.
 * - Jika internet putus, data ditahan di antrean (localStorage) dan dikirim ulang otomatis.
 * - Jika SHEETS_CONFIG.url kosong, semua fungsi di sini tidak melakukan apa-apa.
 */
const Sheets = (() => {
    const QUEUE_KEY = 'eluSheetsQueue';
    let queue = [];
    let sending = false;
    let summaryTimer = null;

    try { queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); } catch (e) { queue = []; }

    const enabled = () => !!(SHEETS_CONFIG && SHEETS_CONFIG.url);
    const persist = () => { try { localStorage.setItem(QUEUE_KEY, JSON.stringify(queue)); } catch (e) {} };
    const rand = n => Math.random().toString(36).slice(2, 2 + n).toUpperCase();

    async function flush() {
        if (!enabled() || sending || !queue.length) return;
        if (typeof navigator !== 'undefined' && navigator.onLine === false) return;
        sending = true;
        try {
            while (queue.length) {
                // text/plain + no-cors = "simple request": tidak memicu preflight CORS di Apps Script
                await fetch(SHEETS_CONFIG.url, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(queue[0]),
                    keepalive: true
                });
                queue.shift();
                persist();
            }
        } catch (e) {
            /* gagal jaringan: biarkan di antrean, dicoba lagi nanti */
        }
        sending = false;
    }

    function send(type, data) {
        if (!enabled() || !appState.user.id) return;
        queue.push(Object.assign({
            token: SHEETS_CONFIG.token,
            type: type,
            eid: Date.now().toString(36) + rand(4),
            student_id: appState.user.id,
            nama: appState.user.name,
            kelas: appState.user.class
        }, data));
        persist();
        flush();
    }

    /* Dipanggil saat siswa menyimpan identitas: membuat ID unik + mencatat siswa baru */
    function register() {
        appState.user.id = 'S' + Date.now().toString(36).toUpperCase() + rand(3);
        send('siswa', {});
    }

    /* Ringkasan skor (satu baris per siswa, diperbarui terus). Ditunda 1,5 detik agar tidak terlalu sering. */
    function summary() {
        if (!enabled() || !appState.user.id) return;
        clearTimeout(summaryTimer);
        summaryTimer = setTimeout(() => {
            const sc = appState.quiz.scores;
            const lv = (appState.ttsLevels || []).filter(x => x && x.completed);
            send('ringkasan', {
                skor_bagian1: sc.part1,
                skor_bagian2: sc.part2,
                skor_bagian3: sc.part3,
                kasus_esai: sc.part4Count,
                total_skor: sc.grandTotal,
                tts_level_selesai: lv.length,
                tts_total_skor: lv.reduce((a, x) => a + (x.finalScore || 0), 0)
            });
        }, 1500);
    }

    window.addEventListener('online', flush);
    setInterval(flush, 30000);
    flush();

    return { send, register, summary, flush };
})();
