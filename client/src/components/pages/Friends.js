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
      if (response && response.user && response.user[0]) {
        setFriendName(response.user[0].name);
        setFriendId(response.user[0]._id);
        setFound(true);
        let newDict = { ...userDict };
        //console.log(newDict);
        newDict[text] = response.user[0];
        setUserDict(newDict);
      } else {
        setFound(false);
      }
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
        let final = await post("/api/friend_requested", {
          userId: friendId,
          requested: friend_requested.requested.concat(userId),
        });
        setRequests(requests.concat(friendId));
      }
      updateRequests();
    } else {
      alert("friend already added!");
    }
  };
  const removeFriend = async (reqId) => {
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

    if (requested.includes(acceptId)) {
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
      alert("friend already added!");
    }
  };
  //https://www.w3schools.com/jsref/jsref_includes_array.asp
  const acceptRequest = async (acceptId) => {
    if (!userFriends.includes(acceptId)) {
      const updateRequests = async () => {
        let req1 = await post("/api/friends", {
          userId: props.userId,
          friends: userFriends.concat(acceptId),
        });
        let friend = await get("/api/friends", { userId: acceptId });

        if (!friend.friends) {
          friend = { friends: [] };
        }

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
          requested: requested.filter((person) => person !== acceptId),
        });

        let friend_request = await get("/api/friends", { userId: acceptId });

        if (!friend_request.requests) {
          friend_request = { requests: [] };
        }

        let final2 = await post("/api/friend_request", {
          userId: acceptId,
          requests: friend_request.requests.filter((person) => person !== props.userId),
        });

        setRequested(requested.filter((person) => person !== acceptId));
      };
      updateRequests();
    } else {
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
    if (userDict[friend_id] === undefined) {
      get("/api/user", { _id: friend_id }).then((response) => {
        let newDict = { ...userDict };
        newDict[friend_id] = response.user[0];
        setUserDict((old) => newDict);
      });
    }
  };

  useEffect(() => {
    const init = async () => {
      setUserId(props.userId);
      let newDict = { ...userDict };
      if (userFriends.length == 0 && requests.length == 0 && requested.length == 0) {
        let content = await get("/api/friends", { userId: props.userId });

        //console.log(content);
        if (Object.keys(content).length !== 0) {
          if (content.friends) {
            setUserFriends(content.friends);

            for (let i = 0; i < content.friends.length; i++) {
              let friend_id = content.friends[i];

              if (userDict[friend_id] === undefined) {
                let response = await get("/api/user", { _id: friend_id });
                newDict[friend_id] = response.user[0];
              }
            }
          }
          if (content.friends && content.friends.length > 0) {
            let x = await post("/api/addAchievement", { achievementId: 7, _id: userId });
          }
          if (content.friends && content.friends.length >= 5) {
            let x = await post("/api/addAchievement", { achievementId: 5, _id: userId });
          }
          if (content.friends && content.friends.length >= 10) {
            let x = await post("/api/addAchievement", { achievementId: 8, _id: userId });
          }
          //console.log(newDict);
          if (content.requests) {
            setRequests(content.requests);

            for (let i = 0; i < content.requests.length; i++) {
              let friend_id = content.requested[i];
              if (userDict[friend_id] === undefined) {
                let response = await get("/api/user", { _id: friend_id });
                if (response.user) {
                  newDict[friend_id] = response.user[0];
                }
              }
            }
          }
          //console.log(newDict);
          if (content.requested) {
            setRequested(content.requested);

            for (let i = 0; i < content.requested.length; i++) {
              let friend_id = content.requested[i];
              if (userDict[friend_id] === undefined) {
                let response = await get("/api/user", { _id: friend_id });
                newDict[friend_id] = response.user[0];
              }
            }
          }
          setUserDict((old) => newDict);
          console.log(newDict);
        } else {
          let req1 = await post("/api/friends", {
            userId: props.userId,
            friends: [],
          });
          let req2 = await post("/api/friend_requested", {
            userId: props.userId,
            requested: [],
          });

          let final2 = await post("/api/friend_request", {
            userId: props.userId,
            requests: [],
          });
        }
      }
    };
    init();
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
  return (
    <div>
      {props.userId ? (
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

      {props.userId ? (
        <div className="requests">
          <h1 className="friend-text">{friendText}</h1>
          {requested.map((friend_id, ind) => {
            return makeRequestEntry(friend_id, ind, true);
          })}
        </div>
      ) : (
        <></>
      )}
      {props.userId && searched && found ? (
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
      {props.userId && searched && !found ? (
        <h1 className="not-found">Friend not found (check your inputted id!)</h1>
      ) : (
        <></>
      )}
      {props.userId ? (
        <>
          <div className="friend-list u-flex-justifyCenter u-flex-vertical ">
            {userFriends.map((friend_id, ind) => {
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
