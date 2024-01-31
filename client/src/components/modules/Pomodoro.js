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
  const workColor = "#B1EDE8";
  const breakColor = "#FF6978";
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [buttonColor, setButtonColor] = useState("white");
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  //https://stackoverflow.com/questions/4228356/how-to-perform-an-integer-division-and-separately-get-the-remainder-in-javascript
  //https://www.w3schools.com/jsref/jsref_tostring_number.asp
  //https://stackoverflow.com/questions/57137094/implementing-a-countdown-timer-in-react-with-hooks
  const handleChange = (e) => {
    if (!isNaN(Number(e.target.value))) setValue(e.target.value);
  };
  const handleChange1 = (e) => {
    if (!isNaN(Number(e.target.value))) setValue1(e.target.value);
  };
  useEffect(() => {
    setState("reset");
  }, [props.userId]);
  const changeMode = () => {
    if (mode == "work") {
      setMode("break");
      setBannerColor(workColor);
    } else {
      setMode("work");
      setBannerColor(breakColor);
    }
  };
  useEffect(() => {
    if (settingsOpen) {
      setButtonColor("white");
    } else {
      setButtonColor("black");
    }
  }, [settingsOpen]);
  const changeTime = () => {
    if (value !== "") {
      setWorkSeconds(60 * Number(value));
    }
    if (value1 !== "") {
      setBreakSeconds(60 * Number(value1));
    }
  };
  let timer = (
    <Timer
      seconds={seconds}
      current_state={state}
      mode={mode}
      changeMode={changeMode}
      workSeconds={workSeconds}
      breakSeconds={breakSeconds}
    />
  );
  return (
    <>
      {props.pomodoro && settingsOpen ? (
        <>
          <div className="settings-menu">
            <div className="u-flex entry">
              <h1 className="pr-15">work: </h1>
              <input value={value} onChange={handleChange}></input>
              <h1 className="pl-15"> minutes</h1>
            </div>
            <div className="u-flex entry">
              <h1 className="pr-15">break:</h1>
              <input value={value1} onChange={handleChange1}></input>
              <h1 className="pl-15"> minutes</h1>
            </div>
            <h1>(press ok and then reset to update timer)</h1>
            <div className="ok-button u-flex">
              <button className="pomodoro-button-styling" onClick={changeTime}>ok</button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div
        className="pomodoro u-flex banner"
        style={{ background: bannerColor, display: props.pomodoro ? "flex" : "none" }}
      >
        <div className="buttons">
          <button className="p-button">
            <span
              className="material-symbols-outlined"
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
            <span className="material-symbols-outlined">pause</span>
          </button>
          <button
            className="p-button"
            onClick={() => {
              setState("reset");
              console.log(state);
            }}
          >
            <span className="material-symbols-outlined">stop</span>
          </button>
        </div>

        {timer}
        <button
        className='pomodoro-button-styling'
          onClick={() => {
            changeMode();
          }}
        >
          {mode}
        </button>
        <button className="pomodoro-button-styling  hide-button" onClick={props.togglePomodoro}>
          hide
        </button>

        <button
          style={{ color: buttonColor }}
          className="p-button settings"
          onClick={() => {
            setSettingsOpen(!settingsOpen);
          }}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </>
  );
};

export default Pomodoro;
