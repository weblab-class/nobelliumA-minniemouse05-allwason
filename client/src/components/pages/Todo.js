import React, { useEffect } from "react";
import { useState } from "react";
import { nanoid } from "nanoid";

import Item from "../modules/Item.js";
import Form from "../modules/Form";
import FilterButton from "../modules/FilterButton";

import "../../utilities.css";
import "./Todo.css";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

const Todo = (props) => {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  const addTask = (name) => {
    const newTask = { id: `todo-${nanoid()}`, name: name, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompleted = (id) => {
    console.log(tasks[0]);
    const updatedTasks = tasks.map((task) => {
      if (task.id == id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    console.log(id);
    const updatedTasks = tasks.filter((task) => id !== task.id);
    setTasks(updatedTasks);
  };

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (task.id == id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  };

  // const taskList = tasks?.map((task) => (
  //   <Item
  //     id={task.id}
  //     name={task.name}
  //     completed={task.completed}
  //     key={task.id}
  //     toggleTaskCompleted={toggleTaskCompleted}
  //     deleteTask={deleteTask}
  //     editTask={editTask}
  //   />
  // ));

  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Item
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
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

  useEffect(() => {
    console.log("Todo.js");
    console.log(props.userId);
  }, []);

  return props.userId ? (
    <>
      <div className="todoapp stack-large">
        <h1>To-Do List</h1>
        <Form addTask={addTask} userId={props.userId} />
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
