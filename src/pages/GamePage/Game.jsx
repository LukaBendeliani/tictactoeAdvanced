import React, { useState } from "react";
import Board from "../../components/Board/Board";
import Settings from "../../components/Settings/Settings";
import settingsSvg from "./assets/settings.svg";
import resetSvg from "./assets/refreshing.svg";
import "./Game.css";

// const defaultBoardSettings = {
//   rows: 3,
//   columns: 3,
//   numbertowin: 3,
// };

const Game = () => {
  const [winner, setWinner] = useState();
  const [isSettingsVisible, showSettings] = useState(false);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [boardDisabled, setBoardDisabled] = useState(false);
  const [boardData, setBoardData] = useState();

  const [board, setBoard] = useState(
    Array.from(Array(3), () => Array.from(Array(3), () => 0))
  );

  const settings = [
    {
      name: "Settings",
      icon: settingsSvg,
      onclick: () => showSettings(!isSettingsVisible),
    },
    {
      name: "Reset",
      icon: resetSvg,
      onclick: () => resetBoard(boardData.rows, boardData.columns),
    },
  ];

  const resetBoard = (rows, columns) => {
    setBoard(
      Array.from(Array(rows), () => Array.from(Array(columns), () => 0))
    );
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
    rows: boardData?.rows || 3,
    columns: boardData?.columns || 3,
    numbertowin: boardData?.numbertowin || 3,
  };

  const settingsProps = {
    boardData,
    setBoardData,
    resetBoard,
    showSettings,
  };
  return (
    <div>
      <div className="bar">
        <div className="actions">
          {settings.map((setting, index) => {
            return (
              <div
                key={index}
                className="iconContainer"
                onClick={setting.onclick}
              >
                <img className="icon" src={setting.icon} alt={setting.name} />
              </div>
            );
          })}
        </div>
        {winner && (
          <h1 className="winner-announcer">
            {winner === "Draw"
              ? "Game is Draw"
              : `Player ${winner} Won the game`}
          </h1>
        )}
      </div>
      {isSettingsVisible ? <Settings {...settingsProps} /> : <></>}
      <Board {...boardProps} />
    </div>
  );
};

export default Game;
