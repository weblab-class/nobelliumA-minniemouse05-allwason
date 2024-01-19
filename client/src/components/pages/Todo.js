import React, { useEffect } from "react";
import { useState } from "react";
import { nanoid } from "nanoid";

import Item from "../modules/Item.js";
import Form from "../modules/Form";
import FilterButton from "../modules/FilterButton";

import "../../utilities.css";
import "./Todo.css";

const Todo = (props) => {
  const [tasks, setTasks] = useState(props.tasks);

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

  const taskList = tasks?.map((task) => (
    <Item
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  return props.userId ? (
    <>
      <div className="todoapp stack-large">
        <h1>To-Do List</h1>
        <Form addTask={addTask} />
        <div className="filters btn-group stack-exception">
          <FilterButton />
          <FilterButton />
          <FilterButton />
        </div>
        <h2 id="list-heading">{headingText}</h2>
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
