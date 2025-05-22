document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const restartBtn = document.getElementById('restartBtn');
    const game = new Chess();

    const board = Chessboard(chessboard, {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        onSnapEnd: onSnapEnd,
    });

    function onDragStart(source, piece, position, orientation) {
        if (game.in_checkmate() || game.in_draw() || piece.search(/^b/) !== -1) {
            return false;
        }
    }

    function onDrop(source, target) {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q'
        });

        if (move === null) return 'snapback';

        updateStatus();
    }

    function onMouseoverSquare(square, piece) {
        const moves = game.moves({
            square: square,
            verbose: true
        });

        if (moves.length === 0) return;

        greySquare(square);

        for (let i = 0; i < moves.length; i++) {
            greySquare(moves[i].to);
        }
    }

    function onMouseoutSquare(square, piece) {
        removeGreySquares();
    }

    function onSnapEnd() {
        board.position(game.fen());
    }

    function greySquare(square) {
        const squareEl = document.querySelector(`.square-${square}`);

        if (squareEl) {
            squareEl.style.background = 'rgba(0, 0, 0, 0.1)';
        }
    }

    function removeGreySquares() {
        document.querySelectorAll('#chessboard .square-55d63').forEach(square => {
            square.style.background = '';
        });
    }

    function updateStatus() {
        let status = '';

        const moveColor = game.turn() === 'b' ? 'Black' : 'White';

        if (game.in_checkmate()) {
            status = `Game over, ${moveColor} is in checkmate.`;
        } else if (game.in_draw()) {
            status = 'Game over, draw.';
        } else {
            status = `${moveColor} to move`;

            if (game.in_check()) {
                status += `, ${moveColor} is in check`;
            }
        }

        console.log(status);
    }

    restartBtn.addEventListener('click', () => {
        game.reset();
        board.start();
        updateStatus();
    });

    updateStatus();
});
