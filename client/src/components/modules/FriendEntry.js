import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { get, post } from "../../utilities.js";
import bear from "../../../dist/bear.png";
import exp from "./../../../dist/EXP.png";
import medal from "./../../../dist/medal.png";
import "../../utilities.css";
import { useState, useEffect } from "react";
import "./FriendEntry.css";

const FriendEntry = (props) => {
  const [name, setName] = useState("unnamed friend");
  const [achievements, setAchievements] = useState([]);
  const [totalExp, setTotalExp] = useState(0);
  const [request, setRequest] = useState(false);
  const [button, setButton] = useState(<></>);
  const [requested, setRequested] = useState(false);
  const [normal, setNormal] = useState(false);
  useEffect(() => {
    console.log(props);

    if (props.isRequest || request) {
      setRequest(true);
      setRequested(false);
      setNormal(false);
      console.log("should be rendered");
      setButton(
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
      setButton(
        <button className="add-button" onClick={props.addFriend}>
          +
        </button>
      );
    } else if (requested || props.requested) {
      setRequested(true);
      setRequest(false);
      setNormal(false);
      setButton(
        <button className="add-button ui-button" onClick={props.removeRequest}>
          Requested
        </button>
      );
    } else if (props.userId !== props.requestId || normal) {
      setNormal(true);
      setRequest(false);
      setRequested(false);
      setButton(
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

    if (props.info) {
      setName(props.info.name);
      setAchievements(props.info.achievementArray.length);
      setTotalExp(props.info.totalExp);
    }
  }, [props.info]);

  return (
    <div className="FriendEntry u-flex">
      <img className="friend-class-image pr-15" src={bear} alt="Bear" />
      <h1 className="pr-20">{name}</h1>
      <img className="friend-class-image pr-15" src={exp} alt="EXP" />
      <h1 className="pr-20">{totalExp}</h1>
      <img className="friend-class-image" src={medal} alt="Medal" />
      <h1>{achievements}</h1>
      {button}
    </div>
  );
};

export default FriendEntry;
