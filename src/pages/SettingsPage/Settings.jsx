import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./Settings.css";

const Settings = () => {
  const history = useHistory();
  const [boardData, setBoardData] = useState({});

  const handleValueChange = (e) => {
    let name = e.target.name,
      value = e.target.value;

    let tempObj = { ...boardData };
    value !== "" ? (tempObj[name] = parseInt(value)) : delete tempObj[name];
    setBoardData(tempObj);
  };

  const handleStart = () => {
    if (Object.values(boardData).length < 3) {
      alert("fill all the fields");
      return;
    }
    history.push("/game", boardData);
  };

  return (
    <div className="container">
      <div className="box">
        <div>
          <input
            type="number"
            name="rows"
            placeholder="Rows"
            onChange={handleValueChange}
          />
          <h1>X</h1>
          <input
            type="number"
            name="columns"
            placeholder="Columns"
            onChange={handleValueChange}
          />
        </div>

        <input
          type="number"
          name="numbertowin"
          placeholder="Number of winning symbols"
          onChange={handleValueChange}
        />
        <Button backgroundColor="#7cb342" onClick={handleStart}>
          START
        </Button>
      </div>
    </div>
  );
};

export default Settings;
