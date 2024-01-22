import React from "react";

/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} award (name of award)
 * @param {Boolean} hasAttained
 * @param {Number} expValue of the award
 */
const SingleAchievement = (props) => {
  return (
    <div>
      {props.hasAttained ? (
        <div className="comment">
          <span className="u-bold">{props.award}</span>
          <span>{" | earned " + props.expValue + " exp"}</span>
        </div>
      ) : (
        <div className="comment">
          <span className="u-bold">{props.award}</span>
          <span>{" | worth " + props.expValue + " exp"}</span>
        </div>
      )}
    </div>
  );
};

export default SingleAchievement;
