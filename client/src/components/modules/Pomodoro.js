import "./Pomodoro.css";
import React from "react";
import { useState } from "react";
const Pomodoro = (props) => {
  const [seconds, setSeconds] = useState(1);
  const [timer, setTimer] = useState(undefined);
  //https://stackoverflow.com/questions/4228356/how-to-perform-an-integer-division-and-separately-get-the-remainder-in-javascript
  //https://www.w3schools.com/jsref/jsref_tostring_number.asp
  let remainder;
  let time;
  const runTimer = () => {
    setTimer(setInterval(minusSecond, 1000));
  };
  const minusSecond = () => {
    console.log(seconds);
    if (seconds > 0) {
      setSeconds(seconds - 1);
      remainder = (seconds % 60).toString();
      if (remainder.length == 1) {
        remainder = "0" + remainder;
      }
      time = Math.floor(seconds / 60).toString() + ":" + remainder;
    } else {
      alert("timer is done");
      clearInterval(timer);
    }
  };
  return (
    <>
      {props.pomodoro ? (
        <div className="pomodoro u-flex">
          <div className="buttons">
            <button className="p-button">
              <span class="material-symbols-outlined" onClick={runTimer}>
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
          <h1 className="time">{time}</h1>
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
