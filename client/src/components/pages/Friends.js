import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./Friends.css";
import FriendEntry from "../modules/FriendEntry.js";
import { Link, useNavigate } from "react-router-dom";
const Friends = ({ userId }) => {
  const navigate = useNavigate();
  const [userFriends, setUserFriends] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState(false);
  const [friendName, setFriendName] = useState("");
  const findFriend = () => {
    get("/api/user", { _id: text }).then((response) => {
      setSearched(true);
      console.log(text);
      console.log(response);
      if (response.user[0].name != undefined) {
        setFriendName(response.user[0].name);
        setFound(true);
        console.log(`Friend found: ${response.user[0].name}`);
      } else {
        setFound(false);
        console.log(`Friend not found`);
        console.log(text);
      }
    });
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    get("/api/friends", { userId: userId }).then((content) => {
      if (content.length > 0) {
        setUserFriends(content.friends);
      }

      console.log(content);
    });
  }, []);
  const makeFriendEntry = (id, index) => {
    return <FriendEntry key={id} index={index} />;
  };
  return (
    <div>
      {userId ? (
        <div className="u-flex find">
          <h1 className="pr-15">Enter Friend UserID:</h1>
          <div className="search-field">
            <input value={text} onChange={handleChange}></input>
          </div>
          <button onClick={findFriend}>search</button>
        </div>
      ) : (
        <></>
      )}
      {userId && searched && found ? <p>{friendName}</p> : <></>}
      {userId && searched && !found ? <p>Friend not found (check your inputted id!)</p> : <></>}
      {userId ? (
        <>
          <div className="friend-list u-flex-justifyCenter u-flex-vertical ">
            {userFriends.map((friend_id, ind) => {
              //console.log(ind);
              return makeFriendEntry(friend_id, ind);
            })}
          </div>
        </>
      ) : (
        <div className="login">{navigate("/")}</div>
      )}
    </div>
  );
};

export default Friends;
