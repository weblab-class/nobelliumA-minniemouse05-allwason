import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, post } from "../../utilities.js";
import bear from "../../../dist/bear.png";
import exp from "./../../../dist/EXP.png";
import medal from "./../../../dist/medal.png";
import "../../utilities.css";
import "./FriendEntry.css";

const FriendEntry = (props) => {
  let button = <></>;

  if (props.isRequest) {
    button = (
      <div className="u-flex ui-button">
        <button
          className="accept"
          onClick={() => {
            props.acceptRequest(props.requestId);
          }}
        >
          ✓
        </button>
        <button
          className="deny ui-button"
          onClick={() => {
            props.denyRequest(props.requestId);
          }}
        >
          x
        </button>
      </div>
    );
  } else if (props.add && !props.requested && props.userId !== props.requestId) {
    button = (
      <button className="add-button" onClick={props.addFriend}>
        +
      </button>
    );
  } else if (props.requested) {
    button = (
      <button className="add-button ui-button" onClick={props.removeRequest}>
        Requested
      </button>
    );
  } else if (props.userId !== props.requestId) {
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

  let name, achievements, totalexp;
  if (props.info) {
    name = props.info.name;
    achievements = props.info.achievementArray.length;
    totalexp = props.info.totalExp;
  } else {
    name = "unnamed friend";
    achievements = 0;
    totalexp = 0;
    //console.log(props.info);
  }

  return (
    <div className="FriendEntry u-flex">
      <img className="friend-class-image pr-15" src={bear} alt="Bear" />
      <h1 className="pr-20">{name}</h1>
      <img className="friend-class-image pr-15" src={exp} alt="EXP" />
      <h1 className="pr-20">{totalexp}</h1>
      <img className="friend-class-image" src={medal} alt="Medal" />
      <h1>{achievements}</h1>
      {button}
    </div>
  );
};

export default FriendEntry;
