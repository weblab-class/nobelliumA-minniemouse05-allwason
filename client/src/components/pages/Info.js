import React from "react";
import "../../utilities.css";
import NavBar from "../modules/NavBar";
import { generatePath, useNavigate } from "react-router-dom";

import "./Info.css";

const Info = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      {props.userId ? (
        <>
          <div className="info-text-container">
            <div className="info-heading"> What is RoomCraft? </div>
            <div className="About-typewriter">become the most productive version of yourself! </div>

            <div className="info-navigate-container">
              <h1> how to navigate</h1>
            </div>
            <div className="info-navigate-container">
              <h1> create your own story</h1>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="login">{navigate("/")}</div>{" "}
        </>
      )}
    </div>
  );
};
export default Info;
