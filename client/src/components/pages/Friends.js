import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";
import { useRef } from "react";
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
  const [userDict, setUserDict] = useState({});
  const userDictRef = useRef();
  userDictRef.current = userDict;
  const findFriend = () => {
    get("/api/user", { _id: text }).then((response) => {
      setSearched(true);
      console.log(text);
      console.log(response);
      if (response.user) {
        setFriendName(response.user[0].name);
        setFriendId(response.user[0]._id);
        setFound(true);
        console.log(`Friend found: ${response.user[0].name}`);
        console.log(response.user[0]);
        let newDict = { ...userDict };
        newDict[text] = response.user[0];
        setUserDict(newDict);
        console.log(userDict);
      } else {
        setFound(false);
        console.log(`Friend not found`);
        console.log(text);
      }
    });
  };
  useEffect(() => {
    console.log(userDict[text]);
  }, []);
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
  const removeFriend = async (reqId) => {
    console.log("called");
    console.log(reqId);
    if (userFriends.includes(reqId)) {
      async function remove() {
        let req1 = await post("/api/friends", {
          userId: props.userId,
          friends: userFriends.filter(function (person) {
            return person !== reqId;
          }),
        });
        let friendlist = await get("/api/friends", {
          userId: reqId,
        });
        if (!friendlist) {
          friendlist = { friends: {} };
        }
        console.log(friendlist.friends);
        console.log(
          friendlist.friends.filter(function (person) {
            return person !== props.userId;
          })
        );
        console.log(props.userId);
        console.log(reqId);
        let req2 = await post("/api/friends", {
          userId: reqId,
          friends: friendlist.friends.filter(function (person) {
            return person !== props.userId;
          }),
        });
        setUserFriends(
          userFriends.filter(function (person) {
            return person !== reqId;
          })
        );
      }
      remove();
    } else {
      alert("user is not in friends");
    }
  };
  const denyRequest = async (acceptId) => {
    //https://www.w3schools.com/jsref/jsref_includes_array.asp
    console.log(requested);
    console.log(acceptId);

    if (requested.includes(acceptId)) {
      console.log(acceptId);
      async function updateRequests() {
        let req2 = await post("/api/friend_requested", {
          userId: props.userId,
          requested: requested.filter(function (person) {
            return person !== acceptId;
          }),
        });
        let friend_request = await get("/api/friends", { userId: acceptId });

        if (!friend_request.requests) {
          friend_request = { requests: [] };
        }
        console.log(friend_request);
        console.log(props.userId);
        console.log(acceptId);
        let final2 = await post("/api/friend_request", {
          userId: acceptId,
          requests: friend_request.requests.filter(function (person) {
            return person !== props.userId;
          }),
        });
        setRequested(
          requested.filter(function (person) {
            return person !== acceptId;
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
  const acceptRequest = async (acceptId) => {
    //https://www.w3schools.com/jsref/jsref_includes_array.asp
    if (!userFriends.includes(acceptId)) {
      console.log(acceptId);
      async function updateRequests() {
        if (!requests) {
          requests = [];
        }
        let req1 = await post("/api/friends", {
          userId: props.userId,
          friends: userFriends.concat(acceptId),
        });
        let friend = await get("/api/friends", { userId: acceptId });

        if (!friend.friends) {
          friend = { friends: [] };
        }
        console.log(friend);
        let final1 = await post("/api/friends", {
          userId: acceptId,
          friends: friend.friends.concat(props.userId),
        });
        setRequests(userFriends.concat(acceptId));
        if (!userFriends) {
          userFriends = [];
        }
        let req2 = await post("/api/friend_requested", {
          userId: props.userId,
          requested: requested.filter(function (person) {
            return person !== acceptId;
          }),
        });
        let friend_request = await get("/api/friends", { userId: acceptId });

        if (!friend_request.requests) {
          friend_request = { requests: [] };
        }
        console.log(friend_request);
        console.log(props.userId);
        console.log(acceptId);
        let final2 = await post("/api/friend_request", {
          userId: acceptId,
          requests: friend_request.requests.filter(function (person) {
            return person !== props.userId;
          }),
        });
        setRequested(
          requested.filter(function (person) {
            return person !== acceptId;
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
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const removeRequest = (async) => {
    //https://www.w3schools.com/jsref/jsref_includes_array.asp
    if (requests.includes(friendId) || requested.includes(friendId)) {
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
        setRequested(
          requested.filter(function (person) {
            return person !== friendId;
          })
        );
      }
      updateRequests();
    }
  };
  const populateInfo = (friend_id) => {
    console.log(friend_id);
    if (userDict[friend_id] === undefined) {
      get("/api/user", { _id: friend_id }).then((response) => {
        let newDict = { ...userDict };
        newDict[friend_id] = response.user[0];
        setUserDict(newDict);
        console.log(userDict);
      });
    }
  };

  useEffect(() => {
    setUserId(props.userId);
    if (userFriends.length == 0 && requests.length == 0 && requested.length == 0) {
      get("/api/friends", { userId: props.userId }).then((content) => {
        if (content.friends) {
          setUserFriends(content.friends);
          for (let i = 0; i < content.friends.length; i++) {
            populateInfo(content.friends[i]);
          }
        }

        if (content.requests) {
          setRequests(content.requests);
          for (let i = 0; i < content.requests.length; i++) {
            populateInfo(content.requests[i]);
          }
        }

        if (content.requested) {
          console.log(content.requested);
          setRequested(content.requested);
          for (let i = 0; i < content.requested.length; i++) {
            populateInfo(content.requested[i]);
            console.log(content.requested[i]);
          }
        }
      });
    }
  });
  let friendText = "";
  if (requested.length == 0) {
    friendText = "No incoming friend requests.";
  } else {
    friendText = "Friend requests:";
  }
  const makeFriendEntry = (id, index, isRequest) => {
    return (
      <FriendEntry
        key={id}
        index={index}
        add={false}
        isRequest={isRequest}
        setFriendId={setFriendId}
        removeFriend={removeFriend}
        requestId={userFriends[index]}
        info={userDict[id]}
        userId={userId}
      />
    );
  };
  const makeRequestEntry = (id, index, isRequest) => {
    return (
      <FriendEntry
        key={id}
        index={index}
        add={false}
        isRequest={isRequest}
        setFriendId={setFriendId}
        requestId={requested[index]}
        acceptRequest={acceptRequest}
        denyRequest={denyRequest}
        removeFriend={removeFriend}
        info={userDict[id]}
        userId={userId}
      />
    );
  };
  //console.log(`text:${text}, friendId: ${friendId}, userDict: ${userDict} userDict[text]`);
  //console.log(userDictRef.current[text]);
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

      {props.userId || userId ? (
        <div className="requests">
          <h1>{friendText}</h1>
          {requested.map((friend_id, ind) => {
            //console.log(ind);
            return makeRequestEntry(friend_id, ind, true);
          })}
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
            request={requests.includes(friendId)}
            addFriend={addFriend}
            acceptRequest={acceptRequest}
            removeFriend={removeFriend}
            removeRequest={removeRequest}
            isRequest={requested.includes(friendId)}
            requestId={friendId}
            denyRequest={denyRequest}
            info={userDict[friendId]}
            userId={props.userId}
            key={friendId}
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
