import React from "react";
import settingsSvg from "./assets/settings.svg";
import resetSvg from "./assets/refreshing.svg";
import "./Navbar.css";

const Navbar = (props) => {
  const { resetBoard, boardData, winner, showSettings } = props;

  const settings = [
    {
      name: "Settings",
      icon: settingsSvg,
      onclick: () => showSettings((prevState) => !prevState),
    },
    {
      name: "Reset",
      icon: resetSvg,
      onclick: () => resetBoard(boardData?.rows || 3, boardData?.columns || 3),
    },
  ];

  return (
    <div className="navbar">
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
          {winner === "Draw" ? "Game is Draw" : `Player ${winner} Won the game`}
        </h1>
      )}
    </div>
  );
};

export default Navbar;
