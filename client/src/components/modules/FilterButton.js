import React, { useEffect } from "react";
import "../../utilities.css";
import "./FilterButton.css";

const FilterButton = () => {
  return (
    <button type="button" className="" aria-pressed="true">
      <span className="">Show </span>
      <span>all </span>
      <span className=""> tasks</span>
    </button>
  );
};

export default FilterButton;
