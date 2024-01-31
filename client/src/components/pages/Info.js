import React from "react";
import "../../utilities.css";
import NavBar from "../modules/NavBar";
import "./Info.css";

const Info = () => {
  return (
    <>
      <div className="info-text-container">
        <div className="info-heading"> What is RoomCraft? </div>
        <div className="About-typewriter"> become the most productive version of yourself! </div>

        <div className='info-navigate-container'>
          <h1> how to navigate</h1>
        </div>
        <div>
          <h1> create your own story</h1>
        </div>
      </div>
    </>
  );
};
export default Info;
