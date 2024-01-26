import React, { useEffect } from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import { get, post } from "../../utilities.js";

import Item from "../modules/Item.js";
import Form from "../modules/Form";
import FilterButton from "../modules/FilterButton";
import ExpTracker from "../modules/ExpTracker";

import "../../utilities.css";
import "./Todo.css";

/**
 * Parent: Display
 *
 * Proptypes
 * @param {String} userId
 * @param {Array of objects} tasks
 * @param {String} name
 * @param {Number} totalExp
 * 
  //   { id: "todo-0", name: "Eat", completed: true },
  //   { id: "todo-1", name: "Sleep", completed: false },
  //   { id: "todo-2", name: "Repeat", completed: false },
  // ]
 */

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const Todo = (props) => {
  // const [itemData, setItemData] = useState([]);
  // //console.log("userId");
  // //console.log(props.userId);

  // useEffect(() => {
  //   console.log("useEffect todo.js", props.userId);
  //   //console.log("in display.js");
  //   //console.log(props.userId);
  //   get("/api/todoItem", { userId: props.userId }).then((itemData) => {
  //     //console.log("useEffect");
  //     //console.log(props.userId);
  //     setItemData(itemData);
  //   });
  // });

  // const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const [tempEarnedExp, settempEarnedExp] = useState(0);

  const addTask = (name) => {
    //const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    const newTask = { _id: `todo-${nanoid()}`, name: name, completed: false };
    props.setTasks([...props.tasks, newTask]);
  };

  const toggleTaskCompleted = (_id) => {
    console.log(props.tasks);
    const updatedTasks = props.tasks.map((task) => {
      if (task._id == _id) {
        if (task.completed == false) {
          settempEarnedExp(tempEarnedExp + 5);
        }
        if (task.completed == true) {
          settempEarnedExp(tempEarnedExp - 5);
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    props.setTasks(updatedTasks);
  };

  const deleteTask = (_id) => {
    console.log("Todo.js deleteTask _id", _id);
    const updatedTasks = props.tasks.filter((task) => _id !== task._id);
    props.setTasks(updatedTasks);

    post("/api/deleteItem", { _id: _id, userId: props.userId }).then(console.log("delete"));
    // console.log(completed);
  };

  const editTask = (_id, newName) => {
    const editedTaskList = props.tasks.map((task) => {
      if (task._id == _id) {
        return { ...task, name: newName };
      }
      return task;
    });
    props.setTasks(editedTaskList);
  };

  const taskList = props.tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Item
        userId={props.userId}
        _id={task._id}
        name={task.name}
        completed={task.completed}
        key={task._id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const congratsMessage = taskList.length !== 0 ? " " : "Hip hip hooray!";

  return props.userId ? (
    <>
      <div className="todoapp stack-large">
        <h1>To-Do List</h1>
        <ExpTracker
          userId={props.userId}
          name={props.name}
          totalExp={props.totalExp}
          tempEarnedExp={tempEarnedExp}
        />
        <Form addTask={addTask} userId={props.userId} setTasks={props.setTasks} />
        <div className="filters btn-group stack-exception">{filterList}</div>
        <h2 id="list-heading">{headingText}</h2>
        <h2 id="list-heading">{congratsMessage}</h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </div>
    </>
  ) : (
    <h1>Login first</h1>
  );
};
export default Todo;
