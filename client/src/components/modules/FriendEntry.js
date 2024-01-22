import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./FriendEntry.css";
import exp from "./../../../dist/EXP.png";
import { Link, useNavigate } from "react-router-dom";
const FriendEntry = () => {
  return (
    <div className="FriendEntry u-flex">
      <img
        className="pr-15"
        src="https://static.vecteezy.com/system/resources/previews/027/517/647/original/pixel-art-cute-fat-bear-character-2-png.png"
      />
      <h1 className="pr-20">Friend</h1>
      <img className="pr-15" src={exp} />
      <h1 className="pr-20">10000000</h1>
      <img src="https://static.vecteezy.com/system/resources/previews/027/517/434/original/pixel-art-golden-soccer-cup-icon-2-png.png" />
      <h1>20</h1>
    </div>
  );
};
export default FriendEntry;
