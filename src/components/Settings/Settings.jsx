import React from "react";
import Button from "../../components/Button/Button";
import "./Settings.css";

const Settings = (props) => {
  const { setBoardData, resetBoard, showSettings } = props;
  let settingsObj = {};

  const handleValueChange = (e) => {
    let name = e.target.name,
      value = e.target.value;

    value !== ""
      ? (settingsObj[name] = parseInt(value))
      : delete settingsObj[name];
  };

  const handleStart = () => {
    if (Object.values(settingsObj).length < 3) {
      alert("fill all the fields");
      return;
    }
    setBoardData(settingsObj);
    resetBoard(settingsObj.rows, settingsObj.columns);
    showSettings(false);
  };

  return (
    <div className="settings-container">
      <div className="box">
        <div>
          <input
            type="number"
            name="rows"
            placeholder="Rows"
            onChange={handleValueChange}
            value={settingsObj.rows}
          />
          <h1>X</h1>
          <input
            type="number"
            name="columns"
            placeholder="Columns"
            onChange={handleValueChange}
            value={settingsObj.columns}
          />
        </div>

        <input
          type="number"
          name="numbertowin"
          placeholder="Number of winning symbols"
          onChange={handleValueChange}
          value={settingsObj.numbertowin}
        />
        <Button backgroundColor="#7cb342" onClick={handleStart}>
          MODIFY
        </Button>
      </div>
    </div>
  );
};

export default Settings;
