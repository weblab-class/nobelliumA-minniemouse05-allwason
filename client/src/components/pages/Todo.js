import React, { useEffect } from "react";

import "../../utilities.css";
import "./Todo.css";
const Todo = (userId) => {
  return userId ? (
    <div>
      <h1>Todo</h1>
    </div>
  ) : (
    <h1>Login first</h1>
  );
};
export default Todo;
