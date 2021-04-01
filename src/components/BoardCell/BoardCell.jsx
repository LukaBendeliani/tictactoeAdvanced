import React from "react";
import "./BoardCell.css";
import isWinningPosition from "../../utils/isWinningPosition";

const BoardCell = (props) => {
  const {
    handleCellClick,
    rowIndex,
    colIndex,
    board,
    consecutiveSymbols,
  } = props;
  const isWinPos = isWinningPosition(
    colIndex,
    rowIndex,
    board,
    consecutiveSymbols
  );

  return (
    <div
      className="board-cell"
      style={{
        width: `calc(100vw / ${board[0].length * 3})`,
        height: `calc(100vw / ${board.length * 3})`,
        backgroundColor: isWinPos ? "green" : "#fff",
      }}
      onClick={() => handleCellClick(rowIndex, colIndex)}
    >
      {props.children}
    </div>
  );
};

export default BoardCell;
