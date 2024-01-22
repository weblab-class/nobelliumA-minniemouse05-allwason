import React, { useEffect } from "react";
import { useState } from "react";
import { post } from "../../utilities";
import "../../utilities.css";
import "./Form.css";

/**
 * Parent: Todo
 *
 * Proptypes
 * @param {String} userId
 * @param {Function} addTask
 */

const Form = (props) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.addTask(name);
    setName("");
  };

  const submitTodo = () => {
    console.log("Form.js / submitTodo userID, _id", props.userId);
    post("/api/todoItem", {
      userId: props.userId,
      name: name,
      completed: false,
    }).then(console.log("posted"));
    console.log("submitTodo");
    console.log(name);
    // console.log(completed);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="">
        <label htmlFor="new-todo-input" className="">
          What needs to be done?
        </label>
      </h2>
      <div className="align">
        <input
          className="input-box"
          type="text"
          id="new-todo-input"
          name="text"
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit" className="add_button" onClick={submitTodo}>
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
