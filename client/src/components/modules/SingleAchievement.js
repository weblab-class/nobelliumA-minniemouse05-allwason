import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./SingleAchievement.css";

/**
 * Component to render a single comment
 * parent: profile
 *@param achievementId
 * Proptypes
 * @param {string} award (name of award)
 * @param {Boolean} hasAttained
 * @param {Number} expValue of the award
 */
const SingleAchievement = (props) => {
  const [awardData, setAwardData] = useState([]);

  useEffect(() => {
    get("/api/getAchievement", { achievementId: props.achievementId })
      .then((fetchedAward) => {
        setAwardData(fetchedAward);
        //console.log("fetchedAward", fetchedAward);
        //console.log("awardData", awardData.awardName);
      })
      .catch((error) => {
        console.error("Error when running get for api/getAchievement:", error);
      });
  }, []);

  return (
    <div>
      <div className="comment">
        <div className="u-bold u-large ">{awardData.awardName}</div>
        <div className="u-med-large">{awardData.awardDescription}</div>
      </div>
    </div>
  );
};

export default SingleAchievement;
