import React, { useState, useEffect } from "react";
import "./Board.css";
const Board = (props) => {
  const { rows, columns, numbertowin } = props.location.state;
  const { setWinner, board, setBoard } = props;
  const [isXTurn, setXTurn] = useState(true);

  useEffect(() => {
    createBoardArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createBoardArray = () => {
    let tempBoard = [...board];
    for (let i = 0; i < rows; i++) {
      tempBoard.push(Array.from(Array(columns), (_, x) => x * 0));
    }
    setBoard(tempBoard);
  };

  const boardMapper = (row, rowIndex) => {
    return (
      <tr key={rowIndex}>
        {row.map((col, colIndex) => {
          return (
            <th
              key={colIndex}
              onClick={() => handleBoxClick(rowIndex, colIndex)}
            >
              {col !== 0 ? col : null}
            </th>
          );
        })}
      </tr>
    );
  };

  const handleBoxClick = (rowIndex, colIndex) => {
    let tempBoard = [...board];

    if (!Boolean(tempBoard[rowIndex][colIndex])) {
      tempBoard[rowIndex][colIndex] = isXTurn ? "X" : "O";
      setXTurn(!isXTurn);
      setBoard(tempBoard);
    }

    const winner = checkWinner();

    if (winner) {
      setWinner(winner);
    } else if (checkForDraw()) {
      setWinner("Draw");
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
        if (allEqual(section)) return board[i][n];
      }
    }
  };

  const checkColumnsForWinner = () => {
    for (let n, i = 0; i < board.length; i++) {
      for (n = 0; n < board.length - numbertowin + 1; n++) {
        let section = board.slice(n, numbertowin + n).map((j) => j[i]);
        if (allEqual(section)) return section[0];
      }
    }
  };

  const checkDiagonalsForWinner = () => {
    for (let n, i = 0; i < board.length; i++) {
      for (n = 0; n < board.length - numbertowin + 1; n++) {
        let sectionrtl = board
          .slice(n, numbertowin + n)
          .map((j, index) => j[i + index]);

        let sectionltr = board
          .slice(n, numbertowin + n)
          .map((j, index) => j[numbertowin + i - index - 1]);

        if (allEqual(sectionrtl)) return sectionrtl[0];
        else if (allEqual(sectionltr)) return sectionltr[0];
      }
    }
  };

  const checkForDraw = () => {
    let boardStr = JSON.stringify(board);
    if (!boardStr.includes(0) && boardStr.includes("X")) {
      return true;
    }
  };

  const checkWinner = () => {
    let winner;
    if (
      checkRowsForWinner() ||
      checkColumnsForWinner() ||
      checkDiagonalsForWinner()
    ) {
      winner =
        checkRowsForWinner() ||
        checkColumnsForWinner() ||
        checkDiagonalsForWinner();
    }
    return winner;
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
