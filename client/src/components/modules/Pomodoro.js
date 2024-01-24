import "./Pomodoro.css";
import React from "react";
const Pomodoro = (props) => {
  return (
    <div className="pomodoro u-flex">
      <div className="buttons">
        <button className="p-button">
          <span class="material-symbols-outlined">play_arrow</span>
        </button>
        <button className="p-button">
          <span class="material-symbols-outlined">pause</span>
        </button>
        <button className="p-button">
          <span class="material-symbols-outlined">stop</span>
        </button>
      </div>
      <h1 className="time">10:00</h1>
      <button className="hide-button" onClick={props.togglePomodoro}>
        hide
      </button>
      <div></div>
    </div>
  );
};
export default Pomodoro;
