import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../utilities";
import room from "./../../../dist/room.png";
// import bear_left from "./../../../dist/bear.png";
// import bear_right from "./../../../dist/bear-flipped.png";
import bearsprite from "./../../../dist/bearsprite.svg";
// import bearspriteleft from "./../../../dist/bearspriteleft.svg";
// import bearspriteright from "./../../../dist/bearspriteright.svg";
import "../../utilities.css";
import "./Game.css";

import { Link, useNavigate } from "react-router-dom";
import Todo from "./Todo.js";
import Notebook from "./Notebook.js";
import Calendar from "./Calendar.js";
import Music from "./Music.js";
/**
 * Parent: Room
 *
 * Proptypes
 * @param {String} userId
 *@param {String} name
 @param totalExp
 */
const Game = ({ userId, name, totalExp, open, setOpen, togglePomodoro }) => {
  //display stuff logic
  const [pomodoro, setPomodoro] = useState(false);
  const [content, setContent] = useState(<></>);

  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    if (open === "todo") {
      const todo = (
        <div className="content-layer">
          <div className=" u-flex-justifyCenter u-flex-alignCenter">
            <Todo
              userId={userId}
              tasks={itemData}
              name={name}
              totalExp={totalExp}
              setTasks={setItemData}
            />
          </div>
        </div>
      );
      setContent(todo);
    }
  }, [itemData]);
  useEffect(() => {
    if (open === "todo") {
      const todo = (
        <div className="content-layer">
          <div className=" u-flex-justifyCenter u-flex-alignCenter">
            <Todo
              userId={userId}
              tasks={itemData}
              name={name}
              totalExp={totalExp}
              setTasks={setItemData}
            />
          </div>
        </div>
      );
      setContent(todo);
    } else if (open === "notebook") {
      setContent(
        <div className="content-layer">
          <div className="notebook display-box u-flex">
            <Notebook userId={userId} />
          </div>
        </div>
      );
    } else if (open === "calendar") {
      setContent(
        <div className="content-layer">
          <div className="gcal display-box u-flex">
            <Calendar userId={userId} />
          </div>
        </div>
      );
    } else if (open === "music") {
      setContent(
        <div className="content-layer">
          <div className="display-box u-flex">
            <Music userId={userId} />
          </div>
        </div>
      );
    } else {
      setContent(<></>);
    }
  }, [open]);

  //moving game logic
  const [flip, setFlip] = useState(0);
  const [framenum, setFrameNum] = useState(0);
  const [iFrame, setIFrame] = useState(0);
  const [locationX, setLocationX] = useState(0);
  const intervalRef = useRef(null);
  const [leftBound, setLeftBound] = useState(-1200);
  const [todo, setTodo] = useState(false);
  const [clock, setClock] = useState(false);
  const [music, setMusic] = useState(false);
  const [notebook, setNotebook] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [keyIsDown, setKeyIsDown] = useState(false);
  // const [bear, setBear] = useState(bear_right);
  const [bear, setBear] = useState(bearsprite);

  const handleUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      intervalRef.current = clearInterval(intervalRef.current);

      setIFrame(0);
      setFrameNum(0);
    }
    // framenum = 0;
    setKeyIsDown(false);
  };

  const animateBear = (ctx) => {
    if (framenum >= 5) {
      setFrameNum(0);
      setIFrame(0);
    }
    if (Math.floor(iFrame) !== framenum) {
      setFrameNum(Math.floor(iFrame));
      window.requestAnimationFrame(() => animateBear(ctx));
      return;
    }
  };

  const animateLeft = () => {
    intervalRef.current = setInterval(() => {
      setLocationX((previousLocation) => previousLocation + 2);
    }, 1000 / (60 * 10));
  };

  const animateRight = () => {
    intervalRef.current = setInterval(() => {
      setLocationX((previousLocation) => previousLocation - 2);
    }, 1000 / (60 * 10));
  };

  const handleInput = (e, locX) => {
    //https://stackoverflow.com/questions/68745579/how-to-capture-tab-key-press-in-react-component

    if (!intervalRef.current) {
      if (e.key === "ArrowLeft") {
        setKeyIsDown(true);
        setFlip(0);
        if (locX >= leftBound && locX <= image.width) {
          animateLeft();
        }
      } else if (e.key === "ArrowRight") {
        setKeyIsDown(true);
        setFlip(1.1);
        if (locX >= leftBound && locX <= leftBound + image.width) {
          animateRight();
        }
      }
    }
  };

  //stuff for interacting w room
  useEffect(() => {
    init(locationX);
    if (locationX < leftBound + image.width / 1.05 && locationX > leftBound + image.width / 1.25) {
      setMusic(true);
    } else {
      setMusic(false);
    }
    if (locationX < leftBound + image.width / 1.3 && locationX > leftBound + image.width / 1.4) {
      setClock(true);
    } else {
      setClock(false);
    }
    if (locationX < leftBound + image.width / 1.6 && locationX > leftBound + image.width / 1.9) {
      setTodo(true);
    } else {
      setTodo(false);
    }
    if (locationX < leftBound + image.width / 2.5 && locationX > leftBound + image.width / 3) {
      setCalendar(true);
    } else {
      setCalendar(false);
    }
    if (locationX < leftBound + image.width / 4 && locationX > leftBound + image.width / 10) {
      setNotebook(true);
    } else {
      setNotebook(false);
    }
  }, [locationX]);

  //image stuff
  const canvasRef = useRef(null);
  const image = new Image();
  //https://developer.mozilla.org/en-US/docs/Web/APhide%20imI/CanvasRenderingContext2D/drawImage
  //https://codesandbox.io/p/sandbox/resizing-canvas-with-react-hooks-gizc5?file=%2Fsrc%2Findex.js%3A34%2C18-34%2C68
  // Hard code the image source
  image.src = room;
  const image_bear = new Image();
  image_bear.src = bear;
  useEffect(() => {
    init();
  }, []);

  ///init function (with draw stuff inside)
  function init() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (locationX > leftBound + image.width) {
      setLocationX(leftBound + image.width);
    }
    if (locationX < leftBound) {
      setLocationX(leftBound);
    }
    setLeftBound(-image.width + window.innerWidth / 2);

    ctx.drawImage(image, 0, 0, image.width, image.height, locationX, 0, image.width, image.height);

    ctx.save();
    //ctx.scale(-1, 1);

    //draw bear
    const scale = 6;
    const bearw = image_bear.width / 8;
    const bearh = image_bear.height / 2.9;
    // ctx.clearRect(0, 0, image.width, image.height);
    ctx.drawImage(
      image_bear,
      141 + (bearw + bearw / 8.8) * framenum,
      bearh * flip,
      bearw,
      bearh,
      window.innerWidth / 2 - image.height / (2 * scale),
      image.height - image.height / (4 / 1.9),
      image_bear.width / (8 * scale),
      image_bear.height / (2.9 * scale)
    );
    setIFrame((prevnum) => prevnum + 0.05);

    setFrameNum(Math.floor(iFrame));
    if (framenum >= 5) {
      setFrameNum(0);
      setIFrame(0);
    }

    //animateBear(ctx);

    ctx.restore();
    /*if (todo) {
      console.log("inside");
      ctx.rect(locationX, 0, 100, 100);
    }*/
    // Ensure the image is loaded before drawing it on the canvas
    // Set the canvas size to match the image size
  }
  //init function ends

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const handleResize = (e) => {
      ctx.canvas.height = image.height;
      ctx.canvas.width = window.innerWidth;
      init(locationX);
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
      window.removeEventListener("keyup", handleUp);
    };
  }, [keyIsDown]);
  /*<img src={room} width="500" />*/

  return (
    <>
      <div id="canvas-div">
        <canvas id="canvas" ref={canvasRef} alt="room" width="500" height="500">
          <img id="room" src={room} />
          <img id="image_bear" src={bear} />
        </canvas>
        {clock ? (
          <button
            className="room-button clock"
            onClick={() => {
              togglePomodoro();
            }}
          >
            pomodoro
          </button>
        ) : (
          <></>
        )}
        {music ? (
          <Link to="/music">
            <button className="room-button todo-button">music</button>
          </Link>
        ) : (
          <></>
        )}
        {todo ? (
          <Link to="/todo">
            <button className="room-button todo-button">todo list</button>
          </Link>
        ) : (
          <></>
        )}
        {calendar ? (
          <Link to="/calendar">
            <button className="room-button calendar">calendar</button>{" "}
          </Link>
        ) : (
          <></>
        )}
        <Link to="notebook">
          {notebook ? <button className="room-button notes">notebook</button> : <></>}
        </Link>
        <div className="room ">{content}</div>
      </div>
    </>
  );
};
export default Game;
