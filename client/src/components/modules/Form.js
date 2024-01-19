import React, { useEffect } from "react";
import { useState } from "react";

import "../../utilities.css";
import "./Form.css";

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
        <button type="submit" className="add_button">
          Add
        </button>
      </div>
    </form>
  );
};

export default Form;
