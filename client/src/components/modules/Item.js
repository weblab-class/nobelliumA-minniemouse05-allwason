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
      .then(() => {
        if (props.completed === false) {
          post("/api/addExp", { userId: props.userId, amtToUpdate: 5 }).then(() => {});
        } else {
          post("/api/addExp", { userId: props.userId, amtToUpdate: -5 }).then(() => {});
        }
      })
      .catch((error) => {
        console.error("Error fetching updateItemCheck:", error);
        // Handle the error here
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
        <button type="button" className="" onClick={() => setEditing(false)}>
          Cancel
        </button>
        <button type="submit" className="" onClick={updateName}>
          Save
        </button>
      </div>
    </form>
  );
  useEffect(() => {
    console.log("item.js props._id", props._id);
  }, []);

  const viewTemplate = (
    <div className="todo-container">
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
        <label className="" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="checkbox-container">
        <button type="button" className="" onClick={() => setEditing(true)}>
          Edit
        </button>
        <button type="button" className="" onClick={() => props.deleteTask(props._id)}>
          Delete
        </button>
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
