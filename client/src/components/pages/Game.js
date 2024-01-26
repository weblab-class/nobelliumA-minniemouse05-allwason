import React, { useState, useEffect, useRef } from "react";
import { get, post } from "../../utilities";
import room from "./../../../dist/room.png";
import bear_left from "./../../../dist/bear.png";
import bear_right from "./../../../dist/bear-flipped.png";
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
    get("/api/todoItem", { userId: userId })
      .then((itemData) => {
        setItemData(itemData);
      })
      .catch((error) => {
        console.error("Error when running get for api/todoItem:", error);
      });
  });

  useEffect(() => {
    console.log(open);

    if (open === "todo") {
      console.log("todo");
      setContent(
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
  const [locationX, setLocationX] = useState(0);
  const [keyDown, setkeyDown] = useState(undefined);
  const intervalRef = useRef(null);
  const [leftBound, setLeftBound] = useState(-1200);
  const [todo, setTodo] = useState(false);
  const [clock, setClock] = useState(false);
  const [notebook, setNotebook] = useState(false);
  const [calendar, setCalendar] = useState(false);
  const [bear, setBear] = useState(bear_right);
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
    console.log("widths", image.width, locX, window.innerWidth);
    const animateRight = () => {
      setLocationX((previousLocation) => previousLocation - 1);
    };
    if (!intervalRef.current) {
      if (e.key === "ArrowLeft") {
        setBear(bear_left);
        if (locX >= leftBound && locX <= image.width) {
          animateLeft();
        }
      } else if (e.key === "ArrowRight") {
        setBear(bear_right);
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
  const canvasRef = useRef(null);
  const image = new Image();
  //https://developer.mozilla.org/en-US/docs/Web/APhide%20imI/CanvasRenderingContext2D/drawImage
  //https://codesandbox.io/p/sandbox/resizing-canvas-with-react-hooks-gizc5?file=%2Fsrc%2Findex.js%3A34%2C18-34%2C68
  // Hard code the image source
  image.src = room;
  const image_bear = new Image();
  image_bear.src = bear;
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
    ctx.drawImage(image, locationX, 0, image.width, window.innerHeight);

    ctx.save();
    //ctx.scale(-1, 1);
    ctx.drawImage(
      image_bear,
      window.innerWidth / 2 - image.height / 6,
      image.height - image.height / (4 / 1.9),
      image.height / 3,
      image.height / 3
    );
    ctx.restore();
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
    console.log(open);
  });

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
