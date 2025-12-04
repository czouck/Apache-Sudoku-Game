// Initial Sudoku board (0 = empty)
let sudokuBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

let puzzlesSolved = 0;
let timerInterval = null;
let startTime = null;
let currentTime = 0;
let leaderboard = [];

// ========== INITIALIZATION ==========

window.onload = function () {
    loadLeaderboard();
    generateBoard();
    startTimer();
    updateLeaderboardDisplay();
};

// ========== TIMER FUNCTIONS ==========

function startTimer() {
    startTime = Date.now() - currentTime;
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        currentTime = Date.now() - startTime;
        updateTimerDisplay();
    }, 100);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    currentTime = 0;
    updateTimerDisplay();
    startTimer();
}

function updateTimerDisplay() {
    let seconds = Math.floor(currentTime / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    document.getElementById('timer').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// ========== BOARD GENERATION ==========

function generateBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';

    for (let row = 0; row < 9; row++) {
        let rowElem = document.createElement('tr');

        for (let col = 0; col < 9; col++) {
            let cellElem = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;

            let value = sudokuBoard[row][col];
            input.value = value !== 0 ? value : '';
            input.disabled = value !== 0;

            input.id = `cell-${row}-${col}`;

            // Add keyboard navigation and input validation
            input.addEventListener('keydown', handleCellKeydown);
            input.addEventListener('input', validateInput);

            cellElem.appendChild(input);
            rowElem.appendChild(cellElem);
        }

        board.appendChild(rowElem);
    }
}

// Handle keyboard navigation
function handleCellKeydown(e) {
    const currentCell = e.target;
    const match = currentCell.id.match(/cell-(\d)-(\d)/);
    if (!match) return;
    
    let row = parseInt(match[1]);
    let col = parseInt(match[2]);
    
    switch(e.key) {
        case 'ArrowUp':
            if (row > 0) focusCell(row - 1, col);
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (row < 8) focusCell(row + 1, col);
            e.preventDefault();
            break;
        case 'ArrowLeft':
            if (col > 0) focusCell(row, col - 1);
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (col < 8) focusCell(row, col + 1);
            e.preventDefault();
            break;
    }
}

function focusCell(row, col) {
    const cell = document.getElementById(`cell-${row}-${col}`);
    if (cell && !cell.disabled) {
        cell.focus();
        cell.select();
    }
}

// Validate input to only allow 1-9
function validateInput(e) {
    const input = e.target;
    const value = input.value;
    
    if (value && (value < 1 || value > 9 || value.length > 1)) {
        input.value = '';
    }
}

// ========== VALIDATION FUNCTIONS ==========

function checkBoard() {
    let userBoard = [];
    let isComplete = true;
    let isValid = true;

    // Build current user board from input values
    for (let row = 0; row < 9; row++) {
        let rowArr = [];
        for (let col = 0; col < 9; col++) {
            let input = document.getElementById(`cell-${row}-${col}`);
            let value = parseInt(input.value) || 0;
            rowArr.push(value);
        }
        userBoard.push(rowArr);
    }

    // Reset all cell backgrounds
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.getElementById(`cell-${row}-${col}`).style.backgroundColor = '';
        }
    }

    // Check all cells for validity and completeness
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let value = userBoard[row][col];

            if (value === 0) {
                isComplete = false;
            } else if (!isValidMoveInBoard(userBoard, row, col, value)) {
                isValid = false;
                document.getElementById(`cell-${row}-${col}`).style.backgroundColor = '#ffcccc';
            }
        }
    }

    if (!isComplete) {
        alert("The board is not fully filled out.");
    } else if (!isValid) {
        alert("There are errors in your solution. Check the highlighted cells.");
    } else {
        stopTimer();
        showNameModal();
    }
}

function isValidMoveInBoard(board, row, col, value) {
    // Check row and column
    for (let i = 0; i < 9; i++) {
        if (i !== col && board[row][i] === value) return false;
        if (i !== row && board[i][col] === value) return false;
    }

    // Check 3x3 box
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;

    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if ((r !== row || c !== col) && board[r][c] === value) return false;
        }
    }

    return true;
}

