const allEqual = arr => arr.every(v => v && v !== 0 ? v === arr[0] : false)

const checkRowsForWinner = (board, consecutiveSymbols) => {
  for (let n, i = 0; i < board.length; i++) {
    for (n = 0; n < board[i].length - consecutiveSymbols + 1; n++) {
      let section = board[i].slice(n, consecutiveSymbols + n);
      if (allEqual(section)) {
        let winningPositions = {
          col: [],
          row: [],
        };

        for (let col = 0; col < consecutiveSymbols; col++) {
          winningPositions.col.push(col + n);
          winningPositions.row.push(i);
        }

        return { winner: section[0], winningPositions };
      }
    }
  }
  return false;
};

const checkColumnsForWinner = (board, consecutiveSymbols) => {
  for (let n, i = 0; i < board[0].length; i++) {
    for (n = 0; n < board.length - consecutiveSymbols + 1; n++) {
      let checkingRows = board.slice(n, consecutiveSymbols + n);
      let section = checkingRows.map((j) => j[i]);

      if (allEqual(section)) {
        let winningPositions = {
          col: [],
          row: [],
        };

        for (let row = 0; row < consecutiveSymbols; row++) {
          winningPositions.col.push(i);
          winningPositions.row.push(row + n);
        }
        return { winner: section[0], winningPositions };
      }
    }
  }
  return false;
};

const checkDiagonalsForWinner = (board, consecutiveSymbols) => {
  for (let n, i = 0; i < board[0].length; i++) {
    for (n = 0; n < board.length - consecutiveSymbols + 1; n++) {
      let sectionltr = board
        .slice(n, consecutiveSymbols + n)
        .map((j, index) => j[i + index]);

      let sectionrtl = board
        .slice(n, consecutiveSymbols + n)
        .map((j, index) => j[consecutiveSymbols + i - index - 1]);

      if (allEqual(sectionrtl)) {
        let winningPositions = {
          col: [],
          row: [],
        };

        for (let x = 0; x < consecutiveSymbols; x++) {
          winningPositions.col.push(consecutiveSymbols + i - x - 1);
          winningPositions.row.push(x + n);
        }

        return { winner: sectionrtl[0], winningPositions };
      } else if (allEqual(sectionltr)) {
        let winningPositions = {
          col: [],
          row: [],
        };

        for (let x = 0; x < consecutiveSymbols; x++) {
          winningPositions.col.push(i + x);
          winningPositions.row.push(x + n);
        }
        return { winner: sectionltr[0], winningPositions };
      }
    }
  }
  return false;
};

const checkForDraw = (board) => {
  let boardStr = JSON.stringify(board);
  if (!boardStr.includes(0)) {
    return { winner: "Draw" };
  } else {
    return false;
  }
};

const checkWinner = (board, consecutiveSymbols) => {
  let winnerAndPositions;

  if (
    checkRowsForWinner(board, consecutiveSymbols) ||
    checkColumnsForWinner(board, consecutiveSymbols) ||
    checkDiagonalsForWinner(board, consecutiveSymbols) ||
    checkForDraw(board)
  ) {
    winnerAndPositions =
      checkRowsForWinner(board, consecutiveSymbols) ||
      checkColumnsForWinner(board, consecutiveSymbols) ||
      checkDiagonalsForWinner(board, consecutiveSymbols) ||
      checkForDraw(board);
  }
  return winnerAndPositions;
};

export default checkWinner;
