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
      console.log('running post api updateTopThree')
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
        <div className="ranking">
          <div className="u-xlarge">
            <div>
              1st: {expArray[0].name} {expArray[0].exp}
            </div>
            <div>
              2nd: {expArray[1].name} {expArray[1].exp}
            </div>
            <div>
              3rd: {expArray[2].name} {expArray[2].exp}
            </div>
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
