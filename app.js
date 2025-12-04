// Game State
const gameState = {
    currentScreen: 'menu',
    player: {
        code: '',
        avatar: '',
        avatarName: ''
    },
    game: {
        type: '',
        difficulty: '',
        startTime: null,
        endTime: null,
        operations: [],
        userAnswers: []
    },
    timer: null
};

// Avatar Configuration
const avatars = [
    { id: 'chick', name: 'Pollito', file: 'avatar_chick_1764422917481.png' },
    { id: 'cat', name: 'Gatito', file: 'avatar_cat_1764422931277.png' },
    { id: 'dog', name: 'Perrito', file: 'avatar_dog_1764422945870.png' },
    { id: 'dolphin', name: 'Delfín', file: 'avatar_dolphin_1764422961172.png' },
    { id: 'crocodile', name: 'Cocodrilo', file: 'avatar_crocodile_1764422974808.png' },
    { id: 'hippo', name: 'Hipopótamo', file: 'avatar_hippo_1764422989049.png' },
    { id: 'lion', name: 'León', file: 'avatar_lion_1764423001361.png' },
    { id: 'elephant', name: 'Elefante', file: 'avatar_elephant_v3_1764443799668.png' }
];

// Constants for difficulty configuration
const DIFFICULTY_CONFIG = {
    suma: {
        facil: { operations: 2, count: 2, minDigits: 2, maxDigits: 4 },
        media: { operations: 4, count: 3, minDigits: 4, maxDigits: 6 },
        dificil: { operations: 6, count: 4, minDigits: 8, maxDigits: 8 }
    },
    resta: {
        facil: { operations: 2, count: 2, minDigits: 2, maxDigits: 4 },
        media: { operations: 4, count: 2, minDigits: 4, maxDigits: 6 },
        dificil: { operations: 6, count: 2, minDigits: 8, maxDigits: 8 }
    },
    multiplicacion: {
        facil: { operations: 5, min: 2, max: 9 },
        media: { operations: 10, min: 2, max: 9 },
        dificil: { operations: 15, min: 2, max: 9 }
    },
    multiplica_compleja: {
        facil: { operations: 2, factor1Digits: { min: 2, max: 4 }, factor2Digits: 1 },
        media: { operations: 2, factor1Digits: 6, factor2Digits: 2 },
        dificil: { operations: 2, factor1Digits: 8, factor2Digits: 3 }
    },
    division_2dg: {
        facil: { operations: 2, dividendDigits: 4, divisorMin: 11, divisorMax: 29 },
        media: { operations: 3, dividendDigits: 6, divisorMin: 21, divisorMax: 59 },
        dificil: { operations: 4, dividendDigits: 8, divisorMin: 31, divisorMax: 89 }
    },
    division: {
        facil: { operations: 2, dividendDigits: 4, divisorDigits: 1 },
        media: { operations: 2, dividendDigits: 5, divisorDigits: 1 },
        dificil: { operations: 2, dividendDigits: 6, divisorDigits: 2 }
    },
    sudoku: {
        facil: { operations: 1 },
        media: { operations: 1 },
        dificil: { operations: 1 }
    },
    cuadrado_magico: {
        facil: { operations: 1 },
        media: { operations: 1 },
        dificil: { operations: 1 }
    },
    encadenados: {
        facil: { operations: 1, initialDigits: 1, stepsMin: 2, stepsMax: 4, ops: ['+', '-'] },
        media: { operations: 2, initialDigits: 2, stepsMin: 4, stepsMax: 4, ops: ['+', '-'] },
        dificil: { operations: 3, initialDigits: 2, stepsMin: 6, stepsMax: 6, ops: ['+', '-', '×', '÷'] }
    }
};

const GAME_INFO = {
    suma: {
        title: 'Suma',
        icon: '➕',
        description: 'Resuelve varias sumas en vertical, alineando cada columna y rellenando el resultado final.'
    },
    resta: {
        title: 'Resta',
        icon: '➖',
        description: 'Calcula restas en vertical asegurando que cada cifra está alineada para obtener el resultado correcto.'
    },
    multiplicacion: {
        title: 'Tablas multiplicar',
        icon: '🔢',
        description: 'Completa productos de un dígito por un dígito (tablas del 2 al 9) rellenando cada resultado.'
    },
    multiplica_compleja: {
        title: 'Multiplica',
        icon: '✖️',
        description: 'Resuelve multiplicaciones de varios dígitos rellenando cada parcial y el resultado total alineado a la derecha.'
    },
    division: {
        title: 'Divide',
        icon: '÷',
        description: 'Realiza divisiones de un divisor de un dígito, introduciendo cociente y resto cumpliendo la igualdad.'
    },
    division_2dg: {
        title: 'Divide 2dg',
        icon: '÷',
        description: 'Resuelve divisiones con divisor de dos dígitos; introduce el cociente y el resto coherente con la operación.'
    },
    sudoku: {
        title: 'Sudoku lógico',
        icon: '🧩',
        description: 'Pequeño sudoku adaptado: rellena cada fila y columna con los números correctos cumpliendo las operaciones sugeridas.'
    },
    cuadrado_magico: {
        title: 'Cuadrado mágico',
        icon: '🔲',
        description: 'Rellena la cuadrícula para que todas las filas, columnas y diagonales sumen lo mismo.'
    },
    encadenados: {
        title: 'Números encadenados',
        icon: '🔗',
        description: 'Aplica mentalmente una cadena de operaciones sobre un número inicial y escribe el resultado final.'
    }
};

const POINTS_CONFIG = {
    facil: 1,
    media: 2,
    dificil: 5
};

const LOGIC_POINTS = {
    facil: 3,
    media: 6,
    dificil: 10
};

const MULT_DIV_POINTS = {
    facil: 4,
    media: 8,
    dificil: 12
};

const CHAIN_POINTS = {
    facil: 1,
    media: 3,
    dificil: 5
};

const BASE_LOGIC_PUZZLES = {
    sudoku: {
        facil: {
            solution: [
                [1, 2, 3],
                [2, 3, 1],
                [3, 1, 2]
            ],
            prefilled: [
                [1, null, null],
                [null, 3, null],
                [null, null, 2]
            ]
        },
        media: {
            solution: [
                [1, 2, 3, 4],
                [3, 4, 1, 2],
                [2, 1, 4, 3],
                [4, 3, 2, 1]
            ],
            prefilled: [
                [1, null, null, 4],
                [null, 4, null, null],
                [null, null, 4, 3],
                [4, null, null, 1]
            ]
        },
        dificil: {
            solution: [
                [1, 2, 3, 4, 5],
                [2, 3, 4, 5, 1],
                [3, 4, 5, 1, 2],
                [4, 5, 1, 2, 3],
                [5, 1, 2, 3, 4]
            ],
            prefilled: [
                [1, null, null, null, 5],
                [null, 3, null, 5, null],
                [null, null, 5, null, 2],
                [null, 5, null, 2, null],
                [5, null, null, null, 4]
            ]
        }
    },
    cuadrado_magico: {
        facil: {
            magicSum: 15,
            solution: [
                [8, 1, 6],
                [3, 5, 7],
                [4, 9, 2]
            ],
            prefilled: [
                [8, null, null],
                [null, 5, null],
                [null, null, 2]
            ]
        }
    }
};

// Initialize app on load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadAvatars();
    attachEventListeners();
    showScreen('menu');
}

// Screen Navigation
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(`${screenName}-screen`).classList.add('active');
    gameState.currentScreen = screenName;
}

// Load Avatars
function loadAvatars() {
    const avatarGrid = document.getElementById('avatar-selection');
    avatarGrid.innerHTML = '';

    avatars.forEach(avatar => {
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar-option-compact';
        avatarDiv.dataset.avatarId = avatar.id;
        avatarDiv.innerHTML = `
            <img src="assets/${avatar.file}" alt="${avatar.name}" class="avatar-image-compact" title="${avatar.name}">
        `;

        avatarDiv.addEventListener('click', () => selectAvatar(avatar.id));
        avatarGrid.appendChild(avatarDiv);
    });
}

