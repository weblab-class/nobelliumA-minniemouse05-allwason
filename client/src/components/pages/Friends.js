import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./Friends.css";
import FriendEntry from "../modules/FriendEntry.js";
import { Link, useNavigate } from "react-router-dom";
const Friends = (props) => {
  const navigate = useNavigate();
  const [userFriends, setUserFriends] = useState([]);
  const [text, setText] = useState("");
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [friendId, setFriendId] = useState("");
  const [userId, setUserId] = useState(undefined);
  const findFriend = () => {
    get("/api/user", { _id: text })
      .then((response) => {
        setSearched(true);
        console.log(text);
        console.log(response);
        if (response) {
          setFriendName(response.user[0].name);
          setFriendId(response.user[0]._id);
          setFound(true);
          console.log(`Friend found: ${response.user[0].name}`);
        } else {
          setFound(false);
          console.log(`Friend not found`);
          console.log(text);
        }
      })
      .catch(() => {
        setFound(false);
        console.log(`Friend not found`);
        console.log(text);
      });
  };
  const addFriend = () => {
    //https://www.w3schools.com/jsref/jsref_includes_array.asp
    console.log(!userFriends.includes(friendId));
    console.log(userFriends);
    console.log(friendId);
    if (!userFriends.includes(friendId)) {
      post("/api/friends", { userId: props.userId, friends: userFriends.concat(friendId) }).then(
        () => {
          setUserFriends(userFriends.concat(friendId));
        }
      );
    } else {
      alert("friend already added!");
    }
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    console.log(props.userId);
  }, [props.useEffect]);
  useEffect(() => {
    setUserId(props.userId);
    console.log("useEffect time");
    console.log(props.userId);
    if (userFriends.length == 0) {
      get("/api/friends", { userId: props.userId }).then((content) => {
        console.log(content);
        if (content.friends) {
          setUserFriends(content.friends);
        }

        console.log(content);
      });
    }
  });

  const makeFriendEntry = (id, index) => {
    return <FriendEntry key={id} index={index} add={false} />;
  };
  return (
    <div>
      {props.userId || userId ? (
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
      {(props.userId || userId) && searched && found ? (
        <div className="friend">
          <FriendEntry
            value={friendName}
            add={!userFriends.includes(friendId) && friendId !== props.userId}
            addFriend={addFriend}
          />
        </div>
      ) : (
        <></>
      )}
      {(props.userId || userId) && searched && !found ? (
        <h1 className="not-found">Friend not found (check your inputted id!)</h1>
      ) : (
        <></>
      )}
      {props.userId || userId ? (
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
