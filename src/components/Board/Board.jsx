import React from "react";
import BoardCell from "../BoardCell/BoardCell";
import checkWinner from "../../utils/checkWinner";
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

  const rowMapper = (_, rowIndex) => (cell, colIndex) => {
   const borderTop = colIndex === 0 ? "none" : "2px solid #fff"
   const borderBottom = board.length - 1 === colIndex ? "none" : "2px solid #fff"
   const borderLeft = rowIndex === 0 ? "none" : "2px solid #fff"
   const borderRight = board.length - 1 === rowIndex ? "none" : "2px solid #fff"

    const boardCellProps = {
      handleCellClick,
      rowIndex,
      colIndex,
      board,
      consecutiveSymbols,
      borderTop,
      borderBottom,
      borderLeft,
      borderRight
    };

    const isX = cell === "X";

    return (
      <BoardCell key={colIndex} {...boardCellProps}>
        {Boolean(cell) && (
          <svg viewBox="0 0 20 18">
            <text x="4" y="15" fill={isX ? "#D61C4E" : "#FEDB39"}>
              {isX ? "X" : "O"}
            </text>
          </svg>
        )}
      </BoardCell>
    );
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] === 0 && !boardDisabled) {
      let tempBoard = [...board];
      tempBoard[rowIndex][colIndex] = currentTurn;
      setCurrentTurn((prevState) => (prevState === "X" ? "O" : "X"));
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
          gridTemplateColumns: "auto ".repeat(board.length)
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
