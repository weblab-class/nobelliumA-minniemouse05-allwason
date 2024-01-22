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
          <div className="u-flex ">
            <h1 className="pl-15 pr-20">Find Friend:</h1>
            <div className="pt-15">
              <input className="pr-20"></input>
            </div>
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
