import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Item.css";

const Item = (props) => {
  return (
    <li className="">
      <div className="">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <span className="">{props.name} </span>
      </div>

      <div className="">
        <button type="" className="">
          Edit <span className="">{props.name}</span>
        </button>
        <button type="button" className="" onClick={() => props.deleteTask(props.id)}>
          Delete <span className="">{props.name} </span>
        </button>
      </div>
    </li>
  );
};

export default Item;
