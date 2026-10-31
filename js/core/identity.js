/* MODAL IDENTITY & USER SAVING */
function openNameModal() {
    document.getElementById('modalIdentity').classList.remove('hidden');
}

function saveIdentity(e) {
    e.preventDefault();
    const name = document.getElementById('inputName').value.trim();
    const classVal = document.getElementById('inputClass').value;

    if (name && classVal) {
        appState.user.name = name;
        appState.user.class = classVal;
        Sheets.register();

        // Update UI text
        document.getElementById('navUserName').innerText = name;
        document.getElementById('navUserClass').innerText = classVal;
        document.getElementById('heroWelcomeText').innerText = `Selamat Datang, ${name} - ${classVal}!`;
        document.getElementById('userBadge').classList.remove('hidden');

        // Reset Inputs
        document.getElementById('inputName').value = '';
        document.getElementById('inputClass').value = '';

        // Close Modal & Go to Beranda
        document.getElementById('modalIdentity').classList.add('hidden');
        navigateTo('beranda');

        // Confetti blast celebration
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}
