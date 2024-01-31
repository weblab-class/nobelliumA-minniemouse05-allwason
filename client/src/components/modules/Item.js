// cited: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started

import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "./Item.css";

/**
 * Parent: Todo
 *
 * Proptypes
 * @param {String} _id
 * @param {String} userId
 * @param {Boolean} completed
 * @param {String} key
 * @param {Function} toggleTaskCompleted
 * @param {Function} deleteTask
 * @param {Function} editTask
 */

const Item = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props._id, newName);
    setNewName("");
    setEditing(false);
  }

  const updateCheck = () => {
    post("/api/updateItemCheck", { _id: props._id, completed: !props.completed })
      .then((response) => {
        //console.log(response);
        if (props.completed === false) {
          post("/api/addExp", { userId: props.userId, amtToUpdate: 5 }).then(
            props.setTotalExp(props.totalExp + 5)
          );
        } else {
          post("/api/addExp", { userId: props.userId, amtToUpdate: -5 })
            .then(() => {})
            .then(props.setTotalExp(props.totalExp - 5));
        }
      })
      .catch((error) => {
        //console.error("Error fetching updateItemCheck:", error);
        //console.log(props);
      });
  };

  const updateName = () => {
    post("/api/updateItemName", { _id: props._id, name: newName }).then();
  };

  const editingTemplate = (
    <form className="" onSubmit={handleSubmit}>
      <div className="">
        <label className="" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          _id={props._id}
          className="edit-input-box"
          type="text"
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="">
        <button type="button" className="todo-border-button" onClick={() => setEditing(false)}>
          Cancel
        </button>
        <button type="submit" className="todo-border-button" onClick={updateName}>
          Save
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="todo-container">
      <div className="item-entry-container">
        <div className="checkbox-container">
          <input
            className="checkbox-style"
            _id={props._id}
            type="checkbox"
            defaultChecked={props.completed}
            onClick={updateCheck}
            onChange={() =>
              props.toggleTaskCompleted(props._id, props.userId, props.completed, props.name)
            }
          />
          <label className="pl-20 item-name" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="item-button-container">
          <button type="button" className="todo-border-button" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button
            type="button"
            className="todo-border-button"
            onClick={() => props.deleteTask(props._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    </>
  );
};

export default Item;