// Event Listeners
function attachEventListeners() {
    // Menu buttons
    document.getElementById('btn-new-game').addEventListener('click', () => {
        resetGameSetup();
        showScreen('setup');
    });
    document.getElementById('btn-history').addEventListener('click', () => {
        loadHistory();
        showScreen('history');
    });
    document.getElementById('btn-leaderboard').addEventListener('click', () => {
        loadLeaderboard();
        showScreen('leaderboard');
    });
    document.getElementById('btn-reset').addEventListener('click', () => {
        const confirmed = confirm('¿Seguro que quieres borrar todos los datos?');
        if (confirmed) {
            localStorage.clear();
            location.reload();
        }
    });

    // Setup screen
    document.getElementById('btn-back-setup').addEventListener('click', () => showScreen('menu'));
    document.getElementById('user-code').addEventListener('input', (e) => {
        validateSetup();

        // Pre-select avatar if user code exists in history
        const userCode = e.target.value.toUpperCase();
        if (userCode.length >= 3) {
            const history = JSON.parse(localStorage.getItem('mathGameHistory') || '[]');
            const userGames = history.filter(game => game.userCode === userCode);
            if (userGames.length > 0) {
                // Get the most recent game's avatar
                const lastAvatar = userGames[0].avatar;
                const avatarFile = lastAvatar.split('/').pop();
                const avatarId = avatars.find(a => avatarFile.includes(a.id))?.id;
                if (avatarId) {
                    selectAvatar(avatarId);
                }
            }
        }
    });
    document.getElementById('btn-start-game').addEventListener('click', startGame);

    // Game type and difficulty selection
    document.querySelectorAll('[data-game-type]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-game-type]').forEach(b => b.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
            gameState.game.type = e.currentTarget.dataset.gameType;
            updateSelectedTypeDisplay(e.currentTarget);
            validateSetup();
        });
    });

    document.querySelectorAll('[data-difficulty]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('[data-difficulty]').forEach(b => b.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
            gameState.game.difficulty = e.currentTarget.dataset.difficulty;
            validateSetup();
        });
    });

    // Game screen
    document.getElementById('btn-finish').addEventListener('click', finishGame);
    document.getElementById('btn-back-game').addEventListener('click', () => {
        // FIX v6: Only ask confirmation once
        if (confirm('¿Estás seguro de que quieres volver? Esta partida no se guardará.')) {
            stopTimer();
            showScreen('setup');
        }
    });

    // Results screen
    document.getElementById('btn-new-game-results').addEventListener('click', () => {
        // Restart game with same configuration (don't reset setup)
        startGame();
    });
    document.getElementById('btn-menu-results').addEventListener('click', () => showScreen('menu'));

    // History screen
    document.getElementById('btn-back-history').addEventListener('click', () => showScreen('menu'));

    // Leaderboard screen
    document.getElementById('btn-back-leaderboard').addEventListener('click', () => showScreen('menu'));

    // Type info modal
    document.getElementById('btn-type-info').addEventListener('click', openTypeInfoModal);
    document.getElementById('type-info-close').addEventListener('click', closeTypeInfoModal);
    document.getElementById('type-info-modal').addEventListener('click', (e) => {
        if (e.target.id === 'type-info-modal') closeTypeInfoModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeTypeInfoModal();
    });
}

// Reset Game Setup
function resetGameSetup() {
    gameState.player = { code: '', avatar: '', avatarName: '' };
    gameState.game = { type: '', difficulty: '', startTime: null, endTime: null, operations: [], userAnswers: [] };

    document.getElementById('user-code').value = '';
    document.querySelectorAll('.avatar-option-compact').forEach(option => option.classList.remove('selected'));
    document.querySelectorAll('[data-game-type]').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('[data-difficulty]').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('btn-start-game').disabled = true;
    updateSelectedTypeDisplay(null);

    // Load recent users
    loadRecentUsers();

    // v11: Pre-fill with last user code if available
    const history = JSON.parse(localStorage.getItem('mathGameHistory') || '[]');
    if (history.length > 0) {
        const lastUserCode = history[0].userCode;
        if (lastUserCode) {
            document.getElementById('user-code').value = lastUserCode;
            // Trigger input event to validate and load avatar
            document.getElementById('user-code').dispatchEvent(new Event('input'));
        }
    }
}

// Avatar Selection
function selectAvatar(avatarId) {
    document.querySelectorAll('.avatar-option-compact').forEach(option => {
        option.classList.remove('selected');
    });

    const selected = document.querySelector(`[data-avatar-id="${avatarId}"]`);
    selected.classList.add('selected');

    const avatar = avatars.find(a => a.id === avatarId);
    gameState.player.avatar = `assets/${avatar.file}`;
    gameState.player.avatarName = avatar.name;

    validateSetup();
}

// Validate Setup Form
function validateSetup() {
    const userCode = document.getElementById('user-code').value.toUpperCase();
    const codeValid = /^[A-Z0-9]{3,5}$/.test(userCode);
    const avatarValid = gameState.player.avatar !== '';
    const typeValid = gameState.game.type !== '';
    const difficultyValid = gameState.game.difficulty !== '';

    gameState.player.code = userCode;

    const startButton = document.getElementById('btn-start-game');
    startButton.disabled = !(codeValid && avatarValid && typeValid && difficultyValid);
}

// Load Recent Users
function loadRecentUsers() {
    const recentUsersContainer = document.getElementById('recent-users');
    const history = JSON.parse(localStorage.getItem('mathGameHistory') || '[]');

    if (history.length === 0) {
        recentUsersContainer.innerHTML = '';
        return;
    }

    // Get last 5 unique user codes
    const uniqueUsers = [];
    const seenCodes = new Set();

    for (const game of history) {
        if (!seenCodes.has(game.userCode)) {
            uniqueUsers.push(game.userCode);
            seenCodes.add(game.userCode);
        }
        if (uniqueUsers.length >= 5) break;
    }

    if (uniqueUsers.length === 0) {
        recentUsersContainer.innerHTML = '';
        return;
    }

    // Create links
    recentUsersContainer.innerHTML = uniqueUsers.map(code =>
        `<a href="#" class="recent-user-link" data-code="${code}">${code}</a>`
    ).join(' ');

    // Add click handlers
    document.querySelectorAll('.recent-user-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const code = e.target.dataset.code;
            document.getElementById('user-code').value = code;
            // Trigger input event to pre-select avatar
            document.getElementById('user-code').dispatchEvent(new Event('input'));
        });
    });
}

// Start Game
function startGame() {
    const finishBtn = document.getElementById('btn-finish');
    if (finishBtn) finishBtn.disabled = false; // reset in case a previous "Solucionar" lo dejó desactivado

    generateOperations();
    renderGameScreen();
    startTimer();
    showScreen('game');
    // v11: Scroll operation container to top
    setTimeout(() => {
        const container = document.getElementById('operation-container');
        if (container) {
            container.scrollTop = 0;
        }
    }, 0);
}

// Generate Random Number
function randomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utility helpers for logic puzzles (randomization)
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function randomPermutation(size) {
    return shuffleArray([...Array(size).keys()]);
}

function permuteGrid(grid, rowPerm, colPerm) {
    return rowPerm.map(rIdx => colPerm.map(cIdx => grid[rIdx][cIdx]));
}

function applyDigitMap(grid, digitMap) {
    return grid.map(row => row.map(cell => cell == null ? null : digitMap[cell]));
}

// Build nested expression tokens with parentheses for chained numbers
function buildChainedTokens(start, steps) {
    let expr = `${start}`;
    steps.forEach(step => {
        expr = `( ${expr} ${step.op} ${step.value} )`;
    });
    return expr.split(' ').filter(Boolean);
}

function generateSudokuPuzzle(difficulty) {
    const base = BASE_LOGIC_PUZZLES.sudoku[difficulty];
    const size = base.solution.length;

    const rowPerm = randomPermutation(size);
    const colPerm = randomPermutation(size);
    const digitPermutation = randomPermutation(size).map(v => v + 1); // digits start at 1
    const digitMap = {};
    digitPermutation.forEach((val, idx) => { digitMap[idx + 1] = val; });

    const permSolution = applyDigitMap(permuteGrid(base.solution, rowPerm, colPerm), digitMap);
    const permPrefilled = applyDigitMap(permuteGrid(base.prefilled, rowPerm, colPerm), digitMap);

    return { solution: permSolution, prefilled: permPrefilled };
}

