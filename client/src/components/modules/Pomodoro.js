import "./Pomodoro.css";
import React from "react";
import { useState } from "react";
import { useRef, useEffect } from "react";
import Timer from "./Timer";

import "../../utilities.css";
const Pomodoro = (props) => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [workSeconds, setWorkSeconds] = useState(25 * 60);
  const [breakSeconds, setBreakSeconds] = useState(5 * 60);
  const [state, setState] = useState("paused");
  const [mode, setMode] = useState("work");
  const [bannerColor, setBannerColor] = useState("#FF6978");
  //https://stackoverflow.com/questions/4228356/how-to-perform-an-integer-division-and-separately-get-the-remainder-in-javascript
  //https://www.w3schools.com/jsref/jsref_tostring_number.asp
  //https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks

  const changeMode = () => {
    if (mode == "work") {
      setMode("break");
      setBannerColor("#B1EDE8");
    } else {
      setMode("work");
      setBannerColor("#FF6978");
    }
  };
  return (
    <>
      {props.pomodoro ? (
        <div className="pomodoro u-flex banner" style={{ background: bannerColor }}>
          <div className="buttons">
            <button className="p-button">
              <span
                class="material-symbols-outlined"
                onClick={() => {
                  setState("start");
                }}
              >
                play_arrow
              </span>
            </button>
            <button
              className="p-button"
              onClick={() => {
                setState("paused");
                console.log(state);
              }}
            >
              <span class="material-symbols-outlined">pause</span>
            </button>
            <button
              className="p-button"
              onClick={() => {
                setState("reset");
                console.log(state);
              }}
            >
              <span class="material-symbols-outlined">stop</span>
            </button>
          </div>

          <Timer
            seconds={seconds}
            current_state={state}
            mode={mode}
            changeMode={changeMode}
            workSeconds={workSeconds}
            breakSeconds={breakSeconds}
          />
          <h1 className="mode">{mode}</h1>
          <button className="hide-button" onClick={props.togglePomodoro}>
            hide
          </button>
          <div></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Pomodoro;
