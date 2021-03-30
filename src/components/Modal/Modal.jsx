import React from "react";
import "./Modal.css";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";

const Modal = (props) => {
  const { winner, resetBoard } = props;
  const history = useHistory();

  const handleSettingsClick = () => {
    history.push("/");
  };

  return (
    <div
      className="modal-container"
      style={{ display: winner ? "flex" : "none" }}
    >
      <div className="modal">
        <div className="inner-container">
          {winner === "Draw" ? (
            <p>Game is Draw</p>
          ) : (
            <p>Player {winner} won the game</p>
          )}
        </div>
        <div>
          <Button backgroundColor="#4fc3f7" onClick={resetBoard}>
            Restart
          </Button>
          <Button backgroundColor="#455a64" onClick={handleSettingsClick}>
            Change Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
