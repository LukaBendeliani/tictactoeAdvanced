import checkWinner from "./checkWinner";

const isWinningPosition = (colIndex, rowIndex, board, consecutiveSymbols) => {
  const winningPositions = checkWinner(board, consecutiveSymbols)
    ?.winningPositions;

  for (let i = 0; i < consecutiveSymbols; i++) {
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
export default isWinningPosition;