// ========== MODAL & LEADERBOARD ==========

function showNameModal() {
    document.getElementById('final-time').textContent = formatTime(currentTime);
    document.getElementById('name-modal').style.display = 'block';
    document.getElementById('player-name').focus();
    
    // Allow Enter key to submit
    document.getElementById('player-name').onkeypress = function(e) {
        if (e.key === 'Enter') {
            submitScore();
        }
    };
}

function submitScore() {
    const nameInput = document.getElementById('player-name');
    const playerName = nameInput.value.trim();
    
    if (!playerName) {
        alert("Please enter your name!");
        nameInput.focus();
        return;
    }
    
    // Update score
    puzzlesSolved++;
    document.getElementById('score').textContent = puzzlesSolved;
    
    // Add to leaderboard
    leaderboard.push({
        name: playerName,
        time: currentTime,
        date: new Date().toISOString()
    });
    
    // Sort by time (fastest first) and keep top 10
    leaderboard.sort((a, b) => a.time - b.time);
    leaderboard = leaderboard.slice(0, 10);
    
    // Save to localStorage
    saveLeaderboard();
    
    // Close modal and update display
    closeModal();
    updateLeaderboardDisplay();
    
    // Show success message
    alert(`Great job, ${playerName}! Your time has been saved to the leaderboard.`);
}

function skipScore() {
    puzzlesSolved++;
    document.getElementById('score').textContent = puzzlesSolved;
    closeModal();
}

function closeModal() {
    document.getElementById('name-modal').style.display = 'none';
    document.getElementById('player-name').value = '';
}

function loadLeaderboard() {
    const saved = localStorage.getItem('sudokuLeaderboard');
    if (saved) {
        try {
            leaderboard = JSON.parse(saved);
        } catch (e) {
            leaderboard = [];
        }
    }
}

function saveLeaderboard() {
    localStorage.setItem('sudokuLeaderboard', JSON.stringify(leaderboard));
}

function updateLeaderboardDisplay() {
    const listElem = document.getElementById('leaderboard-list');
    listElem.innerHTML = '';
    
    if (leaderboard.length === 0) {
        listElem.innerHTML = '<li class="no-records">No records yet. Be the first!</li>';
        return;
    }
    
    leaderboard.forEach((entry, index) => {
        const li = document.createElement('li');
        li.className = 'leaderboard-item';
        
        // Add rank classes for top 3
        if (index === 0) li.classList.add('rank-1');
        else if (index === 1) li.classList.add('rank-2');
        else if (index === 2) li.classList.add('rank-3');
        
        const rank = index + 1;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
        
        li.innerHTML = `
            <span class="player-name">${medal} ${entry.name}</span>
            <span class="player-time">${formatTime(entry.time)}</span>
        `;
        
        listElem.appendChild(li);
    });
}

// ========== PUZZLE GENERATION ==========

function generateNewPuzzle() {
    // Generate a full valid board
    sudokuBoard = generateFullBoard();
    
    // Remove cells to create a puzzle
    removeCells(40); // 40 cells removed for medium difficulty
    
    // Regenerate the UI and reset timer
    generateBoard();
    resetTimer();
}

function generateFullBoard() {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));
    solveBoard(board);
    return board;
}

function solveBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                let numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for (let num of numbers) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveBoard(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isSafe(board, row, col, num) {
    // Check row and column
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }

    // Check 3x3 box
    let boxRow = Math.floor(row / 3) * 3;
    let boxCol = Math.floor(col / 3) * 3;

    for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
            if (board[r][c] === num) return false;
        }
    }

    return true;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function removeCells(count) {
    let removed = 0;
    while (removed < count) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        if (sudokuBoard[row][col] !== 0) {
            sudokuBoard[row][col] = 0;
            removed++;
        }
    }
}
