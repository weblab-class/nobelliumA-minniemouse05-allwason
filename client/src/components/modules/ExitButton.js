import React from "react";
import "../../utilities.css";
import { useNavigate } from "react-router-dom";
import "./ExitButton.css";

function ExitButton() {
  const navigate = useNavigate();
  return (
    <div className="exitbutton-container">
      <button className="exit-button todo-top-right" type="button" onClick={() => navigate("/")}>
        X
      </button>
    </div>
  );
}

export default ExitButton;
