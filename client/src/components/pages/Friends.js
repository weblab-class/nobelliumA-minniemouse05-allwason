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
  const [requests, setRequests] = useState([]);
  const [requested, setRequested] = useState([]);
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
  const addFriend = (async) => {
    //https://www.w3schools.com/jsref/jsref_includes_array.asp
    if (!requests.includes(friendId)) {
      async function updateRequests() {
        if (!requests) {
          requests = [];
        }
        let req = await post("/api/friend_request", {
          userId: props.userId,
          requests: requests.concat(friendId),
        });
        let friend_requested = await get("/api/friends", { userId: friendId });

        if (!friend_requested.requested) {
          friend_requested = { requested: [] };
        }
        console.log(friend_requested);
        let final = await post("/api/friend_requested", {
          userId: friendId,
          requested: friend_requested.requested.concat(userId),
        });
        setRequests(requests.concat(friendId));
      }
      updateRequests();
    } else {
      /*post("/api/friends", { userId: props.userId, friends: userFriends.concat(friendId) }).then(
        () => {
          setUserFriends(userFriends.concat(friendId));
        }
      );*/
      alert("friend already added!");
    }
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const removeRequest = (async) => {
    //https://www.w3schools.com/jsref/jsref_includes_array.asp
    if (requests.includes(friendId)) {
      async function updateRequests() {
        if (!userFriends) {
          userFriends = [];
        }
        let req = await post("/api/friend_request", {
          userId: props.userId,
          requests: requests.filter(function (person) {
            return person !== friendId;
          }),
        });
        let friend_requested = await get("/api/friends", { userId: friendId });

        if (!friend_requested.requested) {
          friend_requested = { requested: [] };
        }
        console.log(friend_requested);
        let final = await post("/api/friend_requested", {
          userId: friendId,
          requested: requests.filter(function (person) {
            return person !== userId;
          }),
        });
        setRequests(
          requests.filter(function (person) {
            return person !== friendId;
          })
        );
      }
      updateRequests();
    } else {
      /*post("/api/friends", { userId: props.userId, friends: userFriends.concat(friendId) }).then(
        () => {
          setUserFriends(userFriends.concat(friendId));
        }
      );*/
      alert("friend already added!");
    }
  };

  useEffect(() => {
    setUserId(props.userId);
    if (userFriends.length == 0 || requests.length == 0) {
      get("/api/friends", { userId: props.userId }).then((content) => {
        if (content.friends) {
          setUserFriends(content.friends);
        }
        if (content.requests) {
          setRequests(content.requests);
        }
        if (content.requested) {
          setRequested(content.requested);
        }
      });
    }
  });

  const makeFriendEntry = (id, index, request) => {
    return <FriendEntry key={id} index={index} add={false} request={request} />;
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
            add={
              !userFriends.includes(friendId) &&
              !requests.includes(friendId) &&
              friendId !== props.userId
            }
            requested={requests.includes(friendId)}
            addFriend={addFriend}
            removeRequest={removeRequest}
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
        <div>
          {requested.map((friend_id, ind) => {
            //console.log(ind);
            return makeFriendEntry(friend_id, ind, true);
          })}
        </div>
      ) : (
        <></>
      )}
      {props.userId || userId ? (
        <>
          <div className="friend-list u-flex-justifyCenter u-flex-vertical ">
            {userFriends.map((friend_id, ind) => {
              //console.log(ind);
              return makeFriendEntry(friend_id, ind, false);
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
