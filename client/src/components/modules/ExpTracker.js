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
 */

const ExpTracker = (props) => {
  return (
    <div>
      <span>{"you have earned " + props.totalExp + " exp so far. keep going!"}</span>
    </div>
  );
};

export default ExpTracker;
