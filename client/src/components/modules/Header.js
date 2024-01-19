import React from "react";
import "../../utilities.css";
import "./Header.css";
import { useState, useEffect } from "react";
const Header = () => {
  return (
    <>
      <div className="u-flex u-flex-alignCenter container">
        <h1 className="u-xlarge pr-15">Title:</h1>
        <input></input>
      </div>
    </>
  );
};

export default Header;
