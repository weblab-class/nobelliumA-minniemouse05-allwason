import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../utilities";
import room from "./../../../dist/room.png";
import "../../utilities.css";
import "./Game.css";
const Game = (props) => {
  const [locationX, setLocationX] = useState(0);
  const [keyDown, setkeyDown] = useState(undefined);
  const intervalRef = useRef();
  const velX = 5;
  const aInterval = 50;
  const handleInput = (e) => {
    if (e.key === "ArrowLeft") {
      if (!intervalRef.current) intervalRef.current = setInterval(animateLeft, aInterval);

      console.log("left");
    } else if (e.key === "ArrowRight") {
      if (!intervalRef.current) intervalRef.current = setInterval(animateRight, aInterval);
      console.log("right");
    }
  };
  const animateLeft = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setLocationX((previousLocation) => previousLocation + velX);
    ctx.drawImage(image, locationX, 0);
  };
  const animateRight = () => {
    //console.log(image.width);

    if (locationX >= 0 && locationX < image.width) {
      console.log(locationX);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      setLocationX((previousLocation) => previousLocation - velX);
      ctx.drawImage(image, locationX, 0);
    } else {
      clearInterval(intervalRef.current);
    }
  };

  const canvasRef = useRef(null);
  const image = new Image();
  //https://developer.mozilla.org/en-US/docs/Web/APhide%20imI/CanvasRenderingContext2D/drawImage
  //https://codesandbox.io/p/sandbox/resizing-canvas-with-react-hooks-gizc5?file=%2Fsrc%2Findex.js%3A34%2C18-34%2C68
  // Hard code the image source
  image.src = room;

  function init() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, locationX, 0);

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

    handleResize();
    window.addEventListener("resize", handleResize);

    window.addEventListener("keydown", handleInput);
    // remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleInput);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  /*<img src={room} width="500" />*/
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <div id="canvas-div">
        <canvas id="canvas" ref={canvasRef} alt="room" width="500" height="500">
          <img id="room" src={room} />
        </canvas>
      </div>
    </>
  );
};
export default Game;
