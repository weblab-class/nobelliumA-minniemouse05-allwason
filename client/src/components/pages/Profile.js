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
 * @param totalExp
 *
 * TO ADD???!!!!!!!
 * @param {string} achievementArray //array
 */

const Profile = (props) => {
  const navigate = useNavigate();

  // const [achievementData, setAchievementData] = useState([
  //   { award: "Join RoomCraft", hasAttained: true, expValue: 50 },
  //   { award: "Create 1st To-Do List", hasAttained: false, expValue: 50 },
  //   { award: "Create 1st Notebook", hasAttained: false, expValue: 50 },
  //   { award: "Reach 42 exp", hasAttained: false, expValue: 42 },
  //   { award: "Reach 314 exp", hasAttained: false, expValue: 314 },
  //   { award: "Reach 420 exp", hasAttained: false, expValue: 420 },
  // ]);

  const [achievementData, setAchievementData] = useState([]);

  useEffect(() => {
    get("/api/userAchievements", { _id: props.userId }).then((achIdData) => {
      console.log("profile.js achData", achIdData);
      setAchievementData(achIdData);
    });
  }, []);

  useEffect(() => {
    if (props.totalExp >= 10) {
      post("/api/addAchievement", { achievementId: 0, _id: props.userId });
    }
  }, []);

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
                    {achievementData && achievementData.length > 0 ? (
                      achievementData.map((ach) => (
                        <SingleAchievement
                          awardDescription={ach.awardDescription}
                          awardName={ach.awardName}
                          achievementId={ach.achievementId}
                        />
                      ))
                    ) : (
                      <h1 className="u-textCenter">
                        No achievements collected so far. Keep going!
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-half">
              <div className="userId u-flex">
                <h1>UserId: {props.userId}</h1>
              </div>
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
