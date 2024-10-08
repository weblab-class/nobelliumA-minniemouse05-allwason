import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../utilities";
import room from "./../../../dist/room.png";
// import room from "./../../../dist/roomwcoffeeanimate2.gif";
// import bear_left from "./../../../dist/bear.png";
// import bear_right from "./../../../dist/bear-flipped.png";
import bearsprite from "./../../../dist/bearsprite.svg";
// import bearspriteleft from "./../../../dist/bearspriteleft.svg";
// import bearspriteright from "./../../../dist/bearspriteright.svg";
import "../../utilities.css";
import "./Game.css";
import lightbulb from "./../../../dist/lightbulb.png";

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
 @param setTotalExp
 */
const Game = ({ userId, name, totalExp, setTotalExp, open, setOpen, togglePomodoro }) => {
  //display stuff logic
  //console.log(setTotalExp);
  const [pomodoro, setPomodoro] = useState(false);
  const [content, setContent] = useState(<></>);

  const [itemData, setItemData] = useState([]);
  const width = (1951 * window.innerHeight) / 960;
  const height = window.innerHeight;
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
              setTotalExp={setTotalExp}
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
        <div className="content-layer music">
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
  const [locationX, setLocationX] = useState(-width + window.innerWidth / 2 + width / 2);
  const intervalRef = useRef(null);
  const [leftBound, setLeftBound] = useState(-width + window.innerWidth / 2);
  const [todo, setTodo] = useState(false);
  const [clock, setClock] = useState(false);
  const [music, setMusic] = useState(false);
  const [notebook, setNotebook] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [keyIsDown, setKeyIsDown] = useState(false);
  const image = new Image();
  //https://developer.mozilla.org/en-US/docs/Web/APhide%20imI/CanvasRenderingContext2D/drawImage
  //https://codesandbox.io/p/sandbox/resizing-canvas-with-react-hooks-gizc5?file=%2Fsrc%2Findex.js%3A34%2C18-34%2C68
  // Hard code the image source
  image.src = room;
  const image_bear = new Image();
  image_bear.src = bearsprite;
  const handleUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      intervalRef.current = clearInterval(intervalRef.current);

      setIFrame(0);
      setFrameNum(0);
    }
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
        if (locX >= leftBound && locX <= leftBound + width) {
          animateLeft();
        }
      } else if (e.key === "ArrowRight") {
        setKeyIsDown(true);
        setFlip(1.1);
        if (locX <= leftBound + width) {
          animateRight();
        }
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, width, height);
    image.onload = function () {
      ctx.drawImage(image, 0, 0, image.width, image.height, locationX, 0, width, height);
    };

    ctx.save();

    //draw bear
    const scale = 6;
    const bearw = 942.625;
    const bearh = 1684.1379310344828;
    image_bear.onload = function () {
      ctx.drawImage(
        image_bear,
        141 + (bearw + bearw / 8.8) * framenum,
        bearh * flip,
        bearw,
        bearh,
        window.innerWidth / 2 - height / (2 * scale),
        height - height / 1.65,
        7541 / (8 * scale * 0.8),
        4884 / (2.9 * scale * 0.8)
      );
    };

    //ctx.restore();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleInput({ key: "ArrowRight", locationX }), 3000;
    });
  }, []);

  //stuff for interacting w room
  useEffect(() => {
    init();
    if (locationX < leftBound + width / 1.05 && locationX > leftBound + width / 1.25) {
      setMusic(true);
    } else {
      setMusic(false);
    }
    if (locationX < leftBound + width / 1.3 && locationX > leftBound + width / 1.4) {
      setClock(true);
    } else {
      setClock(false);
    }
    if (locationX < leftBound + width / 1.6 && locationX > leftBound + width / 1.9) {
      setTodo(true);
    } else {
      setTodo(false);
    }

    if (locationX < leftBound + width / 4 && locationX > leftBound + width / 10) {
      setNotebook(true);
    } else {
      setNotebook(false);
    }
  }, [locationX]);

  useEffect(() => {
    init();
  }, []);

  //image stuff
  const canvasRef = useRef(null);

  // useEffect(() => {
  //   console.log("canvas being made");
  //   const image = new Image();
  //   //https://developer.mozilla.org/en-US/docs/Web/APhide%20imI/CanvasRenderingContext2D/drawImage
  //   //https://codesandbox.io/p/sandbox/resizing-canvas-with-react-hooks-gizc5?file=%2Fsrc%2Findex.js%3A34%2C18-34%2C68
  //   // Hard code the image source
  //   image.src = room;
  //   const image_bear = new Image();
  //   image_bear.src = bear;
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   if (locationX > leftBound + image.width) {
  //     setLocationX(leftBound + image.width);
  //   }
  //   if (locationX < leftBound) {
  //     setLocationX(leftBound);
  //   }
  //   setLeftBound(-image.width + window.innerWidth / 2);

  //   ctx.clearRect(0, 0, image.width, image.height);
  //   ctx.drawImage(image, 0, 0, image.width, image.height, locationX, 0, image.width, image.height);

  //   ctx.save();

  //   //draw bear
  //   const scale = 6;
  //   const bearw = image_bear.width / 8;
  //   const bearh = image_bear.height / 2.9;

  //   ctx.drawImage(
  //     image_bear,
  //     141 + (bearw + bearw / 8.8) * framenum,
  //     bearh * flip,
  //     bearw,
  //     bearh,
  //     window.innerWidth / 2 - image.height / (2 * scale),
  //     image.height - image.height / (4 / 1.9),
  //     image_bear.width / (8 * scale),
  //     image_bear.height / (2.9 * scale)
  //   );
  //   setIFrame((prevnum) => prevnum + 0.05);

  //   setFrameNum(Math.floor(iFrame));
  //   if (framenum >= 5) {
  //     setFrameNum(0);
  //     setIFrame(0);
  //   }

  //   //ctx.restore();
  // }, []);

  ///init function (with draw stuff inside)
  function init() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (locationX > leftBound + width) {
      setLocationX(leftBound + width);
    }
    if (locationX < leftBound) {
      setLocationX(leftBound);
    }
    setLeftBound(-width + window.innerWidth / 2);

    ctx.clearRect(0, 0, width, height);

    ctx.drawImage(image, 0, 0, image.width, image.height, locationX, 0, width, height);
    ctx.save();

    //draw bear
    const scale = 6;
    const bearw = 942.625;
    const bearh = 1684.1379310344828;
    ctx.drawImage(
      image_bear,
      141 + (bearw + bearw / 8.8) * framenum,
      bearh * flip,
      bearw,
      bearh,
      window.innerWidth / 2 - height / (2 * scale),
      height - height / 1.65,
      7541 / (8 * scale * 0.8),
      4884 / (2.9 * scale * 0.8)
    );
    setIFrame((prevnum) => prevnum + 0.05);

    setFrameNum(Math.floor(iFrame));
    if (framenum >= 5) {
      setFrameNum(0);
      setIFrame(0);
    }

    //ctx.restore();
  }
  //init function ends

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const handleResize = (e) => {
      ctx.canvas.height = height;
      ctx.canvas.width = window.innerWidth;
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
      window.removeEventListener("keyup", handleUp);
    };
  }, [keyIsDown]);

  return (
    <>
      <div id="canvas-div">
        <div>
          <canvas id="canvas" ref={canvasRef} alt="room" width="500" height="500">
            <img id="room" src={room} />
            <img id="image_bear" src={bearsprite} />
          </canvas>
        </div>
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

        <Link to="notebook">
          {notebook ? <button className="room-button notes">notebook</button> : <></>}
        </Link>
        <div className="room ">{content}</div>
      </div>
    </>
  );
};
export default Game;
