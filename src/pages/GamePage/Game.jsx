import React, { useState } from "react";
import Board from "../../components/Board/Board";
import Modal from "../../components/Modal/Modal";

const Game = (props) => {
  const [winner, setWinner] = useState();
  const [board, setBoard] = useState([]);
  const { rows, columns } = props.location.state;

  const resetBoard = () => {
    let tempBoard = [];
    for (let i = 0; i < rows; i++) {
      tempBoard.push(Array.from(Array(columns), (_, x) => x * 0));
    }
    setBoard(tempBoard);
    setWinner();
  };

  return (
    <div>
      <Modal winner={winner} resetBoard={resetBoard} />
      <Board
        {...props}
        setWinner={setWinner}
        board={board}
        setBoard={setBoard}
      />
    </div>
  );
};

export default Game;
