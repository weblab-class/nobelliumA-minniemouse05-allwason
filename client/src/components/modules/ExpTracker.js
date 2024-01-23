import React, { useEffect } from "react";
import { useState } from "react";
import { post } from "../../utilities";
import "../../utilities.css";
import "./Form.css";

/**
 * Parent: Todo
 *
 * Proptypes
 * @param {String} userId
 * @param {String} name
 * @param {Number} totalExp
 * @param {Number} tempEarnedExp
 */

const ExpTracker = (props) => {
  return (
    <div>
      <div>earn +5 exp for every task you complete.</div>
      <div>{"you have just earned " + props.tempEarnedExp + " exp. keep going!"}</div>
    </div>
  );
};

export default ExpTracker;
