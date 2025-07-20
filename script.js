// Game state variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xWins = 0;
let oWins = 0;
let gameCombo = 0;

// Enhanced motivational messages
const motivationalMessages = [
    "⚡ ELECTRIC MOVE! ⚡",
    "🔥 BLAZING STRATEGY! 🔥",
    "💫 STELLAR PLAY! 💫",
    "🎯 PRECISION STRIKE! 🎯",
    "🌟 BRILLIANT TACTICS! 🌟",
    "💎 DIAMOND LEVEL! 💎",
    "🚀 ROCKET POWERED! 🚀",
    "⭐ SUPERSTAR MOVE! ⭐",
    "🏆 CHAMPION ENERGY! 🏆",
    "🎪 SHOWTIME PLAY! 🎪",
    "🌈 RAINBOW POWER! 🌈",
    "🎨 MASTERPIECE MOVE! 🎨"
];

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// DOM elements
const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const motivationalMessage = document.getElementById('motivationalMessage');
const xScoreEl = document.getElementById('xScore');
const oScoreEl = document.getElementById('oScore');
const comboCounterEl = document.getElementById('comboCounter');
const powerIndicatorEl = document.getElementById('powerIndicator');

// Initialize game
function initGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    createParticles();
    updatePowerIndicator();
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Update power indicator
function updatePowerIndicator() {
    const indicators = ['⚡', '🔥', '💫', '🌟', '💎', '🚀'];
    powerIndicatorEl.textContent = indicators[Math.floor(Math.random() * indicators.length)];
}

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update game board and cell
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    clickedCell.disabled = true;

    // Check for win or draw
    if (checkWin()) {
        handleWin();
    } else if (checkDraw()) {
        handleDraw();
    } else {
        switchPlayer();
        showMotivationalMessage();
    }

    updatePowerIndicator();
}

// Check for win
function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].classList.add('winning');
            cells[b].classList.add('winning');
            cells[c].classList.add('winning');
            return true;
        }
        return false;
    });
}

// Check for draw
function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

// Handle win
function handleWin() {
    gameActive = false;
    gameStatus.innerHTML = `🎉 Player <span class="current-player">${currentPlayer}</span> &nbsp; WINS! 🎉`;
    disableAllCells();

    // Update scores
    if (currentPlayer === 'X') {
        xWins++;
        xScoreEl.textContent = xWins;
    } else {
        oWins++;
        oScoreEl.textContent = oWins;
    }

    gameCombo++;
    comboCounterEl.textContent = gameCombo;

    showMotivationalMessage("🏆 VICTORY ROYALE! 🏆");
}

// Handle draw
function handleDraw() {
    gameActive = false;
    gameStatus.innerHTML = "🤝 EPIC DRAW! 🤝";
    disableAllCells();
    gameCombo++;
    comboCounterEl.textContent = gameCombo;
    showMotivationalMessage("⚖️ PERFECTLY BALANCED! ⚖️");
}

// Switch player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerHTML = `Player <span class="current-player">${currentPlayer}</span> &nbsp; turn`;
}

// Show motivational message 
function showMotivationalMessage(customMessage = null) {
    const message = customMessage || motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    motivationalMessage.textContent = message;
    motivationalMessage.classList.add('show');

    setTimeout(() => {
        motivationalMessage.classList.remove('show');
    }, 3000);
}

// Disable all cells
function disableAllCells() {
    cells.forEach(cell => {
        cell.disabled = true;
    });
}

// Reset game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    gameStatus.innerHTML = `Player <span class="current-player">X</span> turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('x', 'o', 'winning');
    });

    motivationalMessage.classList.remove('show');
    motivationalMessage.textContent = '';
    updatePowerIndicator();
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', initGame);
