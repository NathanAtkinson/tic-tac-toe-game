import { useEffect, useState } from "react";

//used https://medium.com/@codewithmarish/create-a-tic-tac-toe-game-using-next-js-7fa52fdd7b19 as the starting point.
//it assumes React and not TypeScript, so then had to make updates so it would compile.

//ideally would convert from 0-8 array to a matrix (array of arrays)
const WINNING_COMBO = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export default function Home() {
    const [xTurn, setXTurn] = useState<boolean>(true);
    const [won, setWon] = useState<boolean>(false);
    const [wonCombo, setWonCombo] = useState<number[]>([]);
    const [boardData, setBoardData] = useState<string[]>([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");

    useEffect(() => {
        checkWinner();
        checkDraw(); //TODO bug that won variable isn't set yet when checkDraw() runs, so winning on last move causes "is draw!" message
    }, [boardData]);

    const updateBoardData = (index: number) => {
        if (!boardData[index] && !won && !isDraw) {
            let value = xTurn === true ? "X" : "O";
            setBoardData({ ...boardData, [index]: value });
            setXTurn(!xTurn);
        }
    };

    const checkDraw = () => {
        let hasEmptySpace = false;
        for (const key in boardData) {
            if (boardData[key]?.length == 0) {
                hasEmptySpace = true;
            }
        }

        setIsDraw(!hasEmptySpace);
        if (!hasEmptySpace) setModalTitle("Match Draw!!!");
    };

    const checkWinner = async () => {
        WINNING_COMBO.map((bd: number[]) => {
            const [a, b, c] = bd;
            if (
                boardData[a] &&
                boardData[a] === boardData[b] &&
                boardData[a] === boardData[c]
            ) {
                setWon(true);
                setWonCombo([a, b, c]);
                setModalTitle(`Player ${!xTurn ? "X" : "O"} Won!!!`);

                return;
            }
        });
    };

    const reset = () => {
        setBoardData(["", "", "", "", "", "", "", "", ""]);
        setXTurn(true);
        setWon(false);
        setWonCombo([]);
        setIsDraw(false);
        setModalTitle("");
    };

    return (
        <div>
            <div>
                <title>Tic Tac Toe</title>
            </div>
            <h1>Tic Tac Toe</h1>
            <div className="game">
                <div className="game__menu">
                    <p>{xTurn === true ? "X Turn" : "O Turn"}</p>
                    <p>{`Game Won:${won} Draw: ${isDraw}`}</p>
                </div>
                <div className="game__board">
                    {[...Array(9)].map((value, index: number) => {
                        return (
                            <div
                                onClick={() => {
                                    updateBoardData(index);
                                }}
                                key={index}
                                className={`square ${
                                    wonCombo.includes(index) ? "highlight" : ""
                                }`}
                            >
                                {boardData[index]}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={`modal ${modalTitle ? "show" : ""}`}>
                <div className="modal__title">{modalTitle}</div>
                <button onClick={reset}>New Game</button>
            </div>
        </div>
    );
}
