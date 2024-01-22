import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import SingleAchievement from "../modules/SingleAchievement.js";

/**
 * Component to render a single comment
 *
 * Parent: App.js
 *
 * Proptypes
 * @param {string} userId
 * @param {string} name
 * @param {string}
 */

const Profile = (props) => {
  const navigate = useNavigate();

  const [achievementData, setAchievementData] = useState([
    { award: "Joined RoomCraft", hasAttained: true, expValue: 50 },
    { award: "Created 1st To-Do List", hasAttained: false, expValue: 50 },
    { award: "Created 1st Notebook", hasAttained: false, expValue: 50 },
  ]);

  // useEffect(() => {
  //   get("/api/achievements", { userId: props.userId }).then((achData) => {
  //     setAchievementData(achievementData.concat([achData.achievements]));
  //   });
  //   console.log("profile.js useEffect achievementData", achievementData);
  // }, []);

  return (
    <div>
      {props.userId ? (
        <>
          <div className="profile-container">
            <div className="left-half">
              <div className="board">
                <div class="custom-scrollbar">
                  <h1 class="u-textCenter">Achievements</h1>
                  <div class="comment-section">
                    {achievementData?.map((ach) => (
                      <SingleAchievement
                        key={`SingleComment_${ach._id}`}
                        award={ach.award}
                        hasAttained={ach.hasAttained}
                        expValue={ach.expValue}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-half">
              <img
                src="https://static.vecteezy.com/system/resources/previews/027/517/647/original/pixel-art-cute-fat-bear-character-2-png.png"
                alt="bear"
                className="avatar-image"
              />
              <div className="name">{props.name}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="login">{navigate("/")}</div>
        </>
      )}
    </div>
  );
};

export default Profile;
