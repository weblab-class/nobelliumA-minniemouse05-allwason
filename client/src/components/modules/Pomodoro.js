import "./Pomodoro.css";
import React from "react";
import { useState } from "react";
import { useRef, useEffect } from "react";
import Timer from "./Timer";
const Pomodoro = (props) => {
  const [seconds, setSeconds] = useState(600);
  const [originalSeconds, setOriginalSeconds] = useState(600);
  const [state, setState] = useState("paused");
  //https://stackoverflow.com/questions/4228356/how-to-perform-an-integer-division-and-separately-get-the-remainder-in-javascript
  //https://www.w3schools.com/jsref/jsref_tostring_number.asp
  //https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks
  const resetSeconds = () => {
    setSeconds(originalSeconds);
  };
  console.log(props.pomodoro);
  return (
    <>
      {props.pomodoro ? (
        <div className="pomodoro u-flex">
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
            <button className="p-button">
              <span class="material-symbols-outlined">pause</span>
            </button>
            <button className="p-button">
              <span class="material-symbols-outlined">stop</span>
            </button>
          </div>
          <Timer
            resetSeconds={resetSeconds}
            seconds={seconds}
            setSeconds={(arg) => {
              setSeconds(arg);
            }}
            state={state}
          />
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
