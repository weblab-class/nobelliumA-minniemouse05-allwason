import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../utilities";
import room from "./../../../dist/room.png";
import "../../utilities.css";
import "./Game.css";
const Game = (props) => {
  const [locationX, setLocationX] = useState(0);
  const [keyDown, setkeyDown] = useState(undefined);
  const intervalRef = useRef(null);
  const [leftBound, setLeftBound] = useState(-1200);
  const [todo, setTodo] = useState(false);
  const handleUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight")
      intervalRef.current = clearInterval(intervalRef.current);
  };
  const animateLeft = () => {
    intervalRef.current = setInterval(() => {
      setLocationX((previousLocation) => previousLocation + 1);
    }, 1000 / (60 * 10));
  };

  const handleInput = (e, locX) => {
    console.log("widths", image.width, locX);
    const animateRight = () => {
      setLocationX((previousLocation) => previousLocation - 1);
    };
    if (!intervalRef.current) {
      if (e.key === "ArrowLeft") {
        if (locX >= leftBound && locX <= image.width) {
          animateLeft();
        }
      } else if (e.key === "ArrowRight") {
        if (locX >= leftBound && locX <= leftBound + image.width) {
          intervalRef.current = setInterval(() => {
            animateRight();
          }, 1000 / (60 * 10));
        } else {
          intervalRef.current = clearInterval(intervalRef.current);
          console.log("clearing interval", intervalRef.current);
        }
      }
    }
  };

  useEffect(() => {}, [keyDown]);
  useEffect(() => {
    init();
    if (locationX < -149 && locationX > -430) {
      console.log("todo");
      setTodo(true);
    } else {
      setTodo(false);
    }
  }, [locationX]);
  const canvasRef = useRef(null);
  const image = new Image();
  //https://developer.mozilla.org/en-US/docs/Web/APhide%20imI/CanvasRenderingContext2D/drawImage
  //https://codesandbox.io/p/sandbox/resizing-canvas-with-react-hooks-gizc5?file=%2Fsrc%2Findex.js%3A34%2C18-34%2C68
  // Hard code the image source
  image.src = room;

  function init() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (locationX > leftBound + image.width) {
      setLocationX(leftBound + image.width);
    }
    if (locationX < leftBound) {
      setLocationX(leftBound);
    }
    ctx.drawImage(image, locationX, 0, image.width, window.innerHeight);
    ctx.drawImage(
      bear,
      canvas.width / 2,
      canvas.height - canvas.height / 5,
      canvas.height / 5,
      canvas.height / 5
    );
    /*if (todo) {
      console.log("inside");
      ctx.rect(locationX, 0, 100, 100);
    }*/
    // Ensure the image is loaded before drawing it on the canvas
    // Set the canvas size to match the image size
  }
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const handleResize = (e) => {
      //ctx.canvas.height = image.height;
      canvas.width = window.innerWidth;
      canvas.height = image.height;
      init();
    };
    const keyDownEvent = (e) => {
      handleInput(e, locationX);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    window.addEventListener("keydown", keyDownEvent);
    window.addEventListener("keyup", handleUp);
    // remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", keyDownEvent);
      window.removeEventListener("resize", handleResize);
    };
  }, [locationX]);
  /*<img src={room} width="500" />*/
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <div id="canvas-div">
        <canvas id="canvas" ref={canvasRef} alt="room" width="500" height="500">
          <img id="room" src={room} />
          <img
            id="bear"
            src="https://static.vecteezy.com/system/resources/previews/027/517/647/original/pixel-art-cute-fat-bear-character-2-png.png"
          />
        </canvas>
        {todo ? <button className="todo">to-do list</button> : <></>}
      </div>
    </>
  );
};
export default Game;
