import React, { useEffect, useState } from "react";
import Settings from "../Settings/Settings";

import settingsSvg from "./assets/settings.svg";
import resetSvg from "./assets/refreshing.svg";
import "./Navbar.css";

const Navbar = (props) => {
  const [open, setOpen] = useState(false);
  const { resetBoard, boardData, winner, setBoardData } = props;

  const settings = [
    {
      name: "Settings",
      icon: settingsSvg,
      onclick: () => setOpen((prevState) => !prevState),
    },
    {
      name: "Reset",
      icon: resetSvg,
      onclick: () => resetBoard(boardData?.rows || 3, boardData?.columns || 3),
    },
  ];

  useEffect(() => {
    if(winner) {
      setTimeout(() => setOpen(true), 1000)
    }
  },[winner])

  const settingsProps = {
    boardData,
    setBoardData,
    resetBoard,
    setOpen,
    winner
  };

  return (
    <>
      {open && <Settings {...settingsProps} />}
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
      </div>
    </>
  );
};

export default Navbar;
