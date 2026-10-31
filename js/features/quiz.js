/* TOULMIN COMPREHENSIVE QUIZ ENGINE (40 SOAL - 4 BAGIAN) */
function switchQuizPart(partNum) {
    appState.quiz.activePart = partNum;

    // Update tab styles
    const tabs = [
        { id: 'partTab1', bg: 'bg-pastel-pink/20', border: 'border-pastel-pink' },
        { id: 'partTab2', bg: 'bg-pastel-blue/20', border: 'border-pastel-blue' },
        { id: 'partTab3', bg: 'bg-pastel-yellow/30', border: 'border-pastel-yellow' },
        { id: 'partTab4', bg: 'bg-pastel-lavender/30', border: 'border-pastel-lavender' }
    ];

    tabs.forEach((tab, i) => {
        const btn = document.getElementById(tab.id);
        if (btn) {
            if (i + 1 === partNum) {
                btn.className = `pastel-btn text-left p-4 rounded-2xl border-2 ${tab.border} ${tab.bg} ring-2 ring-purple-300 transition-all shadow-md`;
            } else {
                btn.className = 'pastel-btn text-left p-4 rounded-2xl border-2 border-gray-200 bg-white transition-all shadow-sm opacity-80 hover:opacity-100';
            }
        }
    });

    // Update banner details
    const bannerInfo = {
        1: {
            icon: '🎯',
            badge: 'Tingkat Dasar',
            badgeBg: 'bg-pink-100 text-pink-900',
            soalCount: '10 Soal Pilihan Ganda',
            title: 'Bagian 1 — Kenali dan pilih klaim',
            desc: 'Mengenali permasalahan, menentukan posisi, dan membedakan klaim ilmiah yang dapat diuji dengan opini tanpa dasar.'
        },
        2: {
            icon: '📊',
            badge: 'Tingkat Berkembang',
            badgeBg: 'bg-blue-100 text-blue-900',
            soalCount: '10 Soal Pilihan Ganda',
            title: 'Bagian 2 — Gunakan data dan bukti',
            desc: 'Membaca data empiris, memilih bukti yang relevan, serta menilai kecukupan dan keabsahan bukti untuk mendukung klaim.'
        },
        3: {
            icon: '🔗',
            badge: 'Menengah–Lanjut',
            badgeBg: 'bg-amber-100 text-amber-900',
            soalCount: '6 PG + 4 Isian Singkat',
            title: 'Bagian 3 — Jelaskan alasan ilmiah (Warrant)',
            desc: 'Menjelaskan hubungan logis ilmiah (warrant), mengevaluasi kekuatan penalaran, dan mengidentifikasi keterbatasan kesimpulan.'
        },
        4: {
            icon: '🛡️',
            badge: 'Tingkat Lanjutan',
            badgeBg: 'bg-purple-100 text-purple-900',
            soalCount: '10 Kasus Esai SSI (CDWR)',
            title: 'Bagian 4 — Sanggah dan bangun argumen utuh (TAP)',
            desc: 'Menyusun argumen ilmiah mandiri: Claim, Data, Warrant, dan Rebuttal pada isu sosiosaintifik transisi bioenergi.'
        }
    };

    const info = bannerInfo[partNum];
    if (info) {
        document.getElementById('partInfoIcon').innerText = info.icon;
        document.getElementById('partInfoBadge').innerText = info.badge;
        document.getElementById('partInfoBadge').className = `${info.badgeBg} text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase`;
        document.getElementById('partInfoSoalCount').innerText = info.soalCount;
        document.getElementById('partInfoTitle').innerText = info.title;
        document.getElementById('partInfoDesc').innerText = info.desc;
    }

    renderQuizPalette();
    renderCurrentQuestion();
}

function renderQuizPalette() {
    const part = appState.quiz.activePart;
    const container = document.getElementById('quizPaletteContainer');
    if (!container) return;

    let html = '';
    for (let i = 0; i < 10; i++) {
        const isActive = appState.quiz.activeQuestionIdx[part] === i;
        let isAnswered = false;

        if (part === 1) {
            isAnswered = appState.quiz.answers[1][i] !== null;
        } else if (part === 2) {
            isAnswered = appState.quiz.answers[2][i] !== null;
        } else if (part === 3) {
            if (i < 6) {
                isAnswered = appState.quiz.answers.part3_mc[i] !== null;
            } else {
                const qId = 21 + i;
                isAnswered = appState.quiz.answers.part3_short[qId] && appState.quiz.answers.part3_short[qId].trim().length > 0;
            }
        } else if (part === 4) {
            const caseId = 31 + i;
            isAnswered = appState.quiz.answers.part4[caseId] && appState.quiz.answers.part4[caseId].saved;
        }

        let globalNum = (part - 1) * 10 + (i + 1);

        let btnClass = 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all ';
        if (isActive) {
            btnClass += 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 scale-105';
        } else if (isAnswered) {
            btnClass += 'bg-emerald-100 text-emerald-900 border-2 border-emerald-300 shadow-sm';
        } else {
            btnClass += 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-900 border border-transparent';
        }

        html += `
                    <button onclick="jumpToQuizQuestion(${i})" class="${btnClass}" title="Soal Nomor ${globalNum}">
                        ${isAnswered && !isActive ? '<i class="fa-solid fa-check text-[10px] mr-0.5"></i>' : ''}${globalNum}
                    </button>
                `;
    }

    container.innerHTML = html;
}

