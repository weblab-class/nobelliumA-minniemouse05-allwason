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
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   //props.addTask(name);
  //   setName("");
  // };

  const submitTodo = () => {
    console.log("Form.js / submitTodo userID, _id", props.userId);
    post("/api/todoItem", {
      userId: props.userId,
      name: name,
      completed: false,
    }).then(() => {
      setName("");
      console.log("posted");
      get("/api/todoItem", { userId: props.userId })
        .then((itemData) => {
          props.setTasks(itemData);
          console.log("props have set tasks");
        })
        .catch((error) => {
          console.error("Error when running get for api/todoItem:", error);
        });
    });
    console.log("submitTodo");
    console.log(name);
    // console.log(completed);
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
        <button type="submit" className="add_button" onClick={submitTodo}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Form;
