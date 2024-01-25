import React from "react";
import { useRef, useEffect, useState } from "react";
import "./Timer.css";
const Timer = ({ resetSeconds, seconds, setSeconds, state }) => {
  const intervalRef = useRef();
  const [time, setTime] = useState("00:00");
  useEffect(() => {
    console.log(state);
    if (state === "start") {
      intervalRef.current = setInterval(minusSecond, 1000);
    } else if (state === "paused") {
      clearInterval(intervalRef);
    } else if (state === "reset") {
      resetSeconds();
    }
  }, [state]);
  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(intervalRef);
    }
  });

  const minusSecond = () => {
    console.log(seconds);
    if (seconds > 0) {
      setSeconds(seconds - 1);
      console.log(seconds - 1);
      let remainder = 0;
      remainder = (seconds % 60).toString();
      if (remainder.length == 1) {
        remainder = "0" + remainder;
      }
      setTime(Math.floor(seconds / 60).toString() + ":" + remainder);
    }
  };
  return <h1 className="time-text">{time}</h1>;
};
export default Timer;
