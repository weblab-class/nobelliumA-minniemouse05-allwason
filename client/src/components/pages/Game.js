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
    console.log(open);
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
    console.log(open);

    if (open === "todo") {
      console.log("todo");
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
      console.log(content);
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
    } else {
      setContent(<></>);
    }
  }, [open]);

  //moving game logic
  const [flip, setFlip] = useState(0);
  const [framenum, setFrameNum] = useState(0);
  const [locationX, setLocationX] = useState(0);
  const [keyDown, setkeyDown] = useState(undefined);
  const intervalRef = useRef(null);
  const [leftBound, setLeftBound] = useState(-1200);
  const [todo, setTodo] = useState(false);
  const [clock, setClock] = useState(false);
  const [notebook, setNotebook] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [keyIsDown, setKeyIsDown] = useState(false);
  // const [bear, setBear] = useState(bear_right);
  const [bear, setBear] = useState(bearsprite);
  const handleUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight")
      intervalRef.current = clearInterval(intervalRef.current);
    // framenum = 0;
    setKeyIsDown(false);
  };

  const animateBear = (ctx) => {
    setFrameNum((prevnum) => prevnum + 1);
    if (framenum >= 5) {
      setFrameNum(0);
    }
    if (keyIsDown) {
      window.requestAnimationFrame(() => animateBear(ctx));
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

  const handleInput = (e, locX, locations1) => {
    //https://stackoverflow.com/questions/68745579/how-to-capture-tab-key-press-in-react-component

    if (!intervalRef.current) {
      if (e.key === "ArrowLeft") {
        // setBear(bear_left);
        // setBear(bearspriteleft);
        setKeyIsDown(true);
        setFlip(0);
        if (locX >= leftBound && locX <= image.width) {
          animateLeft();
          // animateBear();
        }
      } else if (e.key === "ArrowRight") {
        // setBear(bear_right);
        // setBear(bearspriteright);
        setKeyIsDown(true);
        setFlip(1.1);
        if (locX >= leftBound && locX <= leftBound + image.width) {
          // intervalRef.current = setInterval(() => {
          animateRight();
          // animateBear();

          // }, 1000 / (60 * 10));
        } else {
          intervalRef.current = clearInterval(intervalRef.current);
          console.log("clearing interval", intervalRef.current);
        }
      }
    }
  };

  useEffect(() => {}, [keyDown]);
  //stuff for interacting w room
  useEffect(() => {
    init();
    if (locationX < leftBound + image.width / 1.3 && locationX > leftBound + image.width / 1.4) {
      console.log("todo");
      setClock(true);
    } else {
      setClock(false);
    }
    if (locationX < leftBound + image.width / 1.6 && locationX > leftBound + image.width / 1.9) {
      console.log("todo");
      setTodo(true);
    } else {
      setTodo(false);
    }
    if (locationX < leftBound + image.width / 2.5 && locationX > leftBound + image.width / 3) {
      console.log("calendar");
      setCalendar(true);
    } else {
      setCalendar(false);
    }
    if (locationX < leftBound + image.width / 4 && locationX > leftBound + image.width / 10) {
      console.log("notebook");
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

  ///init function (with draw stuff inside)
  function init() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const newArr = [
      leftBound + image.width / 1.3,
      leftBound + image.width / 1.6,
      leftBound + image.width / 2.5,
      leftBound + image.width / 4,
    ];
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
      window.innerWidth / 2 - image.height / 6,
      image.height - image.height / (4 / 1.9),
      image_bear.width / (8 * scale),
      image_bear.height / (2.9 * scale)
    );

    animateBear(ctx);

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
      //ctx.canvas.height = image.height;
      canvas.width = window.innerWidth;
      canvas.height = image.height;
      console.log("resizing");
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
