const dots = document.querySelectorAll('.dot');
const restartBtn = document.querySelector('.restart-btn');
let currentPlayer = 1;
let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let aiMoves = [];

const checkWin = () => {
    for (let row = 0; row < 3; row++) {
        if (gameBoard[row][0] === currentPlayer && gameBoard[row][1] === currentPlayer && gameBoard[row][2] === currentPlayer) {
            return true;
        }
    }

    for (let col = 0; col < 3; col++) {
        if (gameBoard[0][col] === currentPlayer && gameBoard[1][col] === currentPlayer && gameBoard[2][col] === currentPlayer) {
            return true;
        }
    }

    if (gameBoard[0][0] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][2] === currentPlayer) {
        return true;
    }

    if (gameBoard[0][2] === currentPlayer && gameBoard[1][1] === currentPlayer && gameBoard[2][0] === currentPlayer) {
        return true;
    }

    return false;
};

const checkDraw = () => {
    let totalMoves = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (gameBoard[row][col]!== 0) {
                totalMoves++;
            }
        }
    }

    return totalMoves === 9? true : false;
};

const updateGameBoard = (row, col) => {
    if (gameBoard[row][col] === 0) {
        gameBoard[row][col] = currentPlayer;
        return true;
    }

    return false;
};

const togglePlayer = () => {
    currentPlayer = currentPlayer === 1? 2 : 1;
};

const enableDots = () => {
    dots.forEach(dot => {
        dot.removeAttribute('disabled');
    });
};

const disableDots = () => {
    dots.forEach(dot => {
        dot.setAttribute('disabled', true);
    });
};

const resetGame = () => {
    currentPlayer = 1;
    gameBoard = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    enableDots();
    dots.forEach(dot => {
        dot.classList.remove('selected');
    });
    aiMoves = [];
};

const checkGameStatus = () => {
    if (checkWin()) {
        setTimeout(() => {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
        }, 100);
    } else if (checkDraw()) {
        setTimeout(() => {
            alert('It\'s a draw!');
            resetGame();
        }, 100);
    } else {
        aiMove();
        togglePlayer();
    }
};

const aiMove = () => {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < aiMoves.length; i++) {
        let move = aiMoves[i];
        let row = move[0];
        let col = move[1];
        if (gameBoard[row][col] === 0) {
            gameBoard[row][col] = 2;
            let score = minimax(gameBoard, 0, false);
            gameBoard[row][col] = 0;
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }
    }
    let move = bestMove;
    let row = move[0];
    let col = move[1];
    gameBoard[row][col] = 2;
    updateBoard();
};

const minimax = (board, depth, isMaximizing) => {
    let scores = {
        1: -1,
        2: 1,
        3: 10
    };

    let currentPlayer = isMaximizing? 2 : 1;

    if (checkWin(board)) {
        return scores[currentPlayer];
    } else if (checkDraw(board)) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                    board[i][j] = currentPlayer;
let score = minimax(board, depth + 1, false);
                    board[i][j] = 0;
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === 0) {
                    board[i][j] = currentPlayer;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = 0;
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
};

const updateBoard = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === 1) {
                let dot = document.getElementById(`dot-${(i * 3) + j + 1}`);
                dot.classList.add('selected');
            } else if (gameBoard[i][j] === 2) {
                let dot = document.getElementById(`dot-${(i * 3) + j + 1}`);
                dot.classList.add('ai-selected');
            }
        }
    }
};

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        if (dot.hasAttribute('disabled')) {
            return;
        }
        const row = Array.from(dot.parentNode.children).indexOf(dot);
        const col = Array.from(dot.parentNode.parentElement.children).indexOf(dot.parentNode);
        if (updateGameBoard(row, col)) {
            dot.classList.add('selected');
            disableDots();
            aiMoves = getAvailableMoves();
            checkGameStatus();
        }
    });
});

restartBtn.addEventListener('click', resetGame);

function getAvailableMoves() {
    let moves = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] === 0) {
                moves.push([i, j]);
            }
        }
    }
    return moves;
}