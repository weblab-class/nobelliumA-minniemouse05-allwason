import React, { useEffect } from "react";
import "../../utilities.css";
import "./FilterButton.css";

function FilterButton(props) {
  return (
    <button
      type="button"
      className="todo-border-button"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
