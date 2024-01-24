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
 */

const Profile = (props) => {
  const navigate = useNavigate();

  //achievementData: array of ID's
  const [achievementData, setAchievementData] = useState([]);
  const [achievementInfo, setAchievementInfo] = useState([]);
  // [{awardName: test, awardDescription: test}]
  //array of objects

  useEffect(() => {
    get("/api/userAchievements", { _id: props.userId }).then((achIdData) => {
      setAchievementData(achIdData);
      console.log("just setAchievementData", achievementData);
    });
  }, [props.userId]);

  useEffect(() => {
    if (props.totalExp >= 5) {
      post("/api/addAchievement", { achievementId: 6, _id: props.userId });
    }
    if (props.totalExp >= 10) {
      post("/api/addAchievement", { achievementId: 0, _id: props.userId });
    }
    if (props.totalExp >= 50) {
      post("/api/addAchievement", { achievementId: 2, _id: props.userId });
    }
    if (props.totalExp >= 125) {
      post("/api/addAchievement", { achievementId: 3, _id: props.userId });
    }
  }, [props.totalExp]);

  useEffect(() => {
    console.log("use effect for achievementData", achievementData);

    // Create an array to store promises
    const fetchPromises = achievementData.map((achId) => {
      return get("/api/getAchievement", { achievementId: achId })
        .then((fetchedAward) => {
          console.log("fetchedAward= ", fetchedAward);
          return fetchedAward; // Return the fetched data
        })
        .catch((error) => {
          console.log("setting fetchedAwards as none");
          console.error("Error when running get for api/getAchievement:", error);
          return null; // Handle errors by returning null or an appropriate value
        });
    });

    // Use Promise.all to wait for all fetches to complete
    Promise.all(fetchPromises)
      .then((fetchedAwards) => {
        // Use the fetched awards to update the state
        setAchievementInfo((prevInfo) => [...prevInfo, ...fetchedAwards]);
        console.log("newAchievementInfo", achievementInfo);
      })
      .catch((error) => {
        console.error("Error when fetching achievements:", error);
      });
  }, [achievementData, props.userId]);

  const makeSingleAchievement = (achievementId, awardDescription, awardName) => {
    return (
      <SingleAchievement
        key={achievementId}
        achievementId={achievementId}
        awardDescription={awardDescription}
        awardName={awardName}
      />
    );
  };

  useEffect(() => {
    console.log("props.userId", props.userId);
  }, [props.userId]);

  return (
    <div>
      {props.userId ? (
        <>
          <div className="profile-container">
            <div className="left-half">
              <div className="board">
                <div className="custom-scrollbar">
                  <h1 className="u-textCenter u-xlarge">Achievements Earned</h1>
                  <div className="comment-section">
                    {achievementInfo && achievementInfo.length > 0 ? (
                      achievementInfo.map((ach, index) =>
                        makeSingleAchievement(
                          ach.achievementId,
                          ach.awardDescription,
                          ach.awardName,
                          index
                        )
                      )
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
              <div className="exp">{"Total exp earned to date: " + props.totalExp}</div>
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