function generateMagicSquarePuzzle(difficulty) {
    if (difficulty === 'facil') {
        const base = BASE_LOGIC_PUZZLES.cuadrado_magico.facil;
        const size = base.solution.length;
        const validOffsets = [-1, 0];

        for (let attempt = 0; attempt < 10; attempt++) {
            const perm = randomPermutation(size);
            const permSolution = permuteGrid(base.solution, perm, perm);
            const permPrefilled = permuteGrid(base.prefilled, perm, perm);

            let offset = validOffsets[Math.floor(Math.random() * validOffsets.length)];
            const minVal = Math.min(...permSolution.flat()) + offset;
            const maxVal = Math.max(...permSolution.flat()) + offset;
            if (minVal < 0 || maxVal > 9) offset = 0;

            const shiftedSolution = permSolution.map(row => row.map(val => val + offset));
            const shiftedPrefilled = permPrefilled.map(row => row.map(val => val === null ? null : val + offset));
            const shiftedMagicSum = base.magicSum + size * offset;

            if (isMagicGrid(shiftedSolution, shiftedMagicSum)) {
                const finalSum = computeMagicSum(shiftedSolution);
                return {
                    magicSum: finalSum,
                    solution: shiftedSolution,
                    prefilled: shiftedPrefilled
                };
            }
        }

        // Fallback seguro
        const finalSum = computeMagicSum(base.solution);
        return {
            magicSum: base.magicSum,
            solution: base.solution,
            prefilled: base.prefilled
        };
    }

    if (difficulty === 'media') {
        for (let attempt = 0; attempt < 10; attempt++) {
            const offset = randomInRange(0, 6); // mantiene valores 0..9
            const digits = [0, 1, 2, 3].map(d => d + offset);
            const [a, b, c, d] = digits;
            const solution = [
                [a, b, c, d],
                [d, c, b, a],
                [b, a, d, c],
                [c, d, a, b]
            ];
            const magicSum = a + b + c + d;
            if (!isMagicGrid(solution, magicSum)) continue;

            const prefilled = solution.map((row, r) =>
                row.map((val, cIdx) => ((r + cIdx) % 2 === 0 ? val : null))
            );
            const finalSum = computeMagicSum(solution);
            return { magicSum: finalSum, solution, prefilled };
        }

        // Fallback
        const digits = [0, 1, 2, 3];
        const [a, b, c, d] = digits;
        const solution = [
            [a, b, c, d],
            [d, c, b, a],
            [b, a, d, c],
            [c, d, a, b]
        ];
        const magicSum = a + b + c + d;
        const prefilled = solution.map((row, r) =>
            row.map((val, cIdx) => ((r + cIdx) % 2 === 0 ? val : null))
        );
        const finalSum = computeMagicSum(solution);
        return { magicSum: finalSum, solution, prefilled };
    }

    // difícil: 5x5 con valores 0..9 y diagonales correctas (circulante, no uniforme)
    for (let attempt = 0; attempt < 10; attempt++) {
        const baseDigits = [0, 1, 2, 3, 4];
        const offset = randomInRange(0, 5); // mantiene valores en 0..9
        const digits = baseDigits.map(d => d + offset);
        const size = 5;

        // Matriz circulante que mantiene sumas iguales en filas/columnas/diagonales
        const solution = Array.from({ length: size }, (_, r) =>
            Array.from({ length: size }, (_, c) => digits[(c + r * 2) % size])
        );

        const magicSum = computeMagicSum(solution);
        if (!isMagicGrid(solution, magicSum)) continue;
        const distinct = new Set(solution.flat());
        if (distinct.size < 2) continue; // evita tablero uniforme

        const prefilled = solution.map((row, r) =>
            row.map((val, cIdx) => (r === cIdx || r + cIdx === size - 1 ? val : null))
        );
        return { magicSum, solution, prefilled };
    }

    // Fallback 5x5 en caso improbable (patrón circulante fijo 0..4)
    const fallbackDigits = [0, 1, 2, 3, 4];
    const fallbackSolution = Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => fallbackDigits[(c + r * 2) % 5])
    );
    const fallbackSum = computeMagicSum(fallbackSolution);
    const fallbackPrefilled = fallbackSolution.map((row, r) =>
        row.map((val, cIdx) => (r === cIdx || r + cIdx === 5 - 1 ? val : null))
    );
    return { magicSum: fallbackSum, solution: fallbackSolution, prefilled: fallbackPrefilled };
}

// Update visible selected game type
function updateSelectedTypeDisplay(selectedBtn) {
    const display = document.getElementById('selected-type-display');
    const infoBtn = document.getElementById('btn-type-info');
    if (!display) return;

    if (!selectedBtn) {
        display.textContent = 'Selecciona un tipo de juego';
        display.classList.remove('active');
        if (infoBtn) {
            infoBtn.disabled = true;
            infoBtn.dataset.type = '';
        }
        return;
    }

    const label = selectedBtn.querySelector('.option-label')?.textContent?.trim() || selectedBtn.textContent.trim();
    display.textContent = `Tipo seleccionado: ${label}`;
    display.classList.add('active');
    if (infoBtn) {
        infoBtn.disabled = false;
        infoBtn.dataset.type = selectedBtn.dataset.gameType;
    }
}

// Modal: mostrar info del tipo de juego
function openTypeInfoModal() {
    const modal = document.getElementById('type-info-modal');
    if (!modal) return;

    const type = gameState.game.type;
    if (!type) return;

    const info = GAME_INFO[type] || {};
    document.getElementById('type-info-icon').textContent = info.icon || 'ℹ️';
    document.getElementById('type-info-title').textContent = info.title || 'Tipo de juego';
    document.getElementById('type-info-description').textContent =
        info.description || 'Practica y gana puntos completando el juego.';

    const pointsList = document.getElementById('type-info-points');
    pointsList.innerHTML = '';
    buildScoringLines(type).forEach(line => {
        const li = document.createElement('li');
        li.textContent = line;
        pointsList.appendChild(li);
    });

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
}

