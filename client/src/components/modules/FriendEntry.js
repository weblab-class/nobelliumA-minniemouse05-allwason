import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./FriendEntry.css";
import exp from "./../../../dist/EXP.png";
import { Link, useNavigate } from "react-router-dom";
const FriendEntry = (props) => {
  let button = <></>;
  if (props.isRequest) {
    button = (
      <div className="u-flex">
        <button
          className="accept"
          onClick={() => {
            props.acceptRequest(props.requestId);
          }}
        >
          ✓
        </button>
        <button
          className="deny"
          onClick={() => {
            props.denyRequest(props.requestId);
          }}
        >
          x
        </button>
      </div>
    );
  } else if (props.add && !props.requested) {
    button = (
      <button className="add-button" onClick={props.addFriend}>
        +
      </button>
    );
  } else if (props.requested) {
    button = (
      <button className="add-button" onClick={props.removeRequest}>
        Requested
      </button>
    );
  } else {
    button = (
      <button
        className="x-button"
        onClick={() => {
          props.removeFriend(props.requestId);
        }}
      >
        x
      </button>
    );
  }
  return (
    <div className="FriendEntry u-flex">
      <img
        className="friend-class-image pr-15"
        src="https://static.vecteezy.com/system/resources/previews/027/517/647/original/pixel-art-cute-fat-bear-character-2-png.png"
      />
      <h1 className="pr-20">{props.value}</h1>
      <img className="friend-class-image pr-15" src={exp} />
      <h1 className="pr-20">10000000</h1>
      <img
        className="friend-class-image"
        src="https://static.vecteezy.com/system/resources/previews/027/517/434/original/pixel-art-golden-soccer-cup-icon-2-png.png"
      />
      <h1>20</h1>
      {button}
    </div>
  );
};
export default FriendEntry;
