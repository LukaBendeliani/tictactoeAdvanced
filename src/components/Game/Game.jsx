import React, { useState } from "react";
import Board from "../Board/Board";
import Navbar from "../Navbar/Navbar";
import { createBoard } from "../../utils";
import "./Game.css";

const Game = () => {
  const [winner, setWinner] = useState();
  const [currentTurn, setCurrentTurn] = useState("X");
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [boardData, setBoardData] = useState();
  const [board, setBoard] = useState(createBoard(3, 3));

  const resetBoard = (rows, columns) => {
    setBoard(createBoard(rows, columns));
    setBoardDisabled(false);
    setCurrentTurn("X");
    setWinner();
  };

  const boardProps = {
    setWinner,
    setBoard,
    setCurrentTurn,
    setBoardDisabled,
    board,
    currentTurn,
    boardDisabled,
    consecutiveSymbols: boardData?.consecutiveSymbols || 3,
  };

  const navbarProps = {
    resetBoard,
    setBoardData,
    winner,
    boardData,
  };

  return (
    <div>
      <Navbar {...navbarProps} />
      <Board {...boardProps} />
    </div>
  );
};

export default Game;
