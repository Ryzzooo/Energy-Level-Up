/* MATERI TABS & PRACTICE */
const materiTabActive = {
    0: 'bg-pastel-blue text-blue-950',
    1: 'bg-pastel-pink text-pink-950',
    2: 'bg-pastel-mint text-emerald-950'
};

function switchMateriTab(tabNum) {
    [0, 1, 2].forEach(n => {
        const btn = document.getElementById(`tabBtn${n}`);
        const tab = document.getElementById(`materiTab${n}`);
        if (n === tabNum) {
            btn.className = `px-4 py-2 rounded-xl text-sm font-bold ${materiTabActive[n]} shadow-sm transition`;
            tab.classList.remove('hidden');
        } else {
            btn.className = 'px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:text-purple-900 transition';
            tab.classList.add('hidden');
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
