import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Room.css";
import "./Display.css";
import { Link, useNavigate } from "react-router-dom";
import Todo from "./Todo.js";

const Display = ({ userId, open }) => {
  const itemData = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false },
  ];

  console.log(open);

  if (open === "room") {
    return (
      <div className="room button-overlay">
        <img id="roomdisplay" src="https://i.redd.it/s7i5m1g62if61.png" />
        <Link to="/notebook">
          <button className="room-button" id="notebook">
            notebook
          </button>
        </Link>
        <Link to="/todo">
          <button className="room-button" id="todo">
            to-do list
          </button>
        </Link>
      </div>
    );
  } else if (open === "todo") {
    return (
      <>
        <div className="room button-overlay">
          <img id="roomdisplay" src="https://i.redd.it/s7i5m1g62if61.png" />
          <div className="display-box">
            <Todo userId={userId} tasks={itemData} />
          </div>
        </div>
      </>
    );
  } else if (open === "notebook") {
    return (
      <div className="room button-overlay">
        <img id="roomdisplay" src="https://i.redd.it/s7i5m1g62if61.png" />
        <div className="display-box">
          <Notebook userId={userId} />
        </div>
      </div>
    );
  }
};
export default Display;
