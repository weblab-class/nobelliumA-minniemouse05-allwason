import React from "react";
import { useRef, useEffect, useState } from "react";
import "./Timer.css";
const Timer = ({ workSeconds, breakSeconds, changeMode, mode, seconds, current_state }) => {
  const interval = useRef(null);
  const [time, setTime] = useState("00:00");

  const [remain, setRemain] = useState(seconds);
  let second = remain;
  //second debugging: https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately
  useEffect(() => {
    if (mode === "work") {
      setRemain(workSeconds);
      second = workSeconds;
      clearInterval(interval.current);
      if (current_state === "start") {
        interval.current = setInterval(minusSecond, 1000);
      }
    } else {
      setRemain(breakSeconds);
      second = breakSeconds;
      clearInterval(interval.current);
      if (current_state === "start") {
        interval.current = setInterval(minusSecond, 1000);
      }
    }
  }, [mode]);
  useEffect(() => {
    if (current_state === "paused") {
      console.log("should clear interval");
      console.log(second);
      clearInterval(interval.current);
      console.log(interval);
      console.log(remain);
      second = remain;
    } else if (current_state === "reset") {
      clearInterval(interval.current);
      if (mode === "work") {
        setRemain(workSeconds);
      } else {
        setRemain(breakSeconds);
      }

      convertTime();
    } else if (current_state === "start") {
      console.log("started");
      console.log(remain);
      interval.current = setInterval(minusSecond, 1000);
    }
  }, [current_state]);
  useEffect(() => {
    convertTime();
  }, [remain]);
  const convertTime = () => {
    let remainder = 0;
    remainder = (second % 60).toString();
    if (remainder.length == 1) {
      remainder = "0" + remainder;
    }
    setTime(Math.floor(second / 60).toString() + ":" + remainder);
  };
  const minusSecond = () => {
    //console.log(interval);
    if (second > 0) {
      second -= 1;

      setRemain(second);
    } else {
      clearInterval(interval.current);
      changeMode();
    }
  };
  return <h1 className="time-text">{time}</h1>;
};
export default Timer;
