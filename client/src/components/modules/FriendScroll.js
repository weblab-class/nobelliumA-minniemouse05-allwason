import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./FriendScroll.css";
import { get, post } from "../../utilities";
const FriendScroll = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [nameArray, setNameArray] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      let arr = [];
      for (let i = 0; i < props.friends.length; i++) {
        console.log("Fetching user for ID:", props.friends[i]);
        try {
          let response = await get("/api/user", { _id: props.friends[i] });
          console.log("Response for user ID", props.friends[i], ":", response.user[0]);
          console.log(response.user[0].name);
          arr.push(response.user[0].name);
          console.log(arr);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      console.log("Final names array:", arr);
      setNameArray(arr);
    };
    getFriends();
  }, []);
  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  const handleFolderChange = (folder) => {
    props.handleFolderChange(folder, props.entry);
    setExpanded(false); // Close dropdown after selection
  };
  const sharePage = (ind) => {
    post("/api/newEntry", {
      text: props.entry.text,
      header: props.entry.header,
      folder: "Shared",
      userId: props.friends[ind],
    }).then(() => console.log("posted"));

    setExpanded(false);
  };

  return (
    <div className="scroll-container-friend u-flexColumn">
      <button onClick={toggleDropdown}>
        <span class="material-symbols-outlined">send</span>
      </button>
      {expanded && (
        <div className="dropdown-content">
          {props.friends.map((friend, ind) => (
            <button
              key={friend}
              onClick={() => {
                sharePage(ind);
              }}
            >
              {nameArray[ind]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendScroll;