function jumpToQuizQuestion(idx) {
    appState.quiz.activeQuestionIdx[appState.quiz.activePart] = idx;
    renderQuizPalette();
    renderCurrentQuestion();
}

function stepQuizQuestion(dir) {
    const part = appState.quiz.activePart;
    const currentIdx = appState.quiz.activeQuestionIdx[part];
    const newIdx = currentIdx + dir;
    if (newIdx >= 0 && newIdx < 10) {
        jumpToQuizQuestion(newIdx);
    }
}

function renderCurrentQuestion() {
    const part = appState.quiz.activePart;
    const idx = appState.quiz.activeQuestionIdx[part];
    const cardBox = document.getElementById('quizCardBox');
    if (!cardBox) return;

    renderQuizPalette();
    calculateToulminScores();

    // 1. Multiple Choice Renderer (Part 1, Part 2, and Part 3 first 6 questions)
    if (part === 1 || part === 2 || (part === 3 && idx < 6)) {
        let q, userAns, isChecked;
        if (part === 1) {
            q = toulminQuizData.part1[idx];
            userAns = appState.quiz.answers[1][idx];
            isChecked = appState.quiz.checked[1][idx];
        } else if (part === 2) {
            q = toulminQuizData.part2[idx];
            userAns = appState.quiz.answers[2][idx];
            isChecked = appState.quiz.checked[2][idx];
        } else {
            q = toulminQuizData.part3[idx];
            userAns = appState.quiz.answers.part3_mc[idx];
            isChecked = appState.quiz.checked.part3_mc[idx];
        }

        const globalNum = (part - 1) * 10 + (idx + 1);

        let optionsHTML = '';
        q.options.forEach((opt, optIdx) => {
            const isSelected = userAns === optIdx;
            let optClass = 'w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all text-xs sm:text-sm flex items-start gap-3 ';

            if (isChecked) {
                if (optIdx === q.answer) {
                    optClass += 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm';
                } else if (isSelected && optIdx !== q.answer) {
                    optClass += 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                } else {
                    optClass += 'bg-gray-50 border-gray-200 text-gray-500 opacity-60';
                }
            } else {
                if (isSelected) {
                    optClass += 'bg-purple-50 border-purple-600 text-purple-950 font-bold shadow-sm ring-2 ring-purple-200';
                } else {
                    optClass += 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-300';
                }
            }

            const badgeLetter = String.fromCharCode(65 + optIdx);
            optionsHTML += `
                        <button onclick="selectQuizOption(${optIdx})" class="${optClass}">
                            <span class="w-6 h-6 rounded-lg ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                ${badgeLetter}
                            </span>
                            <span class="flex-grow leading-relaxed">${opt}</span>
                            ${isChecked && optIdx === q.answer ? '<i class="fa-solid fa-circle-check text-emerald-600 text-lg shrink-0 mt-0.5"></i>' : ''}
                            ${isChecked && isSelected && optIdx !== q.answer ? '<i class="fa-solid fa-circle-xmark text-rose-500 text-lg shrink-0 mt-0.5"></i>' : ''}
                        </button>
                    `;
        });

        let feedbackHTML = '';
        if (isChecked) {
            const isCorrect = userAns === q.answer;
            if (isCorrect) {
                feedbackHTML = `
                            <div class="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-xs sm:text-sm animate-fadeIn space-y-1">
                                <div class="font-extrabold flex items-center gap-2 text-emerald-900">
                                    <span class="text-base">🎉</span> Jawaban Benar! Luar Biasa!
                                </div>
                                <p class="text-emerald-800 leading-relaxed">${q.explanation}</p>
                            </div>
                        `;
            } else {
                const correctLetter = String.fromCharCode(65 + q.answer);
                feedbackHTML = `
                            <div class="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs sm:text-sm animate-fadeIn space-y-1">
                                <div class="font-extrabold flex items-center gap-2 text-amber-900">
                                    <span class="text-base">💡</span> Jawaban Belum Tepat
                                </div>
                                <p class="text-amber-900 font-semibold">Kunci yang benar adalah pilihan (${correctLetter}): ${q.options[q.answer]}</p>
                                <p class="text-amber-800 text-xs leading-relaxed mt-1"><strong class="text-amber-950">Penjelasan Ilmiah:</strong> ${q.explanation}</p>
                            </div>
                        `;
            }
        }

        cardBox.innerHTML = `
                    <div class="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-gray-100">
                        <span class="bg-pastel-lavender text-purple-950 text-[11px] font-black px-3 py-1 rounded-full uppercase">
                            ${q.category}
                        </span>
                        <span class="text-xs font-bold text-gray-500">
                            Nomor #${globalNum} (Soal ${idx + 1} dari 10 Bagian ${part})
                        </span>
                    </div>

                    <div class="space-y-4">
                        <h3 class="text-base sm:text-lg font-extrabold text-gray-900 leading-relaxed">
                            ${q.question}
                        </h3>

                        <div class="space-y-2.5 pt-1">
                            ${optionsHTML}
                        </div>

                        ${feedbackHTML}
                    </div>

                    <!-- Action Navigation Row -->
                    <div class="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 flex-wrap">
                        <button onclick="stepQuizQuestion(-1)" class="pastel-btn bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 ${idx === 0 ? 'opacity-40 cursor-not-allowed' : ''}">
                            <i class="fa-solid fa-arrow-left"></i> Soal Sebelumnya
                        </button>

                        <div class="flex items-center gap-2">
                            ${!isChecked ? `
                                <button onclick="checkQuizAnswer()" class="pastel-btn bg-pastel-yellow hover:bg-pastel-orange text-amber-950 font-black px-5 py-2 rounded-xl border-2 border-white shadow text-xs sm:text-sm flex items-center gap-1.5 ${userAns === null ? 'opacity-50 cursor-not-allowed' : ''}">
                                    <i class="fa-solid fa-circle-check"></i> Periksa Jawaban
                                </button>
                            ` : ''}

                            <button onclick="stepQuizQuestion(1)" class="pastel-btn bg-pastel-mint hover:bg-pastel-mintDark text-emerald-950 font-bold px-5 py-2 rounded-xl border-2 border-white shadow text-xs sm:text-sm flex items-center gap-1.5 ${idx === 9 ? 'opacity-40 cursor-not-allowed' : ''}">
                                Soal Berikutnya <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                `;
    }
    // 2. Short Answer Renderer (Part 3 questions 27-30)
    else if (part === 3 && idx >= 6) {
        const q = toulminQuizData.part3[idx];
        const qId = q.id;
        const answerText = appState.quiz.answers.part3_short[qId] || '';
        const currentScore = appState.quiz.answers.part3_scores[qId];

        cardBox.innerHTML = `
                    <div class="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-gray-100">
                        <span class="bg-pastel-yellow text-amber-950 text-[11px] font-black px-3 py-1 rounded-full uppercase border border-amber-200">
                            ${q.category}
                        </span>
                        <span class="text-xs font-bold text-gray-500">
                            Nomor #${qId} (Soal ${idx + 1} dari 10 Bagian 3)
                        </span>
                    </div>

                    <div class="space-y-4">
                        <h3 class="text-base sm:text-lg font-extrabold text-gray-900 leading-relaxed">
                            ${q.question}
                        </h3>

                        <div class="p-3 bg-pastel-cream/70 rounded-xl border border-pastel-yellow text-xs text-amber-900 flex items-center gap-2">
                            <span>💡</span>
                            <span><strong>Petunjuk:</strong> ${q.prompt}</span>
                        </div>

                        <div>
                            <label class="block text-xs font-extrabold text-purple-950 mb-1.5">Jawaban Analisis Anda (2–4 Kalimat):</label>
                            <textarea id="shortAnswerInput_${qId}" rows="4" placeholder="Tuliskan klaim dan penjelasan alasan ilmiahnya disini..." class="w-full p-3.5 text-xs sm:text-sm rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition leading-relaxed">${answerText}</textarea>
                        </div>

                        <div class="flex items-center justify-between flex-wrap gap-2">
                            <button onclick="saveShortAnswer(${qId})" class="pastel-btn bg-pastel-mint text-emerald-950 font-black px-5 py-2.5 rounded-xl border-2 border-white shadow text-xs sm:text-sm flex items-center gap-1.5">
                                <i class="fa-solid fa-floppy-disk"></i> Simpan Jawaban
                            </button>

                            <button onclick="toggleShortAnswerModel(${qId})" class="pastel-btn bg-white hover:bg-purple-50 text-purple-950 font-bold px-4 py-2 rounded-xl border-2 border-purple-200 shadow-sm text-xs flex items-center gap-1.5">
                                <i class="fa-solid fa-eye text-purple-600"></i> Model Jawaban Ahli & Rubrik
                            </button>
                        </div>

                        <!-- Accordion Model Jawaban Ahli -->
                        <div id="shortAnswerModelBox_${qId}" class="hidden p-4 rounded-2xl bg-gradient-to-br from-white to-purple-50/50 border-2 border-purple-200 text-xs space-y-3 animate-fadeIn">
                            <div class="font-bold text-purple-950 text-sm flex items-center gap-2 pb-2 border-b border-purple-100">
                                <span>🎓</span> Pedoman Jawaban Ideal & Rubrik Penilaian
                            </div>

                            <div class="space-y-2">
                                <div class="p-3 bg-white rounded-xl border border-purple-100">
                                    <strong class="text-pink-900 block">🎯 Contoh Klaim Ideal:</strong>
                                    <p class="text-gray-700 mt-0.5 leading-relaxed">${q.idealClaim}</p>
                                </div>
                                <div class="p-3 bg-white rounded-xl border border-purple-100">
                                    <strong class="text-purple-900 block">🔗 Alasan Ilmiah (Warrant):</strong>
                                    <p class="text-gray-700 mt-0.5 leading-relaxed">${q.idealReason}</p>
                                </div>
                            </div>

                            <div class="p-3 bg-pastel-yellow/30 rounded-xl border border-pastel-yellow">
                                <strong class="text-amber-950 block">📋 Rubrik Penilaian:</strong>
                                <p class="text-amber-900 mt-0.5 leading-relaxed">${q.rubric}</p>
                            </div>

                            <!-- Self-Scoring Buttons -->
                            <div class="pt-2">
                                <span class="block font-bold text-gray-700 mb-2">Beri Nilai Mandiri Berdasarkan Rubrik:</span>
                                <div class="flex flex-wrap gap-2">
                                    <button onclick="setShortAnswerScore(${qId}, 10)" class="pastel-btn px-3.5 py-1.5 rounded-xl text-xs font-bold border ${currentScore === 10 ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-emerald-50 text-emerald-900 border-emerald-300'}">
                                        ⭐ 2 Poin: Lengkap & Tepat (+10 Pts)
                                    </button>
                                    <button onclick="setShortAnswerScore(${qId}, 5)" class="pastel-btn px-3.5 py-1.5 rounded-xl text-xs font-bold border ${currentScore === 5 ? 'bg-amber-500 text-white border-amber-600' : 'bg-amber-50 text-amber-900 border-amber-300'}">
                                        ✨ 1 Poin: Sebagian Tepat (+5 Pts)
                                    </button>
                                    <button onclick="setShortAnswerScore(${qId}, 0)" class="pastel-btn px-3.5 py-1.5 rounded-xl text-xs font-bold border ${currentScore === 0 ? 'bg-gray-600 text-white border-gray-700' : 'bg-gray-100 text-gray-700 border-gray-300'}">
                                        🔄 0 Poin: Perlu Evaluasi Lagi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Navigation Row -->
                    <div class="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 flex-wrap">
                        <button onclick="stepQuizQuestion(-1)" class="pastel-btn bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5">
                            <i class="fa-solid fa-arrow-left"></i> Soal Sebelumnya
                        </button>
                        <button onclick="stepQuizQuestion(1)" class="pastel-btn bg-pastel-mint hover:bg-pastel-mintDark text-emerald-950 font-bold px-5 py-2 rounded-xl border-2 border-white shadow text-xs sm:text-sm flex items-center gap-1.5 ${idx === 9 ? 'opacity-40 cursor-not-allowed' : ''}">
                            Soal Berikutnya <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                `;
    }
    // 3. Full Toulmin SSI Essay Renderer (Part 4 No. 31-40)
    else if (part === 4) {
        const c = toulminQuizData.part4[idx];
        const caseId = c.id;
        const essayData = appState.quiz.answers.part4[caseId] || { claim: '', data: '', warrant: '', rebuttal: '', saved: false };

        cardBox.innerHTML = `
                    <div class="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-gray-100">
                        <span class="bg-pastel-lavender text-purple-950 text-[11px] font-black px-3 py-1 rounded-full uppercase border border-purple-200">
                            🛡️ LEVEL 4: ARGUMEN UTUH SSI (TOULMIN ARGUMENT PATTERN)
                        </span>
                        <span class="text-xs font-bold text-gray-500">
                            Kasus #${caseId} (${idx + 1} dari 10 Kasus)
                        </span>
                    </div>

                    <!-- Case Study Box -->
                    <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-pastel-cream/80 via-white to-purple-50/50 border-2 border-pastel-yellow space-y-2">
                        <div class="flex items-center gap-2">
                            <span class="text-xl">🌿</span>
                            <h3 class="font-extrabold text-base sm:text-lg text-purple-950">${c.title}</h3>
                        </div>
                        <p class="text-xs sm:text-sm text-gray-700 leading-relaxed">${c.desc}</p>
                        <div class="pt-1 text-xs font-bold text-purple-800 flex items-start gap-1.5">
                            <i class="fa-solid fa-pen-nib mt-0.5 text-pink-500"></i>
                            <span>Tugas Analisis: ${c.task}</span>
                        </div>
                    </div>

                    <!-- 4 Toulmin Pillars Scaffolding Form -->
                    <div class="space-y-4">
                        <div class="p-4 rounded-2xl bg-pastel-pink/20 border-2 border-pastel-pink space-y-1.5">
                            <div class="flex items-center justify-between">
                                <label class="text-xs font-black text-pink-950 flex items-center gap-1.5">
                                    <span>🎯</span> 1. CLAIM (Klaim / Posisi Anda)
                                </label>
                                <span class="text-[10px] text-pink-800 font-semibold">Apa posisi kebijakan yang Anda pertahankan?</span>
                            </div>
                            <textarea id="p4_claim_${caseId}" rows="2" placeholder="Tuliskan pernyataan posisi Anda secara jelas..." class="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-pink-300 focus:border-pink-500 focus:ring-1 focus:ring-pink-300 focus:outline-none bg-white leading-relaxed">${essayData.claim || ''}</textarea>
                        </div>

                        <div class="p-4 rounded-2xl bg-pastel-blue/20 border-2 border-pastel-blue space-y-1.5">
                            <div class="flex items-center justify-between">
                                <label class="text-xs font-black text-blue-950 flex items-center gap-1.5">
                                    <span>📊</span> 2. DATA (Bukti / Informasi Ilmiah)
                                </label>
                                <span class="text-[10px] text-blue-800 font-semibold">Fakta, angka, atau data ilmiah apa yang mendukung?</span>
                            </div>
                            <textarea id="p4_data_${caseId}" rows="2" placeholder="Sebutkan bukti empiris atau fakta sains relevan..." class="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-blue-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-300 focus:outline-none bg-white leading-relaxed">${essayData.data || ''}</textarea>
                        </div>

                        <div class="p-4 rounded-2xl bg-pastel-yellow/30 border-2 border-pastel-yellow space-y-1.5">
                            <div class="flex items-center justify-between">
                                <label class="text-xs font-black text-amber-950 flex items-center gap-1.5">
                                    <span>🔗</span> 3. WARRANT (Alasan Penghubung Ilmiah)
                                </label>
                                <span class="text-[10px] text-amber-900 font-semibold">Mengapa bukti tersebut mendukung klaim Anda?</span>
                            </div>
                            <textarea id="p4_warrant_${caseId}" rows="2" placeholder="Jelaskan penalaran ilmiah/hukum sains yang menghubungkan data dan klaim..." class="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-300 focus:outline-none bg-white leading-relaxed">${essayData.warrant || ''}</textarea>
                        </div>

                        <div class="p-4 rounded-2xl bg-pastel-lavender/30 border-2 border-pastel-lavender space-y-1.5">
                            <div class="flex items-center justify-between">
                                <label class="text-xs font-black text-purple-950 flex items-center gap-1.5">
                                    <span>🛡️</span> 4. REBUTTAL (Sanggahan / Batasan Kritis)
                                </label>
                                <span class="text-[10px] text-purple-900 font-semibold">Tanggapi pandangan berbeda atau batasan klaim Anda!</span>
                            </div>
                            <textarea id="p4_rebuttal_${caseId}" rows="2" placeholder="Bagaimana sanggahan terhadap kekhawatiran atau kondisi di mana klaim gugur?..." class="w-full p-2.5 text-xs sm:text-sm rounded-xl border border-purple-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 focus:outline-none bg-white leading-relaxed">${essayData.rebuttal || ''}</textarea>
                        </div>
                    </div>

                    <!-- Save & Compare Actions -->
                    <div class="flex items-center justify-between flex-wrap gap-2 pt-2">
                        <button onclick="savePart4Essay(${caseId})" class="pastel-btn bg-pastel-mint text-emerald-950 font-black px-6 py-2.5 rounded-xl border-2 border-white shadow text-xs sm:text-sm flex items-center gap-2">
                            <i class="fa-solid fa-floppy-disk"></i> Simpan Argumen Utuh Saya
                        </button>

                        <button onclick="togglePart4Model(${caseId})" class="pastel-btn bg-white hover:bg-purple-50 text-purple-950 font-bold px-4 py-2 rounded-xl border-2 border-purple-200 shadow-sm text-xs flex items-center gap-1.5">
                            <i class="fa-solid fa-compass text-purple-600"></i> Lihat Analisis Ahli Toulmin
                        </button>
                    </div>

                    <!-- Accordion Analisis Ahli Toulmin -->
                    <div id="part4ModelBox_${caseId}" class="hidden p-5 rounded-3xl bg-gradient-to-br from-white to-purple-50/60 border-2 border-purple-200 text-xs space-y-3.5 animate-fadeIn">
                        <div class="font-extrabold text-purple-950 text-sm flex items-center gap-2 pb-2 border-b border-purple-100">
                            <span>🔍</span> Contoh Analisis Ahli Pola Toulmin (TAP) — ${c.title}
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="p-3 bg-white rounded-xl border-2 border-pastel-pink">
                                <span class="font-extrabold text-pink-900 flex items-center gap-1"><span>🎯</span> Claim (Klaim):</span>
                                <p class="text-gray-700 mt-1 leading-relaxed">${c.ideal.claim}</p>
                            </div>

                            <div class="p-3 bg-white rounded-xl border-2 border-pastel-blue">
                                <span class="font-extrabold text-blue-900 flex items-center gap-1"><span>📊</span> Data (Bukti):</span>
                                <p class="text-gray-700 mt-1 leading-relaxed">${c.ideal.data}</p>
                            </div>

                            <div class="p-3 bg-white rounded-xl border-2 border-pastel-yellow">
                                <span class="font-extrabold text-amber-900 flex items-center gap-1"><span>🔗</span> Warrant (Alasan Ilmiah):</span>
                                <p class="text-gray-700 mt-1 leading-relaxed">${c.ideal.warrant}</p>
                            </div>

                            <div class="p-3 bg-white rounded-xl border-2 border-pastel-lavender">
                                <span class="font-extrabold text-purple-900 flex items-center gap-1"><span>🛡️</span> Rebuttal (Sanggahan):</span>
                                <p class="text-gray-700 mt-1 leading-relaxed">${c.ideal.rebuttal}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Row -->
                    <div class="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 flex-wrap">
                        <button onclick="stepQuizQuestion(-1)" class="pastel-btn bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 ${idx === 0 ? 'opacity-40 cursor-not-allowed' : ''}">
                            <i class="fa-solid fa-arrow-left"></i> Kasus Sebelumnya
                        </button>
                        <button onclick="stepQuizQuestion(1)" class="pastel-btn bg-pastel-mint hover:bg-pastel-mintDark text-emerald-950 font-bold px-5 py-2 rounded-xl border-2 border-white shadow text-xs sm:text-sm flex items-center gap-1.5 ${idx === 9 ? 'opacity-40 cursor-not-allowed' : ''}">
                            Kasus Berikutnya <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                `;
    }
}

