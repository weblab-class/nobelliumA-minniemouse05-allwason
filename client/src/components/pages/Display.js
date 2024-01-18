import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Room.css";
import "./Display.css";
import { Link, useNavigate } from "react-router-dom";
const Display = ({ open }) => {
  var ESCAPE_KEY = 27;
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("keydown", _handleKeyDown, true);
  });
  const _handleKeyDown = (event) => {
    switch (event.keyCode) {
      case ESCAPE_KEY:
        navigate("/");
        break;
      default:
        break;
    }
  };

  if (open === "room") {
    return (
      <div className="room button-overlay">
        <img id="roomdisplay" src="https://i.redd.it/s7i5m1g62if61.png" />
        <Link to="/notebook">
          <button id="notebook">notebook</button>
        </Link>
        <Link to="/todo">
          <button id="todo">To do List</button>
        </Link>
      </div>
    );
  } else if (open === "todo") {
    return (
      <>
        <div className="room button-overlay">
          <img id="roomdisplay" src="https://i.redd.it/s7i5m1g62if61.png" />
          <div className="display-box">
            <h1>Todo</h1>
          </div>
        </div>
      </>
    );
  } else if (open === "notebook") {
    return (
      <div className="room button-overlay">
        <img id="roomdisplay" src="https://i.redd.it/s7i5m1g62if61.png" />
        <div className="display-box">
          <h1>Notebook</h1>
        </div>
      </div>
    );
  }
};
export default Display;
