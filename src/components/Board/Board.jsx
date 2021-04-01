import React from "react";
import BoardCell from "../BoardCell/BoardCell";
import checkWinner from "../../utils/checkWinner";
import XSVG from "./assets/X.svg";
import OSVG from "./assets/O.svg";
import "./Board.css";

const Board = (props) => {
  const {
    setWinner,
    board,
    setBoard,
    consecutiveSymbols,
    currentTurn,
    setCurrentTurn,
    boardDisabled,
    setBoardDisabled,
  } = props;

  const rowMapper = (row, rowIndex) => (cell, colIndex) => {
    const boardCellProps = {
      handleCellClick,
      rowIndex,
      colIndex,
      board,
      consecutiveSymbols,
    };

    return (
      <BoardCell key={colIndex} {...boardCellProps}>
        {Boolean(cell) && (
          <img
            style={{
              width: `calc((100vw / ${board[0].length * 3}) - 10px)`,
              height: `calc((100vw / ${board.length * 3}) - 10px)`,
            }}
            src={cell === "X" ? XSVG : OSVG}
            alt={cell}
          />
        )}
      </BoardCell>
    );
  };

  const handleCellClick = (rowIndex, colIndex) => {
    let tempBoard = [...board];

    if (!Boolean(tempBoard[rowIndex][colIndex]) && !boardDisabled) {
      tempBoard[rowIndex][colIndex] = currentTurn;
      setCurrentTurn(currentTurn === "X" ? "O" : "X");
      setBoard(tempBoard);
      if (checkWinner(board, consecutiveSymbols)?.winner) {
        setWinner(checkWinner(board, consecutiveSymbols).winner);
        setBoardDisabled(true);
      }
    }
  };

  return (
    <div className="container">
      <div
        className="board-container"
        style={{
          gridTemplateColumns: "auto ".repeat(board.length),
        }}
      >
        {board.map((row, rowIndex) => (
          <div key={rowIndex}>{row.map(rowMapper(row, rowIndex))}</div>
        ))}
      </div>
    </div>
  );
};

export default Board;
