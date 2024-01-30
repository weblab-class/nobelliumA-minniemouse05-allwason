import React, { useRef, useEffect, useState } from "react";
import "./Timer.css";

const Timer = ({ workSeconds, breakSeconds, changeMode, mode, seconds, current_state }) => {
  const interval = useRef(null);
  const [time, setTime] = useState("00:00");
  const [remain, setRemain] = useState(seconds);

  useEffect(() => {
    const handleInterval = () => {
      if (current_state === "start") {
        interval.current = setInterval(minusSecond, 1000);
        if (mode === "work") {
          setRemain(workSeconds);
          alert("Time to work!");
        } else {
          setRemain(breakSeconds);
          alert("Time to take a break!");
        }
      } else if (current_state === "paused") {
        clearInterval(interval.current);
      } else if (current_state === "reset") {
        clearInterval(interval.current);
        if (mode === "work") {
          setRemain(workSeconds);
        } else {
          setRemain(breakSeconds);
        }
        convertTime();
      }
    };

    handleInterval();
  }, [mode, workSeconds, breakSeconds, current_state]);

  useEffect(() => {
    convertTime();
  }, [remain]);

  const convertTime = () => {
    let remainder = (remain % 60).toString();
    if (remainder.length === 1) {
      remainder = "0" + remainder;
    }
    setTime(Math.floor(remain / 60).toString() + ":" + remainder);
  };

  const minusSecond = () => {
    if (remain > 0) {
      setRemain((prev) => prev - 1);
    } else {
      clearInterval(interval.current);
      changeMode();
    }
  };

  return <h1 className="time-text">{time}</h1>;
};

export default Timer;