function selectQuizOption(optIdx) {
    const part = appState.quiz.activePart;
    const idx = appState.quiz.activeQuestionIdx[part];

    if (part === 1) {
        appState.quiz.answers[1][idx] = optIdx;
        appState.quiz.checked[1][idx] = false;
    } else if (part === 2) {
        appState.quiz.answers[2][idx] = optIdx;
        appState.quiz.checked[2][idx] = false;
    } else if (part === 3 && idx < 6) {
        appState.quiz.answers.part3_mc[idx] = optIdx;
        appState.quiz.checked.part3_mc[idx] = false;
    }

    renderCurrentQuestion();
}

function checkQuizAnswer() {
    const part = appState.quiz.activePart;
    const idx = appState.quiz.activeQuestionIdx[part];
    let userAns, q;

    if (part === 1) {
        userAns = appState.quiz.answers[1][idx];
        q = toulminQuizData.part1[idx];
        if (userAns === null) return alert('Pilihlah salah satu opsi jawaban terlebih dahulu ya!');
        appState.quiz.checked[1][idx] = true;
    } else if (part === 2) {
        userAns = appState.quiz.answers[2][idx];
        q = toulminQuizData.part2[idx];
        if (userAns === null) return alert('Pilihlah salah satu opsi jawaban terlebih dahulu ya!');
        appState.quiz.checked[2][idx] = true;
    } else if (part === 3 && idx < 6) {
        userAns = appState.quiz.answers.part3_mc[idx];
        q = toulminQuizData.part3[idx];
        if (userAns === null) return alert('Pilihlah salah satu opsi jawaban terlebih dahulu ya!');
        appState.quiz.checked.part3_mc[idx] = true;
    }

    Sheets.send('kuis', {
        bagian: part,
        no_soal: q.id,
        jawaban: String.fromCharCode(65 + userAns),
        kunci: String.fromCharCode(65 + q.answer),
        benar: userAns === q.answer ? 'Ya' : 'Tidak'
    });

    if (userAns === q.answer) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    }

    calculateToulminScores();
    renderCurrentQuestion();
}

