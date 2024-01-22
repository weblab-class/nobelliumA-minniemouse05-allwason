import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./Friends.css";
import FriendEntry from "../modules/FriendEntry.js";
import { Link, useNavigate } from "react-router-dom";
const Friends = ({ userId }) => {
  const navigate = useNavigate();
  return (
    <div>
      {userId ? (
        <>
          <div className="u-flex find">
            <h1 className="pr-15">Enter Friend UserID:</h1>
            <div className="search-field">
              <input></input>
            </div>
            <button>search</button>
          </div>

          <div className="friend-list u-flex-justifyCenter u-flex-vertical ">
            <FriendEntry />
            <FriendEntry />
            <FriendEntry />
            <FriendEntry />
            <FriendEntry />
            <FriendEntry />
          </div>
        </>
      ) : (
        <div className="login">{navigate("/")}</div>
      )}
    </div>
  );
};

export default Friends;
