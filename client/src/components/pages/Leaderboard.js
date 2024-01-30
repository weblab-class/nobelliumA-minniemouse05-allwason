import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./Leaderboard.css";
import { useNavigate } from "react-router-dom";

/**
 * Parent: App
 *
 * Proptypes
 * @param {String} name
 * @param {String} userId
 * @param {Number} totalExp
 */

const Leaderboard = (props) => {
  const navigate = useNavigate();
  const [expArray, setExpArray] = useState([]);
  const [lowestExpOfArray, setLowestExpOfArray] = useState(0);

  useEffect(() => {
    get("/api/topThree", { arrayId: 0 }).then((resultArray) => {
      setExpArray(resultArray);
      setLowestExpOfArray(resultArray[2].exp);
      //console.log("just setExpArray", expArray);
      //console.log("just set lowestExpOfArray", lowestExpOfArray);
    });
  }, [props.userId, expArray]);

  useEffect(() => {
    console.log("props.totalExp= ", props.totalExp);
    if (props.totalExp > lowestExpOfArray) {
      console.log("running post api updateTopThree");
      post("/api/updateTopThree", {
        arrayId: 0,
        userId: props.userId,
        name: props.name,
        totalExp: props.totalExp,
      });
    }
  }, []);

  return (
    <div>
      {props.userId && expArray.length > 0 ? (
        <div className="leaderboard-container">
          <section className="leaderboard-section">
            <div className="leaderboard-text-image-container">
              <img
                className="leaderboard-text-image"
                src="https://i.ibb.co/zP9n7GN/Screenshot-2024-01-29-at-10-11-45-PM.png"
              />
            </div>
          </section>
          <section className="leaderboard-section">
            <div className="leaderboard-text-image-container">
              <div className='leaderboard-image-overlay'>
              <img
                className="leaderboard-board-image"
                src="https://i.ibb.co/TrmqqBd/Screenshot-2024-01-29-at-10-07-27-PM.png"
              />
               <div class="first-leaderboard-text-overlay">{expArray[0].name} </div>
               <div class="first-exp-text-overlay">{expArray[0].exp} exp </div>
               <div class="second-leaderboard-text-overlay">{expArray[1].name} </div>
               <div class="second-exp-text-overlay">{expArray[1].exp} exp </div>
               <div class="third-leaderboard-text-overlay">{expArray[2].name} </div>
               <div class="third-exp-text-overlay">{expArray[2].exp} exp </div>
              </div>
            </div>
          </section>
          <section className="leaderboard-section">
            <div className="flex-leaderboard-text-container"> 

              <img className="leaderboard-avatar-image" src="https://i.ibb.co/N3rSftn/Screenshot-2024-01-29-at-10-20-39-PM.png" />
              <div className='leaderboard-exp-text'> {props.totalExp} EXP</div>
            </div>


          </section>
        </div>
      ) : (
        <div className="login">{navigate("/")}</div>
      )}
    </div>
  );
};

export default Leaderboard;
