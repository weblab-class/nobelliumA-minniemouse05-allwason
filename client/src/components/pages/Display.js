import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Room.css";
import "./Display.css";
import { Link, useNavigate } from "react-router-dom";
import Todo from "./Todo.js";
import Notebook from "./Notebook.js";
import { get } from "../../utilities";

const Display = (props) => {
  // const itemData = [
  //   { id: "todo-0", name: "Eat", completed: true },
  //   { id: "todo-1", name: "Sleep", completed: false },
  //   { id: "todo-2", name: "Repeat", completed: false },
  // ];

  //console.log(props.open);
  const [itemData, setItemData] = useState([]);
  //console.log("userId");
  //console.log(props.userId);

  useEffect(() => {
    //console.log("useEffect Display.js", props._id);
    //console.log("in display.js");
    //console.log(props.userId);
    get("/api/todoItem", { userId: props.userId }).then((itemData) => {
      //console.log("useEffect");
      //console.log(props.userId);
      setItemData(itemData);
    });
  });

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
            <Todo userId={props.userId} tasks={itemData} />
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
