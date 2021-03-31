import React from "react";
import XSVG from "./assets/X.svg";
import OSVG from "./assets/O.svg";

import "./Board.css";

const Board = (props) => {
  const {
    setWinner,
    board,
    setBoard,
    numbertowin,
    currentTurn,
    setCurrentTurn,
    boardDisabled,
    setBoardDisabled,
  } = props;

  const boardMapper = (row, rowIndex) => {
    return (
      <tr key={rowIndex}>
        {row.map((col, colIndex) => {
          if (isWinningPosition(colIndex, rowIndex)) {
            return (
              <td
                key={colIndex}
                style={{ backgroundColor: "green", color: "#fff" }}
              >
                {Boolean(col) ? (
                  <img
                    style={{
                      width: `calc((100vw / ${row.length * 3}) - 10px)`,
                      height: `calc((100vw / ${board.length * 3}) - 10px)`,
                    }}
                    src={col === "X" ? XSVG : OSVG}
                    alt={col}
                  />
                ) : null}
              </td>
            );
          }

          return (
            <td
              key={colIndex}
              style={{
                width: `calc(100vw / ${row.length * 3})`,
                height: `calc(100vw / ${board.length * 3})`,
              }}
              onClick={() => handleBoxClick(rowIndex, colIndex)}
            >
              {Boolean(col) ? (
                <img
                  style={{
                    width: `calc((100vw / ${row.length * 3}) - 10px)`,
                    height: `calc((100vw / ${board.length * 3}) - 10px)`,
                  }}
                  src={col === "X" ? XSVG : OSVG}
                  alt={col}
                />
              ) : null}
            </td>
          );
        })}
      </tr>
    );
  };

  const handleBoxClick = (rowIndex, colIndex) => {
    let tempBoard = [...board];

    if (!Boolean(tempBoard[rowIndex][colIndex]) && !boardDisabled) {
      tempBoard[rowIndex][colIndex] = currentTurn;
      setCurrentTurn(currentTurn === "X" ? "O" : "X");
      setBoard(tempBoard);
      if (checkWinner()?.winner) {
        setWinner(checkWinner().winner);
        setBoardDisabled(true);
      }
    }
  };

  const allEqual = (arr) => {
    const equal = arr.every((v) => {
      if (v !== 0) return v === arr[0];
      return false;
    });
    return equal;
  };

  const checkRowsForWinner = () => {
    for (let n, i = 0; i < board.length; i++) {
      for (n = 0; n < board[i].length - numbertowin + 1; n++) {
        let section = board[i].slice(n, numbertowin + n);
        if (allEqual(section)) {
          let winningPositions = {
            col: [],
            row: [],
          };

          for (let col = 0; col < numbertowin; col++) {
            winningPositions.col.push(col + n);
            winningPositions.row.push(i);
          }

          return { winner: section[0], winningPositions };
        }
      }
    }
    return false;
  };

  const checkColumnsForWinner = () => {
    for (let n, i = 0; i < board.length; i++) {
      for (n = 0; n < board.length - numbertowin + 1; n++) {
        let checkingRows = board.slice(n, numbertowin + n);
        let section = checkingRows.map((j) => j[i]);

        if (allEqual(section)) {
          let winningPositions = {
            col: [],
            row: [],
          };

          for (let row = 0; row < numbertowin; row++) {
            winningPositions.col.push(i);
            winningPositions.row.push(row + n);
          }

          return { winner: section[0], winningPositions };
        }
      }
    }
    return false;
  };

  const checkDiagonalsForWinner = () => {
    for (let n, i = 0; i < board.length; i++) {
      for (n = 0; n < board.length - numbertowin + 1; n++) {
        let sectionltr = board
          .slice(n, numbertowin + n)
          .map((j, index) => j[i + index]);

        let sectionrtl = board
          .slice(n, numbertowin + n)
          .map((j, index) => j[numbertowin + i - index - 1]);

        if (allEqual(sectionrtl)) {
          let winningPositions = {
            col: [],
            row: [],
          };

          for (let x = 0; x < numbertowin; x++) {
            winningPositions.col.push(numbertowin + i - x - 1);
            winningPositions.row.push(x + n);
          }

          return { winner: sectionrtl[0], winningPositions };
        } else if (allEqual(sectionltr)) {
          let winningPositions = {
            col: [],
            row: [],
          };

          for (let x = 0; x < numbertowin; x++) {
            winningPositions.col.push(i + x);
            winningPositions.row.push(x + n);
          }
          return { winner: sectionltr[0], winningPositions };
        }
      }
    }
    return false;
  };

  const checkForDraw = () => {
    let boardStr = JSON.stringify(board);
    if (!boardStr.includes(0)) {
      return { winner: "Draw" };
    } else {
      return false;
    }
  };

  const checkWinner = () => {
    let winnerAndPositions;
    if (
      checkRowsForWinner() ||
      checkColumnsForWinner() ||
      checkDiagonalsForWinner() ||
      checkForDraw()
    ) {
      winnerAndPositions =
        checkRowsForWinner() ||
        checkColumnsForWinner() ||
        checkDiagonalsForWinner() ||
        checkForDraw();
    }
    return winnerAndPositions;
  };

  const isWinningPosition = (colIndex, rowIndex) => {
    const winningPositions = checkWinner()?.winningPositions;

    for (let i = 0; i < numbertowin; i++) {
      if (
        winningPositions &&
        winningPositions.col[i] === colIndex &&
        winningPositions.row[i] === rowIndex
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="container">
      <table>
        <tbody>{board.map(boardMapper)}</tbody>
      </table>
    </div>
  );
};

export default Board;
