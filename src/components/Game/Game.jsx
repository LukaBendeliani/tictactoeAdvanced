import React, { useState } from "react";
import Board from "../Board/Board";
import Settings from "../Settings/Settings";
import Navbar from "../Navbar/Navbar";
import createEmptyBoard from "../../utils/createEmptyBoard";
import "./Game.css";

const Game = () => {
  const [winner, setWinner] = useState();
  const [currentTurn, setCurrentTurn] = useState("X");
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [boardData, setBoardData] = useState();
  const [isSettingsVisible, showSettings] = useState(false);
  const [board, setBoard] = useState(createEmptyBoard(3, 3));

  const resetBoard = (rows, columns) => {
    setBoard(createEmptyBoard(rows, columns));
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

  const settingsProps = {
    boardData,
    setBoardData,
    resetBoard,
    showSettings,
  };

  const navbarProps = {
    isSettingsVisible,
    showSettings,
    resetBoard,
    winner,
    boardData,
  };

  return (
    <div>
      <Navbar {...navbarProps} />
      {isSettingsVisible ? <Settings {...settingsProps} /> : <></>}
      <Board {...boardProps} />
    </div>
  );
};

export default Game;
