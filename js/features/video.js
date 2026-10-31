/* VIDEO REFERENSI */
const videoList = [
    { id: 'innz62fcoVw', title: 'BAB 6 : ENERGI TERBARUKAN | IPA Kelas 10 Kurikulum Merdeka', channel: 'Miss Maya Channel' },
    { id: 'JzZGD7UXRyM', title: 'IPA - Energi Terbarukan dan Tak Terbarukan | GIA Academy', channel: 'GIA Academy' },
    { id: 'qdttvTLh2nQ', title: 'ENERGI TERBARUKAN', channel: 'Rumah Belajar Genio' },
    { id: 'MGfg23zzfBQ', title: 'Materi Energi Terbarukan Fisika Bab 2 Kelas 10 SMA', channel: 'Clinic Bimbel' },
    { id: 'yG2Z4vbs4kE', title: 'Energi Terbarukan (Fisika SMA kelas 10 Kurikulum Merdeka)', channel: 'Siska Martan' }
];
let videoIndex = 0;

function renderVideoPlaylist() {
    const box = document.getElementById('videoPlaylist');
    if (!box) return;
    box.innerHTML = videoList.map((v, i) => `
                <button onclick="setVideo(${i},true)" data-vidx="${i}" class="vid-item w-full flex gap-3 items-center text-left p-2 rounded-xl border-2 transition ${i === videoIndex ? 'bg-pastel-pink/40 border-pink-300' : 'bg-gray-50 border-transparent hover:bg-purple-50'}">
                    <span class="relative shrink-0 w-28 sm:w-32 aspect-video rounded-lg overflow-hidden bg-gray-200">
                        <img src="https://img.youtube.com/vi/${v.id}/mqdefault.jpg" alt="" loading="lazy" class="w-full h-full object-cover">
                        <span class="absolute bottom-1 left-1 bg-black/70 text-white text-xs font-bold px-1.5 rounded">${i + 1}</span>
                    </span>
                    <span class="min-w-0">
                        <span class="block text-xs sm:text-sm font-bold text-gray-800 leading-snug">${v.title}</span>
                        <span class="block text-xs text-gray-500 mt-0.5">${v.channel}</span>
                    </span>
                </button>`).join('');
}

function setVideo(i, autoplay) {
    videoIndex = (i + videoList.length) % videoList.length;
    const v = videoList[videoIndex];
    const frame = document.getElementById('videoFrame');
    frame.src = `https://www.youtube-nocookie.com/embed/${v.id}?rel=0${autoplay ? '&autoplay=1' : ''}`;
    frame.title = v.title;
    document.getElementById('videoTitle').innerText = v.title;
    document.getElementById('videoChannel').innerText = v.channel;
    document.getElementById('videoCounter').innerText = `Video ${videoIndex + 1} dari ${videoList.length}`;
    document.getElementById('videoLink').href = `https://www.youtube.com/watch?v=${v.id}`;
    renderVideoPlaylist();
    if (autoplay) frame.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function stepVideo(d) { setVideo(videoIndex + d, true); }

// Hentikan video saat pindah halaman (iframe dikosongkan; dimuat lagi saat halaman Video dibuka)
function stopVideo() {
    const f = document.getElementById('videoFrame');
    if (f && f.getAttribute('src')) f.setAttribute('src', '');
}
