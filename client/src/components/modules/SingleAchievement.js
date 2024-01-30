import React from "react";

import "../../utilities.css";
import "./SingleAchievement.css";

/**
 * parent: profile
 *@param achievementId
 * Proptypes
 * @param {string} award (name of award)
 * @param {Boolean} hasAttained
 * @param {Number} expValue of the award
 */
const SingleAchievement = (props) => {
  return (
    <div>
      <div className="comment">
        <div className="u-bold u-large comment-awardname">{props.awardName}</div>
        <div className="u-med-large comment-desc" desc>
          {props.awardDescription}
        </div>
      </div>
    </div>
  );
};

export default SingleAchievement;
