import React, { useState } from "react";
import "./Settings.css";

const Button = (props) => <button {...props} type="button" />;

const Settings = (props) => {
  const { setBoardData, resetBoard, setOpen, winner } = props;
  const [size, setSize] = useState(3);
  const [symbols, setSymbols] = useState(3);

  const close = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBoardData({ consecutiveSymbols: symbols, rows: size, columns: size });
    resetBoard(size, size);
    close();
  };

  const incrementSize = () => {
    if (size < 100) {
      setSize((prevState) => prevState + 1);
    }
  };

  const decrementSize = () => {
    if (size !== 2) {
      setSize((prevState) => prevState - 1);
    }
  };

  const incrementSymbols = () => {
    if (size > symbols) {
      setSymbols((prevState) => prevState + 1);
    }
  };

  const decrementSymbols = () => {
    if (symbols !== 0) {
      setSymbols((prevState) => prevState - 1);
    }
  };

  const isDraw = winner === "Draw"

  return (
    <>
      <div className="overlay" onClick={close} />
      {winner && <div className="announcement">
        <h1>{isDraw ? "Game is draw! :|" : `Player ${winner} won the game! :)`}</h1>
      </div>}
      <form className="settings-container" onSubmit={handleSubmit}>
        <div className="field">
          <label>Size</label>
          <span>
            <Button onClick={incrementSize}>+</Button>
            <p>{size}</p>
            <Button onClick={decrementSize}>-</Button>
          </span>
        </div>

        <div className="field">
          <label>Winning symbols</label>
          <span>
            <Button onClick={incrementSymbols}>+</Button>
            <p>{symbols}</p>
            <Button onClick={decrementSymbols}>-</Button>
          </span>
        </div>
        <button type="submit" className="submit-button">
          START
        </button>
      </form>
    </>
  );
};

export default Settings;
