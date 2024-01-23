import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./Room.css";
import "./Display.css";
import { Link, useNavigate } from "react-router-dom";
import Todo from "./Todo.js";
import Notebook from "./Notebook.js";

/**
 * Parent: Room
 *
 * Proptypes
 * @param {String} open
 * @param {String} userId
 *@param {String} name
 */

const Display = (props) => {
  const [totalExp, setTotalExp] = useState(0);

  useEffect(() => {
    console.log("Room.js useEffect", props.name, props.userId);
    post("/api/updateExp", { name: props.name, userId: props.userId, totalExp: 0 });
  }, []);

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

  useEffect(() => {
    //console.log("inside of useEffect in userprofiles display.js");
    get("/api/exp", { userId: props.userId })
      .then((userprofiles) => {
        //console.log("userprofiles display.js", userprofiles.totalExp);
        setTotalExp(userprofiles.totalExp);
      })
      .catch((error) => {
        console.error("Error when running get for api/exp:", error);
      });
  }, []);

  if (props.open === "room") {
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
  } else if (props.open === "todo") {
    return (
      <>
        <div className="room button-overlay">
          <img id="roomdisplay" src="https://i.redd.it/s7i5m1g62if61.png" />
          <div className="width-todo-list display-box u-flex-justifyCenter u-flex-alignCenter">
            <Todo userId={props.userId} tasks={itemData} name={props.name} totalExp={totalExp} />
          </div>
        </div>
      </>
    );
  } else if (props.open === "notebook") {
    return (
      <div className="room button-overlay">
        <img id="roomdisplay" src="https://i.redd.it/s7i5m1g62if61.png" />
        <div className="notebook display-box u-flex">
          <Notebook userId={props.userId} />
        </div>
      </div>
    );
  }
};
export default Display;
