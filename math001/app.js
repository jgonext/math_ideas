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
        media: { operations: 4, factor1Digits: 6, factor2Digits: 2 },
        dificil: { operations: 6, factor1Digits: 8, factor2Digits: 3 }
    }
};

const POINTS_CONFIG = {
    facil: 1,
    media: 2,
    dificil: 5
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
            showScreen('menu');
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

// Reset Game Setup
function resetGameSetup() {
    gameState.player = { code: '', avatar: '', avatarName: '' };
    gameState.game = { type: '', difficulty: '', startTime: null, endTime: null, operations: [], userAnswers: [] };

    document.getElementById('user-code').value = '';
    document.querySelectorAll('.avatar-option-compact').forEach(option => option.classList.remove('selected'));
    document.querySelectorAll('[data-game-type]').forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('[data-difficulty]').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('btn-start-game').disabled = true;

    // Load recent users
    loadRecentUsers();
}

// Load Recent Users
function loadRecentUsers() {
    const recentUsersContainer = document.getElementById('recent-users');
    const history = JSON.parse(localStorage.getItem('mathGameHistory') || '[]');

    if (history.length === 0) {
        recentUsersContainer.innerHTML = '';
        return;
    }

    // Get last 3 unique user codes
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
    generateOperations();
    renderGameScreen();
    startTimer();
    showScreen('game');
}

// Generate Random Number
function randomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
                } else {
                    // v4: Suma/Resta uses Right-to-Left navigation (units first)
                    if (e.target.value.length > 0 && index > 0) {
                        inputs[index - 1].focus();
                    }
                }
            });

            // Arrow key navigation
            input.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' && index > 0) {
                    e.preventDefault();
                    inputs[index - 1].focus();
                } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                    e.preventDefault();
                    inputs[index + 1].focus();
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
            userAnswer
        });
    });

    // Calculate score
    const totalOps = gameState.game.operations.length;
    let points = 0;

    if (gameState.game.type === 'multiplicacion') {
        // v3: All or Nothing scoring for multiplication
        if (totalCorrect === totalOps) {
            points = POINTS_CONFIG[gameState.game.difficulty];
        }
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
        feedbackDiv.innerHTML = `
            <span class="feedback-icon">${result.isCorrect ? '✅' : '❌'}</span>
            <span class="feedback-text">
                <strong>Operación ${result.opNumber}:</strong> 
                ${result.isCorrect ? '¡Correcto!' : `Respuesta correcta: ${result.correctAnswer} (Tu respuesta: ${result.userAnswer})`}
            </span>
        `;
        resultsFeedback.appendChild(feedbackDiv);
    });

    showScreen('results');
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
        type: gameState.game.type === 'suma' ? 'Suma' : 'Resta',
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


