import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Room.css";
import { Link } from "react-router-dom";
const Display = (props) => {
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
};
export default Display;
