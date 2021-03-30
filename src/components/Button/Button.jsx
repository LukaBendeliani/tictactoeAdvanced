import React from "react";
import "./Button.css";

const Button = (props) => {
  const { backgroundColor, children, onClick } = props;

  return (
    <button
      onClick={onClick ? onClick : null}
      className="btn"
      style={{ backgroundColor }}
    >
      {children}
    </button>
  );
};

export default Button;
