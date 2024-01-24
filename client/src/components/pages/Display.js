import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";

import "./Display.css";
import { Link, useNavigate } from "react-router-dom";
import Todo from "./Todo.js";
import Notebook from "./Notebook.js";
import room from "./../../../dist/room.png";

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
  const [pomodoro, setPomodoro] = useState(false);
  const togglePomodoro = () => {
    setPomodoro(!pomodoro);
  };
  // const [totalExp, setTotalExp] = useState(0);

  // useEffect(() => {
  //   console.log("Room.js useEffect", props.name, props.userId);
  //   post("/api/updateExp", { name: props.name, userId: props.userId, totalExp: 0 });
  // }, []);

  // const itemData = [
  //   { id: "todo-0", name: "Eat", completed: true },
  //   { id: "todo-1", name: "Sleep", completed: false },
  //   { id: "todo-2", name: "Repeat", completed: false },
  // ];

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

  // useEffect(() => {
  //   //console.log("inside of useEffect in userprofiles display.js");
  //   get("/api/exp", { userId: props.userId })
  //     .then((userprofiles) => {
  //       //console.log("userprofiles display.js", userprofiles.totalExp);
  //       setTotalExp(userprofiles.totalExp);
  //     })
  //     .catch((error) => {
  //       console.error("Error when running get for api/exp:", error);
  //     });
  // }, []);
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
        <button className="room-button" id="pomodoro" onClick={props.togglePomodoro}>
          <div className="button-text">pomodoro</div>
        </button>
      </>
    );
  } else if (props.open === "todo") {
    content = (
      <div className="width-todo-list display-box u-flex-justifyCenter u-flex-alignCenter">
        <Todo userId={props.userId} tasks={itemData} name={props.name} totalExp={props.totalExp} />
      </div>
    );
  } else if (props.open === "notebook") {
    content = (
      <div className="notebook display-box u-flex">
        <Notebook userId={props.userId} />
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
