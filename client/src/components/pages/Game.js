import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../utilities";
import room from "./../../../dist/room.png";
import "../../utilities.css";
import "./Game.css";
const Game = (props) => {
  const handleInput = (e) => {
    if (e.key === "ArrowUp") {
      console.log("up");
    } else if (e.key === "ArrowDown") {
      console.log("down");
    } else if (e.key === "ArrowLeft") {
      console.log("left");
    } else if (e.key === "ArrowRight") {
      console.log("right");
    }
  };
  const draw = () => {
    const canvas = document.getElementById("room");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "rgb(200 0 0)";
      ctx.fillRect(10, 10, 50, 50);
      //ctx.drawImage(<img src={room} />, 500, 500);
      ctx.fillStyle = "rgb(0 0 200 / 50%)";
      ctx.fillRect(30, 30, 50, 50);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleInput);
    window.addEventListener("load", draw);
    // remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleInput);
    };
  }, []);
  useEffect(() => {
    draw();
  }, []);
  const canvasRef = useRef(null);
  /*<img src={room} width="500" />*/
  return (
    <>
      <div>
        <canvas id="room" alt="room" width="500" height="500">
          <image id="room" src={room} />
        </canvas>
      </div>
    </>
  );
};
export default Game;
