

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    const boardSize = 5;
    let currentPlayer = 'Player 1';
    let playerScores = { 'Player 1': 0, 'Player 2': 0 };
    let lines = [];
    let boxes = [];

    function createBoard(size) {
        gameBoard.style.gridTemplateColumns = `repeat(${size * 2 - 1}, 30px)`;
        gameBoard.innerHTML = '';
        lines = Array.from({ length: size * 2 - 1 }, () => Array(size * 2 - 1).fill(null));
        boxes = Array.from({ length: size - 1 }, () => Array(size - 1).fill(null));
        
        for (let row = 0; row < size * 2 - 1; row++) {
            for (let col = 0; col < size * 2 - 1; col++) {
                if (row % 2 === 0 && col % 2 === 0) {
                    const dot = document.createElement('div');
                    dot.className = 'dot';
                    gameBoard.appendChild(dot);
                } else if (row % 2 === 0) {
                    const hLine = document.createElement('div');
                    hLine.className = 'horizontal-line';
                    hLine.addEventListener('click', () => makeMove(row, col, 'horizontal'));
                    gameBoard.appendChild(hLine);
                } else if (col % 2 === 0) {
                    const vLine = document.createElement('div');
                    vLine.className = 'vertical-line';
                    vLine.addEventListener('click', () => makeMove(row, col, 'vertical'));
                    gameBoard.appendChild(vLine);
                } else {
                    const box = document.createElement('div');
                    box.className = 'box';
                    gameBoard.appendChild(box);
                }
            }
        }
        updateStatus();
    }

    function makeMove(row, col, type) {
        if (lines[row][col]) return;
        
        lines[row][col] = currentPlayer;
        document.querySelector(`#gameBoard > div:nth-child(${row * (boardSize * 2 - 1) + col + 1})`).style.backgroundColor = '#000';

        let boxesCompleted = checkBoxes(row, col);
        if (!boxesCompleted) {
            currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
        }

        updateStatus();
        checkGameEnd();
    }

    function checkBoxes(row, col) {
        let completed = false;
        if (row % 2 === 0) {
            if (row > 0 && checkBox(row - 1, col)) completed = true;
            if (row < boardSize * 2 - 2 && checkBox(row + 1, col)) completed = true;
        } else {
            if (col > 0 && checkBox(row, col - 1)) completed = true;
            if (col < boardSize * 2 - 2 && checkBox(row, col + 1)) completed = true;
        }
        return completed;
    }

    function checkBox(row, col) {
        if (lines[row][col] && lines[row + 1][col] && lines[row][col + 1] && lines[row + 1][col + 1]) {
            document.querySelector(`#gameBoard > div:nth-child(${(row + 1) * (boardSize * 2 - 1) + col + 2})`).textContent = currentPlayer === 'Player 1' ? '1' : '2';
            playerScores[currentPlayer]++;
            return true;
        }
        return false;
    }

    function updateStatus() {
        status.textContent = `${currentPlayer}'s turn. Player 1: ${playerScores['Player 1']} - Player 2: ${playerScores['Player 2']}`;
    }

    function checkGameEnd() {
        if (playerScores['Player 1'] + playerScores['Player 2'] === (boardSize - 1) ** 2) {
            let winner = playerScores['Player 1'] > playerScores['Player 2'] ? 'Player 1' : 'Player 2';
            status.textContent = `Game Over! ${winner} wins. Player 1: ${playerScores['Player 1']} - Player 2: ${playerScores['Player 2']}`;
        }
    }

    restartBtn.addEventListener('click', () => {
        playerScores = { 'Player 1': 0, 'Player 2': 0 };
        currentPlayer = 'Player 1';
        createBoard(boardSize);
    });

    createBoard(boardSize);
});