function closeTypeInfoModal() {
    const modal = document.getElementById('type-info-modal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

function buildScoringLines(type) {
    const config = DIFFICULTY_CONFIG[type];
    if (!config) return [];

    const difficultyOrder = [
        { key: 'facil', label: 'Fácil' },
        { key: 'media', label: 'Media' },
        { key: 'dificil', label: 'Difícil' }
    ];

    const logicTypes = ['sudoku', 'cuadrado_magico'];
    const isLogic = logicTypes.includes(type);
    const heavyTypes = ['multiplica_compleja', 'division', 'division_2dg'];
    const isHeavy = heavyTypes.includes(type);
    const isChained = type === 'encadenados';

    return difficultyOrder.map(diff => {
        const cfg = config[diff.key];
        if (!cfg) return null;
        const operations = cfg.operations || 0;

        if (isLogic) {
            const basePoints = LOGIC_POINTS[diff.key];
            return `${diff.label}: ${basePoints} XP si resuelves el puzzle completo (${operations} elemento).`;
        } else if (isHeavy) {
            const basePoints = MULT_DIV_POINTS[diff.key];
            return `${diff.label}: ${basePoints} XP por cada operación correcta (${operations} operaciones).`;
        } else if (isChained) {
            const basePoints = CHAIN_POINTS[diff.key];
            return `${diff.label}: ${basePoints} XP por cada resultado final correcto (${operations} cadenas).`;
        } else {
            const basePoints = POINTS_CONFIG[diff.key];
            if (type === 'multiplicacion') {
                return `${diff.label}: ${basePoints} XP solo si aciertas todas (${operations} ejercicios).`;
            }

            return `${diff.label}: ${basePoints} XP por cada operación correcta (${operations} operaciones).`;
        }
    }).filter(Boolean);
}

// Random integer in [min, max]
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Check if a grid matches magic sum in rows, columns and diagonals
function isMagicGrid(grid, target) {
    const size = grid.length;
    const rowsOk = grid.every(row => row.reduce((a, b) => a + b, 0) === target);
    const colsOk = [...Array(size).keys()].every(col =>
        grid.reduce((acc, row) => acc + row[col], 0) === target
    );
    const diag1 = grid.reduce((acc, row, idx) => acc + row[idx], 0);
    const diag2 = grid.reduce((acc, row, idx) => acc + row[size - 1 - idx], 0);
    return rowsOk && colsOk && diag1 === target && diag2 === target;
}

// Generate Operations Based on Difficulty
function generateOperations() {
    const config = DIFFICULTY_CONFIG[gameState.game.type][gameState.game.difficulty];
    gameState.game.operations = [];

    // Generate multiple operations based on difficulty
    for (let op = 0; op < config.operations; op++) {
        if (gameState.game.type === 'suma') {
            const digits = Math.floor(Math.random() * (config.maxDigits - config.minDigits + 1)) + config.minDigits;
            const numbers = [];
            for (let i = 0; i < config.count; i++) {
                numbers.push(randomNumber(digits));
            }
            const result = numbers.reduce((sum, num) => sum + num, 0);
            gameState.game.operations.push({ numbers, result, type: 'suma' });
        } else if (gameState.game.type === 'multiplicacion') {
            // Multiplicacion: X x Y (2-9)
            const num1 = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
            const num2 = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
            const result = num1 * num2;
            gameState.game.operations.push({ numbers: [num1, num2], result, type: 'multiplicacion' });
        } else if (gameState.game.type === 'multiplica_compleja') {
            // Multiplica Compleja
            let num1, num2;

            if (gameState.game.difficulty === 'facil') {
                const digits1 = Math.floor(Math.random() * (config.factor1Digits.max - config.factor1Digits.min + 1)) + config.factor1Digits.min;
                num1 = randomNumber(digits1);
                num2 = randomNumber(config.factor2Digits);
            } else {
                num1 = randomNumber(config.factor1Digits);
                num2 = randomNumber(config.factor2Digits);
            }

            const result = num1 * num2;
            gameState.game.operations.push({ numbers: [num1, num2], result, type: 'multiplica_compleja' });
        } else if (gameState.game.type === 'division') {
            // Division: Dividend / Divisor
            const dividendDigits = config.dividendDigits;
            const divisor = config.divisorDigits === 1
                ? Math.floor(Math.random() * 8) + 2 // 2-9
                : randomInRange(Math.pow(10, config.divisorDigits - 1), Math.pow(10, config.divisorDigits) - 1);
            const dividend = randomNumber(dividendDigits);

            const quotient = Math.floor(dividend / divisor);

            // Calculate intermediate steps for the division process
            const dividendStr = String(dividend);
            const intermediateSteps = [];
            let currentVal = 0;

            for (let i = 0; i < dividendStr.length; i++) {
                currentVal = currentVal * 10 + parseInt(dividendStr[i]);
                const digitQuotient = Math.floor(currentVal / divisor);
                const remainder = currentVal % divisor;

                // Store both the partial quotient and remainder for this step
                intermediateSteps.push({
                    partialValue: currentVal,
                    quotientDigit: digitQuotient,
                    remainder: remainder
                });

                currentVal = remainder;
            }

            gameState.game.operations.push({
                numbers: [dividend, divisor],
                result: quotient,
                intermediateSteps: intermediateSteps,
                type: 'division'
            });
        } else if (gameState.game.type === 'division_2dg') {
            // Division 2 dígitos: mismo flujo que Divide pero con divisor 2 dígitos
            const dividendDigits = config.dividendDigits;
            const divisor = randomInRange(config.divisorMin, config.divisorMax);
            const dividend = randomNumber(dividendDigits);
            const quotient = Math.floor(dividend / divisor);

            const dividendStr = String(dividend);
            const intermediateSteps = [];
            let currentVal = 0;

            for (let i = 0; i < dividendStr.length; i++) {
                currentVal = currentVal * 10 + parseInt(dividendStr[i]);
                const digitQuotient = Math.floor(currentVal / divisor);
                const remainder = currentVal % divisor;

                intermediateSteps.push({
                    partialValue: currentVal,
                    quotientDigit: digitQuotient,
                    remainder: remainder
                });

                currentVal = remainder;
            }

            gameState.game.operations.push({
                numbers: [dividend, divisor],
                result: quotient,
                intermediateSteps: intermediateSteps,
                type: 'division_2dg'
            });
        } else if (gameState.game.type === 'encadenados') {
            // Números encadenados: generar cadena de operaciones sobre un número inicial
            const startNumber = randomNumber(config.initialDigits);
            const stepsCount = randomInRange(config.stepsMin, config.stepsMax);
            const steps = [];
            let current = startNumber;

            for (let i = 0; i < stepsCount; i++) {
                const op = config.ops[Math.floor(Math.random() * config.ops.length)];
                let value = randomInRange(1, 9);
                let candidate = current;

                if (op === '+') {
                    candidate = current + value;
                } else if (op === '-') {
                    candidate = current - value;
                    if (candidate < 0) {
                        value = 0;       // v26: evitar negativos, usa 0 como segundo número
                        candidate = current;
                    }
                } else if (op === '×') {
                    value = randomInRange(2, 9);
                    candidate = current * value;
                } else if (op === '÷') {
                    value = randomInRange(2, 9);
                    let attempts = 0;
                    while (attempts < 10 && current % value !== 0) {
                        value = randomInRange(2, 9);
                        attempts++;
                    }

                    if (current % value === 0) {
                        candidate = current / value;
                    } else {
                        // Si no se puede dividir exacto, usar una suma para mantener entero
                        value = randomInRange(1, 9);
                        candidate = current + value;
                        steps.push({ op: '+', value });
                        current = candidate;
                        continue;
                    }
                }

                current = candidate;

                steps.push({ op, value });
            }

            gameState.game.operations.push({
                type: 'encadenados',
                startNumber,
                steps,
                result: current
            });
        } else if (gameState.game.type === 'sudoku') {
            const puzzle = generateSudokuPuzzle(gameState.game.difficulty);
            gameState.game.operations.push({ type: 'sudoku', puzzle });
        } else if (gameState.game.type === 'cuadrado_magico') {
            const puzzle = generateMagicSquarePuzzle(gameState.game.difficulty);
            gameState.game.operations.push({ type: 'cuadrado_magico', puzzle });
        } else {
            // Resta - ensure positive result
            const digits = Math.floor(Math.random() * (config.maxDigits - config.minDigits + 1)) + config.minDigits;
            const num1 = randomNumber(digits);
            const num2 = randomNumber(Math.min(digits, String(num1).length));
            const larger = Math.max(num1, num2);
            const smaller = Math.min(num1, num2);
            const result = larger - smaller;
            gameState.game.operations.push({ numbers: [larger, smaller], result, type: 'resta' });
        }
    }

    // Ensure uniqueness for Tablas Multiplicar
    if (gameState.game.type === 'multiplicacion') {
        const uniqueOps = new Set();
        const finalOps = [];

        // Try to generate unique operations
        let attempts = 0;
        while (finalOps.length < config.operations && attempts < 100) {
            const num1 = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
            const num2 = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
            const key = `${num1}x${num2}`;

            if (!uniqueOps.has(key)) {
                uniqueOps.add(key);
                finalOps.push({ numbers: [num1, num2], result: num1 * num2, type: 'multiplicacion' });
            }
            attempts++;
        }
        gameState.game.operations = finalOps;
    }

    // Initialize user answers array
    gameState.game.userAnswers = new Array(config.operations).fill(null);
}

// Render Game Screen
function renderGameScreen() {
    // Render player info
    const playerInfo = document.getElementById('player-info');
    let typeLabel = '';
    if (gameState.game.type === 'suma') typeLabel = 'Suma';
    else if (gameState.game.type === 'resta') typeLabel = 'Resta';
    else if (gameState.game.type === 'multiplica_compleja') typeLabel = 'Multiplica';
    else if (gameState.game.type === 'division') typeLabel = 'Divide';
    else if (gameState.game.type === 'division_2dg') typeLabel = 'Divide 2dg';
    else if (gameState.game.type === 'sudoku') typeLabel = 'Sudoku lógico';
    else if (gameState.game.type === 'cuadrado_magico') typeLabel = 'Cuadrado mágico';
    else if (gameState.game.type === 'encadenados') typeLabel = 'Números encadenados';
    else typeLabel = 'Tablas multiplicar';

    const diffLabel = gameState.game.difficulty.charAt(0).toUpperCase() + gameState.game.difficulty.slice(1);

    playerInfo.innerHTML = `
        <img src="${gameState.player.avatar}" alt="${gameState.player.avatarName}" class="player-avatar">
        <div class="player-details">
            <div class="player-code">${gameState.player.code}</div>
            <div class="game-info">${typeLabel} - ${diffLabel}</div>
        </div>
    `;

    // Render all operations
    const operationContainer = document.getElementById('operation-container');
    operationContainer.innerHTML = '';

    gameState.game.operations.forEach((operation, index) => {
        const opDiv = document.createElement('div');
        opDiv.className = 'operation-wrapper';
        opDiv.innerHTML = `
            <div class="operation-number">Operación ${index + 1}</div>
            <div class="operation-content" data-op-index="${index}">
                ${renderOperation(operation, index)}
            </div>
        `;
        operationContainer.appendChild(opDiv);
    });

    // Attach "Solucionar" buttons for cuadrado mágico
    document.querySelectorAll('[data-action="solve-magic"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const opIndex = parseInt(btn.dataset.opIndex, 10);
            solveMagicSquare(opIndex, btn);
        });
    });

    // Attach "Solucionar" buttons for sudoku
    document.querySelectorAll('[data-action="solve-sudoku"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const opIndex = parseInt(btn.dataset.opIndex, 10);
            solveSudoku(opIndex, btn);
        });
    });
}

