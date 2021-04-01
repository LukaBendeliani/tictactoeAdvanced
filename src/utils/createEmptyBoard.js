const createEmptyBoard = (rows, columns) => {
  return Array.from(Array(rows), () => Array.from(Array(columns), () => 0));
};

export default createEmptyBoard;
