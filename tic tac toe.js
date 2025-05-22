

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const statusText = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    const PLAYER_X = 'X';
    const PLAYER_O = 'O';
    let currentPlayer = PLAYER_X;
    let board = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        [1, 3, 4],
        [0, 1, 3],
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick, { once: true });
    });

    restartBtn.addEventListener('click', restartGame);

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = Array.from(cells).indexOf(cell);
        
        if (board[cellIndex] !== null) return;

        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            endGame(false);
        } else if (board.every(cell => cell !== null)) {
            endGame(true);
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            updateStatus();
        }
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === player;
            });
        });
    }

    function endGame(draw) {
        if (draw) {
            statusText.textContent = "It's a Draw!";
        } else {
            statusText.textContent = `${currentPlayer} Wins!`;
        }
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    }

    function updateStatus() {
        statusText.textContent = `${currentPlayer}'s turn`;
    }

    function restartGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.addEventListener('click', handleCellClick, { once: true });
        });
        currentPlayer = PLAYER_X;
        updateStatus();
    }

    updateStatus();
});