// Render Operation Grid
function renderOperation(operation, opIndex) {
    let html = '';

    if (operation.type === 'multiplicacion') {
        // Horizontal layout for multiplication: X x Y = [ ][ ]
        html += '<div class="operation-row multiplication-row">';
        html += `<div class="digit-box-flat">${operation.numbers[0]}</div>`;
        html += `<div class="operation-symbol-flat">x</div>`;
        html += `<div class="digit-box-flat">${operation.numbers[1]}</div>`;
        html += `<div class="operation-symbol-flat">=</div>`;

        // Always 2 input boxes for multiplication results (up to 81)
        for (let i = 0; i < 2; i++) {
            html += `<input type="text" class="digit-input" maxlength="1" data-position="${i}" data-op-index="${opIndex}" pattern="[0-9]" inputmode="numeric">`;
        }
        html += '</div>';
        html += '</div>';
    } else if (operation.type === 'multiplica_compleja') {
        // Complex Multiplication Layout
        const num1Str = String(operation.numbers[0]);
        const num2Str = String(operation.numbers[1]);
        const resultStr = String(operation.result);

        // Calculate max width needed (usually result length)
        const maxDigits = Math.max(num1Str.length, num2Str.length + 1, resultStr.length); // +1 for 'x' symbol space if needed, though we usually put symbol on left

        // Render Factor 1
        html += '<div class="operation-row right-align">';
        html += '<div class="operation-symbol"></div>'; // Empty space for symbol column
        for (let i = 0; i < maxDigits - num1Str.length; i++) html += '<div class="digit-box-empty"></div>';
        for (let digit of num1Str) html += `<div class="digit-box">${digit}</div>`;
        html += '</div>';

        // Render Factor 2
        html += '<div class="operation-row right-align">';
        html += '<div class="operation-symbol">x</div>';
        for (let i = 0; i < maxDigits - num2Str.length; i++) html += '<div class="digit-box-empty"></div>';
        for (let digit of num2Str) html += `<div class="digit-box">${digit}</div>`;
        html += '</div>';

        // Separator
        html += '<div class="operation-row right-align">';
        html += '<div class="operation-symbol"></div>';
        html += `<div class="separator-line" style="width: ${maxDigits * 49}px;"></div>`;
        html += '</div>';

        // Partial Products
        // Iterate digits of factor 2 from right to left
        for (let i = 0; i < num2Str.length; i++) {
            const digit2 = parseInt(num2Str[num2Str.length - 1 - i]);
            const partialProduct = operation.numbers[0] * digit2;
            const partialStr = String(partialProduct);

            // Indentation (dots)
            const indentation = i;

            html += '<div class="operation-row right-align">';
            html += '<div class="operation-symbol"></div>';

            // Calculate padding to align correctly
            // Total slots = maxDigits
            // Occupied by digits = partialStr.length
            // Occupied by dots = indentation
            // Empty slots on left = maxDigits - partialStr.length - indentation

            for (let j = 0; j < maxDigits - partialStr.length - indentation; j++) {
                html += '<div class="digit-box-empty"></div>';
            }

            // Input boxes for the partial product
            for (let j = 0; j < partialStr.length; j++) {
                // data-partial-row indicates which partial product row this is
                html += `<input type="text" class="digit-input" maxlength="1" data-op-index="${opIndex}" data-partial-row="${i}" data-position="${j}" pattern="[0-9]" inputmode="numeric">`;
            }

            // Dots for indentation
            for (let j = 0; j < indentation; j++) {
                html += `<div class="digit-box dot">.</div>`;
            }

            html += '</div>';
        }

        // Final Result (only if more than 1 partial product)
        if (num2Str.length > 1) {
            // Separator
            html += '<div class="operation-row right-align">';
            html += '<div class="operation-symbol"></div>';
            html += `<div class="separator-line" style="width: ${maxDigits * 49}px;"></div>`;
            html += '</div>';

            // Result Input
            html += '<div class="operation-row right-align">';
            html += '<div class="operation-symbol">+</div>';

            for (let j = 0; j < maxDigits - resultStr.length; j++) {
                html += '<div class="digit-box-empty"></div>';
            }

            for (let j = 0; j < resultStr.length; j++) {
                html += `<input type="text" class="digit-input" maxlength="1" data-op-index="${opIndex}" data-final-result="true" data-position="${j}" pattern="[0-9]" inputmode="numeric">`;
            }
            html += '</div>';
        }

    } else if (operation.type === 'division' || operation.type === 'division_2dg') {
        // Division Layout: v7 specification (Columns)
        // Left Column: Dividend + Matrix
        // Right Column: Divisor + Quotient

        const dividendStr = String(operation.numbers[0]);
        const divisorStr = String(operation.numbers[1]);
        const quotientStr = String(operation.result);

        // Matrix dimensions: (2 × dividendDigits) rows × dividendDigits columns
        const matrixRows = 2 * dividendStr.length;
        const matrixCols = dividendStr.length;

        // Container for the entire division layout (using columns for alignment)
        html += '<div class="division-container-columns">';

        // Left Column: Dividend and Matrix
        html += '<div class="division-left-col">';

        // Dividend
        html += '<div class="division-dividend">';
        for (let digit of dividendStr) {
            html += `<div class="digit-box">${digit}</div>`;
        }
        html += '</div>';

        // Matrix
        html += '<div class="division-matrix">';
        for (let row = 0; row < matrixRows; row++) {
            html += '<div class="matrix-row">';
            for (let col = 0; col < matrixCols; col++) {
                html += `<input type="text" class="digit-input matrix-input" maxlength="1" data-op-index="${opIndex}" data-type="matrix" data-row="${row}" data-col="${col}" pattern="[0-9]" inputmode="numeric">`;
            }
            html += '</div>';
        }
        html += '</div>';

        html += '</div>'; // End left column

        // Right Column: Divisor and Quotient
        html += '<div class="division-right-col">';

        // Divisor
        html += '<div class="division-divisor">';
        for (let digit of divisorStr) {
            html += `<div class="digit-box">${digit}</div>`;
        }
        html += '</div>';

        // Quotient
        html += '<div class="division-quotient">';
        for (let i = 0; i < quotientStr.length; i++) {
            html += `<input type="text" class="digit-input" maxlength="1" data-op-index="${opIndex}" data-type="quotient" data-position="${i}" pattern="[0-9]" inputmode="numeric">`;
        }
        html += '</div>';

        html += '</div>'; // End right column

        html += '</div>'; // End division container columns

    } else if (operation.type === 'sudoku') {
        const { prefilled, solution } = operation.puzzle;
        const size = solution.length;

        html += '<div class="logic-section">';
        html += `<div class="logic-header">
            <div class="logic-title">Rellena sin repetir números en fila ni columna</div>
            <button class="btn-solve" type="button" data-action="solve-sudoku" data-op-index="${opIndex}">Solucionar</button>
        </div>`;
        html += `<div class="logic-grid" style="grid-template-columns: repeat(${size}, 50px);">`;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const value = prefilled[r][c];
                if (value !== null && value !== undefined) {
                    html += `<div class="logic-cell prefilled">${value}</div>`;
                } else {
                    html += `<div class="logic-cell"><input type="text" class="digit-input logic-input" maxlength="2" data-op-index="${opIndex}" data-type="logic" data-row="${r}" data-col="${c}" pattern="[0-9]+" inputmode="numeric"></div>`;
                }
            }
        }
        html += '</div>'; // logic-grid
        html += '</div>';

    } else if (operation.type === 'cuadrado_magico') {
        const { prefilled, magicSum, solution } = operation.puzzle;
        const size = solution.length;

        html += '<div class="logic-section">';
        html += `<div class="logic-header">
            <div class="logic-title">Suma mágica objetivo: ${magicSum}</div>
            <button class="btn-solve" type="button" data-action="solve-magic" data-op-index="${opIndex}">Solucionar</button>
        </div>`;
        html += `<div class="logic-grid" style="grid-template-columns: repeat(${size}, 50px);">`;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const value = prefilled[r][c];
                if (value !== null && value !== undefined) {
                    html += `<div class="logic-cell prefilled">${value}</div>`;
                } else {
                    html += `<div class="logic-cell"><input type="text" class="digit-input logic-input" maxlength="2" data-op-index="${opIndex}" data-type="logic" data-row="${r}" data-col="${c}" pattern="[0-9]+" inputmode="numeric"></div>`;
                }
            }
        }
        html += '</div>';
        html += '</div>';

    } else if (operation.type === 'encadenados') {
        html += '<div class="chain-container">';
        html += '<div class="chain-header">Aplica la cadena de operaciones y escribe el resultado final</div>';
        html += '<div class="chain-row">';

        const expression = buildChainedTokens(operation.startNumber, operation.steps).join(' ');
        html += `<div class="chain-expression-layer" aria-label="Enunciado encadenado">${expression}</div>`;

        html += `<div class="chain-symbol">=</div>`;
        html += `<input type="text" class="digit-input chain-result" maxlength="8" data-op-index="${opIndex}" pattern="[0-9]+" inputmode="numeric">`;

        html += '</div>';
        html += '</div>';

    } else {
        // Vertical layout for Suma/Resta
        const maxDigits = Math.max(...operation.numbers.map(n => String(n).length), String(operation.result).length);

        // Render each number
        operation.numbers.forEach((num, index) => {
            const numStr = String(num).padStart(maxDigits, ' ');
            const symbol = index === 0 ? ' ' : (operation.type === 'suma' ? '+' : '−');

            html += '<div class="operation-row">';
            html += `<div class="operation-symbol">${symbol}</div>`;

            for (let digit of numStr) {
                html += `<div class="digit-box">${digit === ' ' ? '' : digit}</div>`;
            }

            html += '</div>';
        });

        // Separator line
        html += '<div class="operation-row">';
        html += '<div class="operation-symbol"></div>';
        html += `<div class="separator-line" style="width: ${maxDigits * 49}px;"></div>`;
        html += '</div>';

        // Result input row
        html += '<div class="operation-row">';
        html += '<div class="operation-symbol"></div>';

        for (let i = 0; i < maxDigits; i++) {
            html += `<input type="text" class="digit-input" maxlength="1" data-position="${i}" data-op-index="${opIndex}" pattern="[0-9]" inputmode="numeric">`;
        }

        html += '</div>';
    }

    // Add keyboard navigation after inputs are rendered
    setTimeout(() => {
        const inputs = document.querySelectorAll(`.digit-input[data-op-index="${opIndex}"]`);
        inputs.forEach((input, index) => {
            // Only allow numbers
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');

                if (operation.type === 'multiplicacion') {
                    // v3: Multiplication uses Left-to-Right navigation (first box then second)
                    if (e.target.value.length > 0 && index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                } else if (operation.type === 'multiplica_compleja') {
                    // Multiplica Compleja uses Right-to-Left navigation within the same row
                    // We need to identify inputs in the same row
                    const currentInputs = Array.from(inputs).filter(inp => {
                        if (e.target.dataset.partialRow !== undefined) {
                            return inp.dataset.partialRow === e.target.dataset.partialRow;
                        } else {
                            return inp.dataset.finalResult === 'true';
                        }
                    });

                    const currentIndex = currentInputs.indexOf(e.target);

                    if (e.target.value.length > 0 && currentIndex > 0) {
                        currentInputs[currentIndex - 1].focus();
                    }
                } else if (operation.type === 'division' || operation.type === 'division_2dg') {
                    // Division navigation
                    if (e.target.dataset.type === 'quotient') {
                        // Quotient: Left-to-Right navigation
                        const quotientInputs = Array.from(inputs).filter(inp => inp.dataset.type === 'quotient');
                        const currentIndex = quotientInputs.indexOf(e.target);
                        if (e.target.value.length > 0 && currentIndex < quotientInputs.length - 1) {
                            quotientInputs[currentIndex + 1].focus();
                        }
                    } else if (e.target.dataset.type === 'matrix') {
                        // Matrix: Left-to-Right, then down
                        const matrixInputs = Array.from(inputs).filter(inp => inp.dataset.type === 'matrix');
                        const currentIndex = matrixInputs.indexOf(e.target);
                        if (e.target.value.length > 0 && currentIndex < matrixInputs.length - 1) {
                            matrixInputs[currentIndex + 1].focus();
                        }
                    }
                } else if (operation.type === 'sudoku' || operation.type === 'cuadrado_magico') {
                    // Logic games: simple left-to-right navigation
                    if (e.target.value.length > 0 && index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                } else if (operation.type === 'encadenados') {
                    // Solo un input principal; no navegación automática
                } else {
                    // v4: Suma/Resta uses Right-to-Left navigation (units first)
                    if (e.target.value.length > 0 && index > 0) {
                        inputs[index - 1].focus();
                    }
                }
            });

            // Arrow key navigation
            input.addEventListener('keydown', (e) => {
                if ((operation.type === 'division' || operation.type === 'division_2dg') && e.target.dataset.type === 'matrix') {
                    // Matrix navigation: arrows move in 2D grid
                    const matrixInputs = Array.from(inputs).filter(inp => inp.dataset.type === 'matrix');
                    const currentRow = parseInt(e.target.dataset.row);
                    const currentCol = parseInt(e.target.dataset.col);
                    const dividendStr = String(operation.numbers[0]);
                    const matrixCols = dividendStr.length;

                    if (e.key === 'ArrowLeft' && currentCol > 0) {
                        e.preventDefault();
                        const targetInput = matrixInputs.find(inp =>
                            parseInt(inp.dataset.row) === currentRow &&
                            parseInt(inp.dataset.col) === currentCol - 1
                        );
                        if (targetInput) targetInput.focus();
                    } else if (e.key === 'ArrowRight' && currentCol < matrixCols - 1) {
                        e.preventDefault();
                        const targetInput = matrixInputs.find(inp =>
                            parseInt(inp.dataset.row) === currentRow &&
                            parseInt(inp.dataset.col) === currentCol + 1
                        );
                        if (targetInput) targetInput.focus();
                    } else if (e.key === 'ArrowUp' && currentRow > 0) {
                        e.preventDefault();
                        const targetInput = matrixInputs.find(inp =>
                            parseInt(inp.dataset.row) === currentRow - 1 &&
                            parseInt(inp.dataset.col) === currentCol
                        );
                        if (targetInput) targetInput.focus();
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        const targetInput = matrixInputs.find(inp =>
                            parseInt(inp.dataset.row) === currentRow + 1 &&
                            parseInt(inp.dataset.col) === currentCol
                        );
                        if (targetInput) targetInput.focus();
                    }
                } else {
                    // Standard left/right navigation for other types
                    if (e.key === 'ArrowLeft' && index > 0) {
                        e.preventDefault();
                        inputs[index - 1].focus();
                    } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                        e.preventDefault();
                        inputs[index + 1].focus();
                    }
                }
            });
        });
    }, 0);

    return html;
}

