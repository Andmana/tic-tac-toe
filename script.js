const gameBoard = () => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const displayBoard = () => {
        console.log(
            `
            | ${board[0]} | ${board[1]} | ${board[2]} |
            -------
            | ${board[3]} | ${board[4]} | ${board[5]} |
            -------
            | ${board[6]} | ${board[7]} | ${board[8]} |
            `
        );
    };

    const getEmpty = () => {
        return board
            .map((item, index) => (item === "" ? index : null))
            .filter((index) => index !== null);
    };

    const countEmpty = () => {
        return board.filter((item) => item == "").length;
    };

    const setMove = (num, player) => {
        board[num] = player.mark;
    };

    const getBoard = () => {
        return board;
    };

    return {
        displayBoard,
        getEmpty,
        countEmpty,
        setMove,
        getBoard,
    };
};

function setMark(mark) {
    this.mark = mark;
}

let gameController = (() => {
    let game = gameBoard();
    let player;
    let computer;

    const setPlayer = (mark) => {
        player = new setMark(mark);
        computer = new setMark(mark === "x" ? "o" : "x");
    };

    let currentPlayer = player;

    const move = (num) => {
        game.setMove(num, player);
        game.displayBoard();

        if (checkWinning(game.getBoard(), player.mark)) {
            console.log("You Win");
            return;
        } else if (game.countEmpty === 0) {
            console.log("Draw");
            return;
        }

        // Computer Move
        let emptyFields = game.getEmpty();
        let computerMove =
            emptyFields[Math.floor(Math.random() * emptyFields.length)];
        game.setMove(computerMove, computer);

        console.log("Computer Moving");
        game.displayBoard();
        if (checkWinning(game.getBoard(), computer.mark)) {
            console.log("Computer Win");
        }
        return;
    };

    const reset = () => {
        game = gameBoard();
        game.displayBoard();
    };

    return {
        move,
        setPlayer,
        reset,
    };
})();

const checkWinning = (board, mark) => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some((pattern) => {
        const [a, b, c] = pattern;
        return board[a] === mark && board[b] === mark && board[c] === mark;
    });
};

const checkDraw = (board) => {
    return board.every((cell) => cell !== "");
};