function saveShortAnswer(qId) {
    const val = document.getElementById(`shortAnswerInput_${qId}`).value.trim();
    if (!val) {
        alert('Tuliskan jawaban Anda terlebih dahulu sebelum menyimpan!');
        return;
    }
    appState.quiz.answers.part3_short[qId] = val;
    if (appState.quiz.answers.part3_scores[qId] === 0 || appState.quiz.answers.part3_scores[qId] === null) {
        appState.quiz.answers.part3_scores[qId] = 10; // Default full points upon completion
    }
    Sheets.send('uraian', { no_soal: qId, jawaban: val, skor: appState.quiz.answers.part3_scores[qId] });
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    calculateToulminScores();
    renderQuizPalette();
    alert('Jawaban singkat Anda berhasil disimpan!');
}

function toggleShortAnswerModel(qId) {
    const box = document.getElementById(`shortAnswerModelBox_${qId}`);
    if (box) box.classList.toggle('hidden');
}

function setShortAnswerScore(qId, score) {
    appState.quiz.answers.part3_scores[qId] = score;
    Sheets.send('uraian', { no_soal: qId, jawaban: appState.quiz.answers.part3_short[qId], skor: score });
    calculateToulminScores();
    renderCurrentQuestion();
}

function savePart4Essay(caseId) {
    const claim = document.getElementById(`p4_claim_${caseId}`).value.trim();
    const data = document.getElementById(`p4_data_${caseId}`).value.trim();
    const warrant = document.getElementById(`p4_warrant_${caseId}`).value.trim();
    const rebuttal = document.getElementById(`p4_rebuttal_${caseId}`).value.trim();

    if (!claim || !data || !warrant || !rebuttal) {
        alert('Harap lengkapi keempat pilar Toulmin (Claim, Data, Warrant, Rebuttal) sebelum menyimpan!');
        return;
    }

    appState.quiz.answers.part4[caseId] = {
        claim,
        data,
        warrant,
        rebuttal,
        saved: true
    };

    Sheets.send('esai', { no_kasus: caseId, claim, data, warrant, rebuttal });
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    calculateToulminScores();
    renderQuizPalette();
    alert(`Argumen Toulmin untuk Kasus #${caseId} berhasil disimpan ke Portofolio Laporan!`);
}

