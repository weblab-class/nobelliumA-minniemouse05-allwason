import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./Friends.css";
import FriendEntry from "./FriendEntry.js";
import { Link, useNavigate } from "react-router-dom";
const Friends = ({ userId }) => {
  const navigate = useNavigate();
  return (
    <div>
      {userId ? (
        <div className="u-flex u-flex-justifyCenter">
          <FriendEntry />
        </div>
      ) : (
        <div className="login">{navigate("/")}</div>
      )}
    </div>
  );
};

export default Friends;
