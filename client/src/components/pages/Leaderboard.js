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

  useEffect(() => {
    get("/api/topThree", { arrayId: 0 }).then((resultArray) => {
      setExpArray(resultArray);
      //console.log("just setExpArray", expArray);
    });
  }, [props.userId, expArray]);

  return (
    <div>
      {props.userId && expArray.length > 0 ? (
        <div className="ranking">
          <div className="u-xlarge">
            <div>1st: {expArray[0].name}</div>
            <div>2nd: {expArray[1].name}</div>
            <div>3rd: {expArray[2].name}</div>
          </div>
          <a>
            <img src="https://i.ibb.co/G3wW9jq/leaderboard.png" alt="leaderboard" />
          </a>
        </div>
      ) : (
        <div className="login">{navigate("/")}</div>
      )}
    </div>
  );
};

export default Leaderboard;
