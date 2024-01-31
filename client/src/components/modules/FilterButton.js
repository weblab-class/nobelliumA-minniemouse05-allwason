// cited: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started

import React, { useEffect } from "react";
import "../../utilities.css";
import "./FilterButton.css";

function FilterButton(props) {
  const color = props.isPressed ? "#bddeb3" : "#eeface";
  return (
    <button
      type="button"
      className="todo-border-button"
      style={{ "background-color": color }}
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
