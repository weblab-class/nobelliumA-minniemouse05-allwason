import React, { useEffect } from "react";
import { useState } from "react";
import { get, post } from "../../utilities";
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

  const submitTodo = () => {
    if (name === "") {
      alert("Enter a task description!");
    } else {
      setName(name);
      post("/api/todoItem", {
        userId: props.userId,
        name: name,
        completed: false,
      }).then((result) => {
        setName("");

        console.log(result);
        props.addTask({ _id: result._id, userId: props.userId, name: name, completed: false });
      });
    }
  };

  return (
    <div>
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
          value={name}
        />
        <button type="submit" className="add_button todo-border-button" onClick={submitTodo}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Form;