// Timer Functions
function startTimer() {
    gameState.game.startTime = Date.now();
    updateTimerDisplay();

    gameState.timer = setInterval(() => {
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const elapsed = Math.floor((Date.now() - gameState.game.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    document.getElementById('timer-value').textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function stopTimer() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
    gameState.game.endTime = Date.now();
}

// Finish Game
function finishGame() {
    stopTimer();

    // Get user answers for all operations
    const results = [];
    let totalCorrect = 0;

    gameState.game.operations.forEach((operation, opIndex) => {
        let isCorrect = false;
        let userAnswer = '';
        let correctAnswer = operation.result;

        if (gameState.game.type === 'multiplica_compleja') {
            // Validate complex multiplication
            let allPartsCorrect = true;
            const num1 = operation.numbers[0];
            const num2Str = String(operation.numbers[1]);

            // Validate partial products
            for (let i = 0; i < num2Str.length; i++) {
                const digit2 = parseInt(num2Str[num2Str.length - 1 - i]);
                const expectedPartial = num1 * digit2;

                const inputs = document.querySelectorAll(`.digit-input[data-op-index="${opIndex}"][data-partial-row="${i}"]`);
                let partialUserAnswer = '';
                inputs.forEach(input => partialUserAnswer += input.value || '0');

                if (parseInt(partialUserAnswer) !== expectedPartial) {
                    allPartsCorrect = false;
                }
            }

            // Validate final result if it exists (more than 1 partial product)
            if (num2Str.length > 1) {
                const inputs = document.querySelectorAll(`.digit-input[data-op-index="${opIndex}"][data-final-result="true"]`);
                let finalUserAnswer = '';
                inputs.forEach(input => finalUserAnswer += input.value || '0');
                userAnswer = parseInt(finalUserAnswer); // For display

                if (userAnswer !== operation.result) {
                    allPartsCorrect = false;
                }
            } else {
                // If only 1 partial product, that IS the result (and we already validated it as partial row 0)
                // But we need to set userAnswer for display
                const inputs = document.querySelectorAll(`.digit-input[data-op-index="${opIndex}"][data-partial-row="0"]`);
                let finalUserAnswer = '';
                inputs.forEach(input => finalUserAnswer += input.value || '0');
                userAnswer = parseInt(finalUserAnswer);
            }

            isCorrect = allPartsCorrect;

        } else if (operation.type === 'sudoku') {
            const { solution, prefilled } = operation.puzzle;
            let allCorrect = true;
            const collected = [];
            const size = solution.length;

            for (let r = 0; r < size; r++) {
                const rowVals = [];
                for (let c = 0; c < solution[0].length; c++) {
                    const given = prefilled[r][c];
                    if (given !== null && given !== undefined) {
                        rowVals.push(given);
                        continue;
                    }
                    const input = document.querySelector(`.digit-input[data-op-index="${opIndex}"][data-row="${r}"][data-col="${c}"]`);
                    const val = parseInt(input?.value || '0');
                    rowVals.push(val);
                }
                collected.push(rowVals);
            }

            // Validación: no repetir en filas ni columnas, y todos completos
            for (let r = 0; r < size; r++) {
                const row = collected[r];
                if (row.includes(0) || new Set(row).size !== size) {
                    allCorrect = false;
                    break;
                }
            }
            if (allCorrect) {
                for (let c = 0; c < size; c++) {
                    const colVals = collected.map(row => row[c]);
                    if (colVals.includes(0) || new Set(colVals).size !== size) {
                        allCorrect = false;
                        break;
                    }
                }
            }

            userAnswer = collected;
            correctAnswer = solution;
            isCorrect = allCorrect;

        } else if (operation.type === 'cuadrado_magico') {
            const { solution, prefilled, magicSum } = operation.puzzle;
            let allCorrect = true;
            const collected = [];
            const size = solution.length;

            for (let r = 0; r < solution.length; r++) {
                const rowVals = [];
                for (let c = 0; c < solution[0].length; c++) {
                    const expected = solution[r][c];
                    const given = prefilled[r][c];
                    if (given !== null && given !== undefined) {
                        rowVals.push(given);
                        continue;
                    }
                    const input = document.querySelector(`.digit-input[data-op-index="${opIndex}"][data-row="${r}"][data-col="${c}"]`);
                    const val = parseInt(input?.value || '0');
                    rowVals.push(val);
                    if (val !== expected) {
                        allCorrect = false;
                    }
                }
                collected.push(rowVals);
            }

            // Extra safety: check sums if filled
            const sumOk = (grid) => {
                const rowsOk = grid.every(row => row.reduce((a, b) => a + b, 0) === magicSum);
                const colsOk = [...Array(size).keys()].every(col =>
                    grid.reduce((acc, row) => acc + row[col], 0) === magicSum
                );
                const diag1 = grid.reduce((acc, row, idx) => acc + row[idx], 0);
                const diag2 = grid.reduce((acc, row, idx) => acc + row[size - 1 - idx], 0);
                const diagsOk = diag1 === magicSum && diag2 === magicSum;
                return rowsOk && colsOk && diagsOk;
            };

            if (!sumOk(collected)) {
                allCorrect = false;
            }

            userAnswer = collected;
            correctAnswer = solution;
            isCorrect = allCorrect;

        } else if (gameState.game.type === 'division' || gameState.game.type === 'division_2dg') {
            // Validate Division (Quotient + Matrix)
            let allPartsCorrect = true;

            // Validate Quotient
            const quotientInputs = document.querySelectorAll(`.digit-input[data-op-index="${opIndex}"][data-type="quotient"]`);
            let userQuotientStr = '';
            quotientInputs.forEach(input => userQuotientStr += input.value || '');

            // If empty quotient, it's wrong
            if (userQuotientStr === '') {
                allPartsCorrect = false;
                userAnswer = 0;
            } else {
                userAnswer = parseInt(userQuotientStr);
                if (userAnswer !== operation.result) {
                    allPartsCorrect = false;
                }
            }

            // Validate Matrix (Check for correct Remainder)
            // Strategy: Find the last row with content and verify it matches the expected remainder
            const dividend = operation.numbers[0];
            const divisor = operation.numbers[1];
            const expectedRemainder = dividend % divisor;

            let matrixRemainder = null;
            const matrixRows = 2 * String(dividend).length; // Based on render logic

            // Scan rows from bottom to top to find the last entered number
            for (let row = matrixRows - 1; row >= 0; row--) {
                const rowInputs = document.querySelectorAll(`.digit-input[data-op-index="${opIndex}"][data-type="matrix"][data-row="${row}"]`);
                let rowContent = '';
                let hasContent = false;

                rowInputs.forEach(input => {
                    if (input.value) {
                        rowContent += input.value;
                        hasContent = true;
                    }
                });

                if (hasContent) {
                    // Found the last row with content
                    // Check if it's a number (ignore rows that might just have '-' if we had them, but inputs are numeric only)
                    if (!isNaN(parseInt(rowContent))) {
                        matrixRemainder = parseInt(rowContent);
                        break;
                    }
                }
            }

            // If no remainder found in matrix, or it doesn't match expected
            if (matrixRemainder === null || matrixRemainder !== expectedRemainder) {
                allPartsCorrect = false;
            }

            isCorrect = allPartsCorrect;

        } else if (operation.type === 'encadenados') {
            const input = document.querySelector(`.digit-input[data-op-index="${opIndex}"]`);
            const value = parseInt(input?.value || '', 10);
            userAnswer = isNaN(value) ? null : value;
            isCorrect = userAnswer === correctAnswer;

        } else {
            // Standard validation
            const inputs = document.querySelectorAll(`.digit-input[data-op-index="${opIndex}"]`);
            inputs.forEach(input => {
                userAnswer += input.value || '0';
            });
            userAnswer = parseInt(userAnswer);
            isCorrect = userAnswer === correctAnswer;
        }

        if (isCorrect) totalCorrect++;

        results.push({
            opNumber: opIndex + 1,
            isCorrect,
            correctAnswer,
            userAnswer,
            operation: operation // Pass the full operation object for detailed feedback
        });
    });

    // Calculate score
    const totalOps = gameState.game.operations.length;
    let points = 0;

    const specialMultiplyDivide = ['multiplica_compleja', 'division', 'division_2dg'];

    if (gameState.game.type === 'multiplicacion') {
        // v3: All or Nothing scoring for multiplication
        if (totalCorrect === totalOps) {
            points = POINTS_CONFIG[gameState.game.difficulty];
        }
    } else if (gameState.game.type === 'sudoku' || gameState.game.type === 'cuadrado_magico') {
        points = totalCorrect === totalOps ? LOGIC_POINTS[gameState.game.difficulty] : 0;
    } else if (gameState.game.type === 'encadenados') {
        points = totalCorrect * CHAIN_POINTS[gameState.game.difficulty];
    } else if (specialMultiplyDivide.includes(gameState.game.type)) {
        points = totalCorrect * MULT_DIV_POINTS[gameState.game.difficulty];
    } else {
        // Standard scoring for Suma/Resta (per correct answer)
        points = totalCorrect * POINTS_CONFIG[gameState.game.difficulty];
    }

    // Save to history
    saveToHistory(totalCorrect, totalOps, points);

    // Show results
    showResults(results, totalCorrect, totalOps, points);
}

// Show Results
function showResults(results, totalCorrect, totalOps, points) {
    const resultsSummary = document.getElementById('results-summary');
    const resultsFeedback = document.getElementById('results-feedback');

    const timeElapsed = Math.floor((gameState.game.endTime - gameState.game.startTime) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const percentage = Math.round((totalCorrect / totalOps) * 100);

    resultsSummary.innerHTML = `
        <h3>Puntos Obtenidos</h3>
        <div class="results-score">${points}</div>
        <p class="results-detail">Tiempo: ${timeStr}</p>
        <p class="results-detail">Aciertos: ${totalCorrect} / ${totalOps} (${percentage}%)</p>
    `;

    resultsFeedback.innerHTML = '';
    results.forEach(result => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `feedback-item ${result.isCorrect ? 'correct' : 'incorrect'}`;

        let feedbackText = '';
        let correctFormula = '';
        let userFormula = '';

        if (gameState.game.type === 'division' || gameState.game.type === 'division_2dg') {
            // Division Feedback: Dividend = Divisor * Quotient + Remainder
            const dividend = result.operation.numbers[0];
            const divisor = result.operation.numbers[1];
            const correctQuotient = result.correctAnswer;
            const correctRemainder = dividend % divisor;

            correctFormula = `${dividend} = ${divisor} * ${correctQuotient} + ${correctRemainder}`;

            if (!result.isCorrect) {
                const userQuotient = parseInt(result.userAnswer) || 0;
                const userRemainder = dividend - (divisor * userQuotient);
                userFormula = `${dividend} = ${divisor} * ${userQuotient} + ${userRemainder}`;
            }

        } else if (gameState.game.type === 'sudoku') {
            const prefilled = result.operation.puzzle.prefilled;
            correctFormula = renderMiniGrid(result.correctAnswer, prefilled);
            if (!result.isCorrect) {
                userFormula = renderMiniGrid(result.userAnswer, prefilled, result.correctAnswer);
            }

        } else if (gameState.game.type === 'cuadrado_magico') {
            const magicSum = result.operation.puzzle.magicSum;
            const prefilled = result.operation.puzzle.prefilled;
            correctFormula = `Objetivo: ${magicSum}${renderMiniGrid(result.correctAnswer, prefilled)}`;
            if (!result.isCorrect) {
                userFormula = `Objetivo: ${magicSum}${renderMiniGrid(result.userAnswer, prefilled, result.correctAnswer)}`;
            }

        } else if (gameState.game.type === 'encadenados') {
            const expression = buildChainedTokens(result.operation.startNumber, result.operation.steps).join(' ');
            correctFormula = `${expression} = ${result.correctAnswer}`;
            if (!result.isCorrect) {
                userFormula = `${expression} = ${result.userAnswer ?? ''}`;
            }

        } else if (gameState.game.type === 'suma') {
            // Suma Feedback: Num1 + Num2 + ... = Result
            const nums = result.operation.numbers.join(' + ');
            correctFormula = `${nums} = ${result.correctAnswer}`;
            if (!result.isCorrect) {
                userFormula = `${nums} = ${result.userAnswer}`;
            }

        } else if (gameState.game.type === 'resta') {
            // Resta Feedback: Num1 - Num2 = Result
            const nums = result.operation.numbers.join(' - ');
            correctFormula = `${nums} = ${result.correctAnswer}`;
            if (!result.isCorrect) {
                userFormula = `${nums} = ${result.userAnswer}`;
            }

        } else if (gameState.game.type === 'multiplicacion' || gameState.game.type === 'multiplica_compleja' || gameState.game.type === 'tablas') {
            // Multiplica/Tablas Feedback: Factor1 x Factor2 = Result
            const nums = result.operation.numbers.join(' x ');
            correctFormula = `${nums} = ${result.correctAnswer}`;
            if (!result.isCorrect) {
                userFormula = `${nums} = ${result.userAnswer}`;
            }
        }

        if (result.isCorrect) {
            feedbackText = (gameState.game.type === 'sudoku' || gameState.game.type === 'cuadrado_magico')
                ? `¡Correcto! Respuesta correcta: ${correctFormula}`
                : `¡Correcto! ${correctFormula}`;
        } else {
            feedbackText = (gameState.game.type === 'sudoku' || gameState.game.type === 'cuadrado_magico')
                ? `Respuesta correcta: ${correctFormula}<br>(Tu respuesta: ${userFormula || 'Sin completar'})`
                : `Respuesta correcta: ${correctFormula}<br>(Tu respuesta: ${userFormula})`;
        }

        // Formato específico para Números encadenados: mostrar enunciado = resultado
        if (gameState.game.type === 'encadenados') {
            const expression = buildChainedTokens(result.operation.startNumber, result.operation.steps).join(' ');
            const correctLine = `${expression} = ${result.correctAnswer}`;
            const userLine = `${expression} = ${result.userAnswer ?? ''}`;
            feedbackText = result.isCorrect
                ? correctLine
                : `Respuesta correcta: ${correctLine}<br>(Tu respuesta: ${userLine})`;
        }

        feedbackDiv.innerHTML = `
            <span class="feedback-icon">${result.isCorrect ? '✅' : '❌'}</span>
            <span class="feedback-text">
                <strong>Operación ${result.opNumber}:</strong> 
                ${feedbackText}
            </span>
        `;
        resultsFeedback.appendChild(feedbackDiv);
    });

    showScreen('results');
}

// Helper: render a small grid for logic results
function renderMiniGrid(grid, prefilled, reference) {
    if (!grid || grid.length === 0) return '';
    const cols = grid[0].length || 0;
    let html = `<div class="mini-grid" style="grid-template-columns: repeat(${cols}, 24px);">`;
    grid.forEach((row, rIdx) => {
        row.forEach((cell, cIdx) => {
            const given = prefilled && prefilled[rIdx] && prefilled[rIdx][cIdx] !== null && prefilled[rIdx][cIdx] !== undefined;
            const givenClass = given ? ' given' : '';
            const hasValue = cell !== null && cell !== undefined;
            const isWrong = reference && reference[rIdx] && reference[rIdx][cIdx] !== undefined && hasValue && cell !== reference[rIdx][cIdx];
            const wrongClass = isWrong ? ' wrong' : '';
            html += `<div class="mini-cell${givenClass}${wrongClass}">${cell ?? ''}</div>`;
        });
    });
    html += '</div>';
    return html;
}

// Helper: fill a magic square with the correct solution and disable finish
function solveMagicSquare(opIndex, buttonEl) {
    const operation = gameState.game.operations[opIndex];
    if (!operation || operation.type !== 'cuadrado_magico') return;

    const { solution } = operation.puzzle;
    const size = solution.length;

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const input = document.querySelector(`.digit-input[data-op-index="${opIndex}"][data-row="${r}"][data-col="${c}"]`);
            if (input) {
                input.value = solution[r][c];
                input.disabled = true;
            }
        }
    }

    const finishBtn = document.getElementById('btn-finish');
    if (finishBtn) finishBtn.disabled = true;
    if (buttonEl) buttonEl.disabled = true;

    // Detener el cronómetro al solucionar automáticamente
    stopTimer();
}

// Compute magic sum from first row (assuming valid grid)
function computeMagicSum(grid) {
    if (!grid || grid.length === 0) return 0;
    return grid[0].reduce((a, b) => a + b, 0);
}

// Helper: solve sudoku, fill solution, disable inputs and finish button, stop timer
function solveSudoku(opIndex, buttonEl) {
    const operation = gameState.game.operations[opIndex];
    if (!operation || operation.type !== 'sudoku') return;

    const { solution } = operation.puzzle;
    const size = solution.length;

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const input = document.querySelector(`.digit-input[data-op-index="${opIndex}"][data-row="${r}"][data-col="${c}"]`);
            if (input) {
                input.value = solution[r][c];
                input.disabled = true;
            }
        }
    }

    const finishBtn = document.getElementById('btn-finish');
    if (finishBtn) finishBtn.disabled = true;
    if (buttonEl) buttonEl.disabled = true;
    stopTimer();
}

