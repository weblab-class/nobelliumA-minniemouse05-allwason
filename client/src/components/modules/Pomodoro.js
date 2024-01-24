import "./Pomodoro.css";
import React from "react";
const Pomodoro = () => {
  return (
    <div>
      <h1>Pomodoro</h1>
      <div className="buttons u-flex">
        <button>Start</button>
        <button>Pause</button>
        <button>Reset</button>
      </div>
    </div>
  );
};
export default Pomodoro;
