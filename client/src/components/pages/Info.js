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
              <div className="info-instruction-heading"> how to navigate</div>
              <div className="instruction-container">
                <div className="info-instruction-text">
                  - use the left and right key arrows to move your bear avatar around the room
                </div>
                <div className="info-instruction-text">
                  - when you walk near a certain feature, it’s button will pop up. click on the
                  button to enter that feature
                </div>
                <div className="info-instruction-text">
                  - the navigation bar has various pages, like achievements, friending, and
                  leaderboard for you to visit!
                </div>
              </div>
            </div>
            <div className="info-navigate-container">
              <div className="info-instruction-heading"> create your own story</div>
              <div className="instruction-container ">
                <div className="info-instruction-text">
                  - every achievement you earn will be used to add another chapter to your story
                  line, crafting your very own hero’s journey
                </div>
                <div className="info-instruction-text">
                  - earn achievements through interacting on RoomCraft, whether it be by friending
                  others, gaining exp from completing to-do list tasks, or more!
                </div>
              </div>
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
