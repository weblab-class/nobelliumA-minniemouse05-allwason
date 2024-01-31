import React, { useEffect } from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
import { get, post } from "../../utilities.js";

import Item from "../modules/Item.js";
import Form from "../modules/Form";
import FilterButton from "../modules/FilterButton";
import ExpTracker from "../modules/ExpTracker";
import ExitButton from "../modules/ExitButton";

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
 * @param {Function} setTotalExp
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

const Todo = ({ tasks, setTasks, userId, name, totalExp, setTotalExp }) => {
  console.log(setTotalExp);
  useEffect(() => {
    get("/api/todoItem", { userId: userId })
      .then((itemData) => {
        setTasks(itemData);
        console.log(itemData);
      })
      .catch((error) => {
        console.error("Error when running get for api/todoItem:", error);
      });
  }, []);
  // const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const [tempEarnedExp, settempEarnedExp] = useState(0);

  const addTask1 = (task) => {
    setTasks((arr) => [...tasks, task]);
  };
  useEffect(() => {
    console.log(taskList);
  });
  const toggleTaskCompleted = async (_id, userId, completed, name) => {
    console.log(tasks);

    console.log(completed);
    const updatedTasks = tasks.map((task) => {
      if (task._id == _id) {
        if (task.completed === false) {
          settempEarnedExp(tempEarnedExp + 5);
        }
        if (task.completed === true) {
          settempEarnedExp(tempEarnedExp - 5);
        }

        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = async (_id) => {
    console.log("Todo.js deleteTask _id", _id);

    let x = await post("/api/deleteItem", { _id: _id, userId: userId });
    const updatedTasks = tasks.filter((task) => _id !== task._id);
    setTasks(updatedTasks);
  };
  const editTask = (_id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (task._id == _id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Item
        userId={userId}
        _id={task._id}
        name={task.name}
        completed={task.completed}
        key={task._id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        totalExp={totalExp}
        setTotalExp={setTotalExp}
      />
    ));
  console.log(taskList);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const congratsMessage = taskList.length !== 0 ? " " : "Hip hip hooray!";

  return userId ? (
    <>
      <div className="todoapp stack-large">
        <ExitButton />
        <h1>To-Do List</h1>
        <ExpTracker userId={userId} name={name} totalExp={totalExp} tempEarnedExp={tempEarnedExp} />
        <Form addTask={addTask1} userId={userId} setTasks={setTasks} />
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