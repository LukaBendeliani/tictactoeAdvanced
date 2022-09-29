export const createBoard = (rows, columns) => {
  return Array.from(Array(rows), () => Array.from(Array(columns), () => 0));
};