function togglePart4Model(caseId) {
    const box = document.getElementById(`part4ModelBox_${caseId}`);
    if (box) box.classList.toggle('hidden');
}

function toggleToulminGuideModal() {
    const modal = document.getElementById('modalToulminGuide');
    if (modal) modal.classList.toggle('hidden');
}

function calculateToulminScores() {
    // Part 1 Score
    let p1Correct = 0;
    toulminQuizData.part1.forEach((q, i) => {
        if (appState.quiz.answers[1][i] === q.answer) p1Correct++;
    });
    const p1Score = p1Correct * 10;

    // Part 2 Score
    let p2Correct = 0;
    toulminQuizData.part2.forEach((q, i) => {
        if (appState.quiz.answers[2][i] === q.answer) p2Correct++;
    });
    const p2Score = p2Correct * 10;

    // Part 3 Score: 6 MC + 4 Short answers
    let p3McCorrect = 0;
    for (let i = 0; i < 6; i++) {
        if (appState.quiz.answers.part3_mc[i] === toulminQuizData.part3[i].answer) p3McCorrect++;
    }
    let p3ShortScore = 0;
    [27, 28, 29, 30].forEach(qId => {
        p3ShortScore += (appState.quiz.answers.part3_scores[qId] || 0);
    });
    const p3Score = (p3McCorrect * 10) + p3ShortScore;

    // Part 4 Score: Count of completed essays
    let p4Count = 0;
    for (let cId = 31; cId <= 40; cId++) {
        if (appState.quiz.answers.part4[cId] && appState.quiz.answers.part4[cId].saved) p4Count++;
    }

    const totalScorePG = p1Score + p2Score + (p3McCorrect * 10);

    // Update appState
    appState.quiz.scores.part1 = p1Score;
    appState.quiz.scores.part2 = p2Score;
    appState.quiz.scores.part3 = p3Score;
    appState.quiz.scores.part4Count = p4Count;
    appState.quiz.scores.grandTotal = totalScorePG;

    // Update Top Badges & Live Counters
    const elLiveScore = document.getElementById('quizLiveScore');
    if (elLiveScore) elLiveScore.innerText = `${totalScorePG} / 260`;

    const elLiveEssay = document.getElementById('quizLiveEssayCount');
    if (elLiveEssay) elLiveEssay.innerText = `${p4Count} / 10`;

    // Update Progress in 4 Selector Cards
    const p1Answered = appState.quiz.answers[1].filter(a => a !== null).length;
    const p2Answered = appState.quiz.answers[2].filter(a => a !== null).length;
    const p3McAnswered = appState.quiz.answers.part3_mc.filter(a => a !== null).length;
    let p3ShortAnswered = 0;
    [27, 28, 29, 30].forEach(qId => { if (appState.quiz.answers.part3_short[qId]) p3ShortAnswered++; });
    const p3TotalAnswered = p3McAnswered + p3ShortAnswered;

    if (document.getElementById('partProg1')) document.getElementById('partProg1').innerText = `${p1Answered}/10 Terjawab`;
    if (document.getElementById('partScore1')) document.getElementById('partScore1').innerText = `${p1Score} Pts`;

    if (document.getElementById('partProg2')) document.getElementById('partProg2').innerText = `${p2Answered}/10 Terjawab`;
    if (document.getElementById('partScore2')) document.getElementById('partScore2').innerText = `${p2Score} Pts`;

    if (document.getElementById('partProg3')) document.getElementById('partProg3').innerText = `${p3TotalAnswered}/10 Selesai`;
    if (document.getElementById('partScore3')) document.getElementById('partScore3').innerText = `${p3Score} Pts`;

    if (document.getElementById('partProg4')) document.getElementById('partProg4').innerText = `${p4Count}/10 Kasus`;

    // Update Summary Card at the bottom of Quiz
    if (document.getElementById('sumScoreP1')) document.getElementById('sumScoreP1').innerText = `${p1Score} / 100`;
    if (document.getElementById('sumCountP1')) document.getElementById('sumCountP1').innerText = `${p1Correct}/10 Benar`;

    if (document.getElementById('sumScoreP2')) document.getElementById('sumScoreP2').innerText = `${p2Score} / 100`;
    if (document.getElementById('sumCountP2')) document.getElementById('sumCountP2').innerText = `${p2Correct}/10 Benar`;

    if (document.getElementById('sumScoreP3')) document.getElementById('sumScoreP3').innerText = `${p3Score} / 100`;
    if (document.getElementById('sumCountP3')) document.getElementById('sumCountP3').innerText = `${p3TotalAnswered}/10 Selesai`;

    if (document.getElementById('sumScoreP4')) document.getElementById('sumScoreP4').innerText = `${p4Count} / 10`;
    if (document.getElementById('sumCountP4')) document.getElementById('sumCountP4').innerText = `Kasus Tersusun`;

    if (document.getElementById('toulminGrandTotalScore')) {
        document.getElementById('toulminGrandTotalScore').innerText = `${totalScorePG} / 260`;
    }

    // Mastery level indicator
    let masteryIcon = '🌱';
    let masteryText = 'Pemula (Mulai asah penalaran ilmiahmu!)';
    if (totalScorePG >= 220 && p4Count >= 5) {
        masteryIcon = '🏆';
        masteryText = 'Mahir / Expert Argumentasi Toulmin (TAP)';
    } else if (totalScorePG >= 160) {
        masteryIcon = '🌟';
        masteryText = 'Cakap (Penalaran ilmiah kuat & kritis)';
    } else if (totalScorePG >= 80) {
        masteryIcon = '📈';
        masteryText = 'Berkembang (Terus eksplorasi bukti ilmiah)';
    }

    if (document.getElementById('toulminMasteryIcon')) document.getElementById('toulminMasteryIcon').innerText = masteryIcon;
    if (document.getElementById('toulminMasteryText')) document.getElementById('toulminMasteryText').innerText = masteryText;

    Sheets.summary();
}
