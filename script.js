const player = (_sign, _isActive) => {
    const sign = _sign;
    let isActive = _isActive;

    const getSign = () => sign;

    const updateActive = () => {
        isActive = !isActive;
    };

    const getActive = () => isActive;

    return { getSign, updateActive, getActive };
};

const gameBoard = () => {
    const board = ["", "", "", "", "", "", "", "", ""];
    let activePlayer;
    let playerX = player("X", false);
    let playerO = player("O", false);

    const getBoard = () => [...board];

    const displayBoard = () => {
        console.log(`\n`);
        console.log(
            ` ${board[0] || " "} | ${board[1] || " "} | ${
                board[2] || " "
            } \n-----------\n ${board[3] || " "} | ${board[4] || " "} | ${
                board[5] || " "
            } \n-----------\n ${board[6] || " "} | ${board[7] || " "} | ${
                board[8] || " "
            } \n`
        );
    };

    const getEmptyFields = () => {
        return board
            .map((item, index) => (item === "" ? index : null))
            .filter((index) => index !== null);
    };

    const setField = (field) => {
        board[field] = activePlayer.getSign();
    };

    const fieldIsSigned = (field) => {
        return board[field] !== "";
    };

    const isGameStale = () => {
        return board.every((item) => item !== "");
    };

    const updateActivePlayer = () => {
        if (playerX.getActive() === false && playerO.getActive() === false) {
            playerX.updateActive();
            activePlayer = playerX;
            return;
        }
        if (playerX.getActive() === true) {
            playerX.updateActive();
            playerO.updateActive();
            activePlayer = playerO;
            return;
        } else {
            playerX.updateActive();
            playerO.updateActive();
            activePlayer = playerX;
            return;
        }
    };

    const getActivePlayer = () => activePlayer;

    return {
        getBoard,
        displayBoard,
        getEmptyFields,
        setField,
        fieldIsSigned,
        isGameStale,
        updateActivePlayer,
        getActivePlayer,
    };
};

const displayController = () => {
    const startBtn = document.querySelector("#start");
    const resetBtn = document.querySelector("#reset");
    const fields = () => document.querySelector(".board").children;
    const fields2 = document.querySelectorAll(".field");

    const setResultBoard = (msg) => {
        document.querySelector("#resultBoard").innerHTML = msg;
    };

    const getPlayers1Name = () => {
        return document.querySelector("#player1").value;
    };

    const getPlayers2Name = () => {
        return document.querySelector("#player2").value;
    };

    const setFieldSign = (field, sign) => {
        fields()[field].classList.add("image" + sign);
    };

    const clearBoard = () => {
        fields2.forEach((field) => {
            if (field.classList.length > 1) {
                field.classList.remove(field.classList.item(1));
            }
        });
        setResultBoard("");
    };

    return {
        getPlayers1Name,
        getPlayers2Name,
        setFieldSign,
        clearBoard,
        setResultBoard,
    };
};

const checkWinning = (board) => {
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
        return board[a] && board[a] === board[b] && board[b] === board[c];
    });
};

const gameController = (() => {
    let game = gameBoard();
    const display = displayController();
    let gameRunning = true;

    const resetGame = () => {
        game = gameBoard();
        gameRunning = true;
        console.log("Game has been reset.");
        game.displayBoard();
        display.clearBoard();
    };

    const playRound = (field) => {
        if (!gameRunning) {
            console.log("Game has already ended.");
            display.setResultBoard("Game has already ended.");
            return;
        }

        if (field < 0 || field > 8) {
            console.log("Invalid move: Field out of bounds.");
            display.setResultBoard("Invalid move: Field out of bounds.");
            return;
        }

        if (game.fieldIsSigned(field)) {
            console.log("Invalid move: Field is already signed.");
            display.setResultBoard("Invalid move: Field is already signed.");
            return;
        }

        if (game.getActivePlayer() === undefined) game.updateActivePlayer();

        game.setField(field);
        display.setFieldSign(field, game.getActivePlayer().getSign());
        game.displayBoard();

        const board = game.getBoard();

        if (checkWinning(board)) {
            console.log(`Player ${game.getActivePlayer().getSign()} wins!`);
            display.setResultBoard(
                `Player ${game.getActivePlayer().getSign()} wins!`
            );
            gameRunning = false;
            return;
        }

        if (game.isGameStale()) {
            console.log("It's a draw!");
            display.setResultBoard("It's a draw!");
            gameRunning = false;
            return;
        }

        console.log(`Next turn: Player ${game.getActivePlayer().getSign()}`);
        game.updateActivePlayer();
        display.setResultBoard(
            `Next turn: Player ${game.getActivePlayer().getSign()}`
        );
    };

    return {
        resetGame,
        playRound,
    };
})();

// // Usage Example:
// gameController.resetGame();
// gameController.playRound(0); // Player X
// gameController.playRound(1); // Player O
// gameController.playRound(4); // Player X
// gameController.playRound(2); // Player O
// gameController.playRound(8); // Player X wins
