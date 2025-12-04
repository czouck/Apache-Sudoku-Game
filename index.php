<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sudoku Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Top Banner -->
    <div class="banner">
        <img src="images/america.jpeg" alt="Banner Image" class="banner-img">
    </div>
    <h1>Sudoku</h1>
    
    <!-- Game Stats -->
    <div class="game-stats">
        <div id="timer-container" class="stat-box">
            ⏱️ Time: <span id="timer">00:00</span>
        </div>
        <div id="score-container" class="stat-box">
            🏆 Puzzles Solved: <span id="score">0</span>
        </div>
    </div>
    
    <!-- Sudoku Board -->
    <div id="sudoku-board">
        <table id="board">
            <!-- Populated by JS -->
        </table>
        <div class="buttons">
            <button onclick="checkBoard()">Check Solution</button>
            <button onclick="generateNewPuzzle()">Generate New Puzzle</button>
        </div>
    </div>
    
    <!-- Leaderboard Section -->
    <div class="leaderboard-container">
        <h2>🏆 Top 10 Fastest Times</h2>
        <div class="leaderboard-content">
            <ul id="leaderboard-list" class="leaderboard-list">
                <li class="no-records">No records yet. Be the first!</li>
            </ul>
        </div>
    </div>
    
    <!-- Name Input Modal -->
    <div id="name-modal" class="modal">
        <div class="modal-content">
            <h2>🎉 Congratulations!</h2>
            <p class="success-message">You solved the puzzle!</p>
            <p class="time-display">Your time: <strong id="final-time"></strong></p>
            <input type="text" id="player-name" placeholder="Enter your name" maxlength="30" autocomplete="off">
            <div class="modal-buttons">
                <button onclick="submitScore()" class="submit-btn">Submit Score</button>
                <button onclick="skipScore()" class="skip-btn">Skip</button>
            </div>
        </div>
    </div>
    
    <script src="sudoku.js"></script>
</body>
</html>