// Save to History
function saveToHistory(totalCorrect, totalOps, points) {
    const history = JSON.parse(localStorage.getItem('mathGameHistory') || '[]');

    const timeElapsed = Math.floor((gameState.game.endTime - gameState.game.startTime) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // FIX v6: Calculate cumulative points for THIS USER only
    // Find the last game of this specific user to get their current total
    const userCode = gameState.player.code;
    const userGames = history.filter(game => game.userCode === userCode);
    const currentUserTotal = userGames.length > 0 ? (userGames[0].totalXP || userGames[0].points) : 0;
    const totalXP = currentUserTotal + points;

    const gameRecord = {
        id: Date.now(),
        date: new Date().toLocaleString('es-ES'),
        userCode: gameState.player.code,
        avatar: gameState.player.avatar,
        type: gameState.game.type === 'suma' ? 'Suma' :
            gameState.game.type === 'resta' ? 'Resta' :
                gameState.game.type === 'multiplica_compleja' ? 'Multiplica' :
                    gameState.game.type === 'division' ? 'Divide' :
                        gameState.game.type === 'division_2dg' ? 'Divide 2dg' :
                            gameState.game.type === 'encadenados' ? 'Números encadenados' :
                            gameState.game.type === 'sudoku' ? 'Sudoku lógico' :
                                gameState.game.type === 'cuadrado_magico' ? 'Cuadrado mágico' : 'Tablas',
        difficulty: gameState.game.difficulty.charAt(0).toUpperCase() + gameState.game.difficulty.slice(1),
        score: totalCorrect,
        total: totalOps,
        points: points,
        totalXP: totalXP,
        time: timeStr
    };

    history.unshift(gameRecord);
    localStorage.setItem('mathGameHistory', JSON.stringify(history));
}

// Load History
function loadHistory() {
    const historyList = document.getElementById('history-list');
    const history = JSON.parse(localStorage.getItem('mathGameHistory') || '[]');

    if (history.length === 0) {
        historyList.innerHTML = '<tr><td colspan="8" class="empty-history">No hay juegos guardados todavía. ¡Juega tu primer juego!</td></tr>';
        return;
    }

    historyList.innerHTML = '';

    history.forEach(game => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${game.date}</td>
            <td>${game.userCode}</td>
            <td>${game.type}</td>
            <td>${game.difficulty}</td>
            <td>${game.score} / ${game.total}</td>
            <td>${game.points} XP</td>
            <td><strong>${game.totalXP || game.points} XP</strong></td>
            <td>${game.time}</td>
        `;
        historyList.appendChild(row);
    });
}

// Load Leaderboard
function loadLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    const history = JSON.parse(localStorage.getItem('mathGameHistory') || '[]');

    if (history.length === 0) {
        leaderboardList.innerHTML = '<tr><td colspan="4" class="empty-history">No hay juegos todavía. ¡Sé el primero en jugar!</td></tr>';
        return;
    }

    // Get latest game for each user (history is already sorted by date descending)
    const userScores = new Map();
    history.forEach(game => {
        if (!userScores.has(game.userCode)) {
            userScores.set(game.userCode, game.totalXP || game.points);
        }
    });

    // Convert to array and sort by total XP descending
    const leaderboard = Array.from(userScores, ([userCode, totalXP]) => ({ userCode, totalXP }))
        .sort((a, b) => b.totalXP - a.totalXP);

    leaderboardList.innerHTML = '';

    leaderboard.forEach((user, index) => {
        const row = document.createElement('tr');
        const position = index + 1;
        let medal = '';
        if (position === 1) medal = '🥇';
        else if (position === 2) medal = '🥈';
        else if (position === 3) medal = '🥉';

        row.innerHTML = `
            <td><strong>${medal} ${position}</strong></td>
            <td><strong>${user.userCode}</strong></td>
            <td><strong>${user.totalXP} XP</strong></td>
            <td>
                <button class="btn-icon-delete" onclick="deleteUserHistory('${user.userCode}')" title="Borrar usuario">
                    🗑️
                </button>
            </td>
        `;

        // Highlight top 3
        if (position <= 3) {
            row.classList.add('top-rank');
        }

        leaderboardList.appendChild(row);
    });
}

// Delete User History
function deleteUserHistory(userCode) {
    if (confirm(`¿Estás seguro de que quieres borrar TODOS los datos del usuario ${userCode}?`)) {
        const history = JSON.parse(localStorage.getItem('mathGameHistory') || '[]');
        const newHistory = history.filter(game => game.userCode !== userCode);
        localStorage.setItem('mathGameHistory', JSON.stringify(newHistory));
        loadLeaderboard();

        // If we deleted the current user's data, we might want to reset setup if they are currently selected
        if (gameState.player.code === userCode) {
            resetGameSetup();
        }
    }
}


