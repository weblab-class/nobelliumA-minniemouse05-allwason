import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";

import "./Display.css";
import { Link, useNavigate } from "react-router-dom";
import Todo from "./Todo.js";
import Notebook from "./Notebook.js";
import Calendar from "./Calendar.js";
// import room from "./../../../dist/room.png";
import room from "./../../../dist/roomwcoffeeanimate2.gif";

/**
 * Parent: Room
 *
 * Proptypes
 * @param {String} open
 * @param {String} userId
 *@param {String} name
 @param totalExp
 */

const Display = (props) => {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    get("/api/todoItem", { userId: props.userId })
      .then((itemData) => {
        setItemData(itemData);
      })
      .catch((error) => {
        console.error("Error when running get for api/todoItem:", error);
      });
  });

  let content = <></>;
  if (props.open === "room") {
    content = (
      <>
        <Link to="/notebook">
          <button className="room-button" id="notebook">
            <div className="button-text">notebook</div>
          </button>
        </Link>
        <Link to="/todo">
          <button className="room-button" id="todo">
            <div className="button-text">to-do list</div>
          </button>
        </Link>

        <Link to="/calendar">
          <button className="room-button" id="calendar">
            <div className="button-text">calendar</div>
          </button>
        </Link>

        <button className="room-button" id="pomodoro" onClick={props.togglePomodoro}>
          <div className="button-text">pomodoro</div>
        </button>
      </>
    );
  } else if (props.open === "todo") {
    content = (
      <div className="width-todo-list display-box u-flex-justifyCenter u-flex-alignCenter">
        <Todo
          userId={props.userId}
          tasks={itemData}
          name={props.name}
          totalExp={props.totalExp}
          setTasks={setItemData}
        />
      </div>
    );
  } else if (props.open === "notebook") {
    content = (
      <div className="notebook display-box u-flex">
        <Notebook userId={props.userId} />
      </div>
    );
  } else if (props.open === "calendar") {
    content = (
      <div className="gcal display-box u-flex">
        <Calendar userId={props.userId} />
      </div>
    );
  }
  return (
    <>
      <div className="room button-overlay">
        <img id="roomdisplay" src={room} />
        {content}
      </div>
    </>
  );
};

export default Display;
