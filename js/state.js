/* STATE MANAGEMENT */
const appState = {
    user: {
        id: '',
        name: '',
        class: ''
    },
    quiz: {
        activePart: 1,
        activeQuestionIdx: { 1: 0, 2: 0, 3: 0, 4: 0 },
        answers: {
            1: Array(10).fill(null),
            2: Array(10).fill(null),
            part3_mc: Array(6).fill(null),
            part3_short: { 27: '', 28: '', 29: '', 30: '' },
            part3_scores: { 27: 0, 28: 0, 29: 0, 30: 0 },
            part4: {
                31: { claim: '', data: '', warrant: '', rebuttal: '', saved: false },
                32: { claim: '', data: '', warrant: '', rebuttal: '', saved: false },
                33: { claim: '', data: '', warrant: '', rebuttal: '', saved: false },
                34: { claim: '', data: '', warrant: '', rebuttal: '', saved: false },
                35: { claim: '', data: '', warrant: '', rebuttal: '', saved: false },
                36: { claim: '', data: '', warrant: '', rebuttal: '', saved: false },
                37: { claim: '', data: '', warrant: '', rebuttal: '', saved: false },
                38: { claim: '', data: '', warrant: '', rebuttal: '', saved: false },
                39: { claim: '', data: '', warrant: '', rebuttal: '', saved: false },
                40: { claim: '', data: '', warrant: '', rebuttal: '', saved: false }
            }
        },
        checked: {
            1: Array(10).fill(false),
            2: Array(10).fill(false),
            part3_mc: Array(6).fill(false)
        },
        scores: {
            part1: 0,
            part2: 0,
            part3: 0,
            part4Count: 0,
            grandTotal: 0
        }
    },
    reflection: {
        claim: '',
        data: '',
        warrant: '',
        rebuttal: ''
    },
    tts: ttsFreshState(),
    ttsLevels: []
};

let currentPartIndex = 1;

/* Dipindah dari features/tts.js: dipakai saat appState dibuat (sebelumnya aman karena hoisting satu file) */
function ttsFreshState() {
    return {
        entries: {}, locked: {}, hinted: {}, wordHints: {}, solvedWords: [], completed: false, started: false,
        hintsLeft: 3, hintsUsed: 0, seconds: 0, score: 0, combo: 0, bestCombo: 0, timerInterval: null,
        activeWordId: null, activeKey: null, finalScore: 0, rank: '', stars: 0
    };
}
