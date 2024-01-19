import React, { useEffect } from "react";
import Item from "../modules/Item.js";

import "../../utilities.css";
import "./Todo.css";

const Todo = (userId) => {
  return userId ? (
    <>
      <div> HEYYYY!!!!!!!</div>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        <Item name="Eat" id="item-1" completed />
        <Item name="Sleep" id="item-2" />
        <Item name="Repeat" id="item-3" />
      </ul>
    </>
  ) : (
    <h1>Login first</h1>
  );
};
export default Todo;
