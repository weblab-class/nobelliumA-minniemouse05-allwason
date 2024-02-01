import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";
import bear from "./../../../dist/bear.png";
import "../../utilities.css";
import "./Profile.css";
import { generatePath, useNavigate } from "react-router-dom";
import SingleAchievement from "../modules/SingleAchievement.js";

/**
 * Component to render a single comment
 *
 * Parent: App.js
 *
 * Proptypes
 * @param {string} userId
 * @param {string} name
 * @param {number} totalExp
 *
 */

const Profile = (props) => {
  const navigate = useNavigate();

  //achievementData: array of ID's
  const [achievementData, setAchievementData] = useState([]);
  const [achievementInfo, setAchievementInfo] = useState([]);
  const [userExp, setUserExp] = useState(0);
  const [content, setContent] = useState(<></>);
  const [story, setStory] = useState({
    latest: "",
    text: "generating... (stay on this page!)",
    length: 0,
  });
  const [loaded, setLoaded] = useState(false);
  const [button1, setButton1] = useState("#a1c374");
  const [button2, setButton2] = useState("#bddeb3");
  const [storyText, setStoryText] = useState("");

  // [{awardName: test, awardDescription: test}]
  //array of objects
  const [displayMode, setDisplayMode] = useState("Achievements");
  useEffect(() => {
    //console.log("props.userId in 1st useEffect", props.userId);

    get("/api/userAchievements", { _id: props.userId }).then((achIdData) => {
      setAchievementData(achIdData);
      //console.log("just setAchievementData", achievementData);
    });
  }, [props.userId]);
  useEffect(() => {
    const storyGenerate = async () => {
      let x = await get("/api/story", { userId: props.userId });
      //console.log(x[0]);
      if (x.length > 0 && x[0].text) {
        setStory(x[0]);
        setStoryText(x[0].text);
      } else {
        setStory({
          text: "The story has yet to begin. Earn achievements to unlock chapters.",
          length: 0,
          latest: "",
        });
        setStoryText("The story has yet to begin. Earn achievements to unlock chapters.");
      }
      setLoaded(true);
    };
    storyGenerate();
  }, []);
  useEffect(() => {
    //console.log(props.generating);
  }, [props.generating]);
  useEffect(() => {
    //console.log(story);
  }, [story]);
  useEffect(() => {
    //console.log(achievementData, story);

    if (loaded && achievementData && achievementData.length > story.length && !props.generating) {
      setStoryText("generating... (stay on this page!)");
      props.setGenerating(true);
      if (story.length == 0) {
        get("/api/generate", {
          content: "This is chapter 1 of the story: ",
          userName: props.name,
        }).then((response) => {
          //console.log("posting");
          post("/api/story", {
            userId: props.userId,
            length: story.length + 1,
            latest: response.message.content,
            text: "\n\n" + response.message.content,
          }).then(() => {
            setStory({
              length: story.length + 1,
              text: response.message.content,
              latest: response.message.content,
            });
            setStoryText(response.message.content);
            //console.log(response);
            //console.log(response.message);
            props.setGenerating(false);
          });
        });
      } else {
        props.setGenerating(true);
        get("/api/generate", {
          userName: props.name,
          content:
            "This is the latest chapter: '" +
            story.latest +
            `' This is chapter: ${story.length + 1}`,
        }).then((response) => {
          //console.log("posting with story existing");
          post("/api/story", {
            userId: props.userId,
            length: story.length + 1,
            latest: response.message.content,
            text: story.text + "\n\n" + response.message.content,
          }).then(() => {
            setStory({
              text: story.text + "\n\n" + response.message.content,
              length: story.length + 1,
              latest: response.message.content,
            });
            setStoryText(story.text + "\n\n" + response.message.content);
            props.setGenerating(false);
            //console.log(response);
            //console.log(response.message);
          });

          //console.log(response);
          //console.log(response.message);
        });
      }
    }
  }, [achievementData, story, props.generating]);

  useEffect(() => {
    // Create an array to store promises
    const fetchPromises = achievementData.map((achId) => {
      return get("/api/getAchievement", { achievementId: achId })
        .then((fetchedAward) => {
          return fetchedAward; // Return the fetched data
        })
        .catch((error) => {
          //console.log("setting fetchedAwards as none");
          console.error("Error when running get for api/getAchievement:", error);
          return null; // Handle errors by returning null or an appropriate value
        });
    });

    // Use Promise.all to wait for all fetches to complete
    Promise.all(fetchPromises)
      .then((fetchedAwards) => {
        // Use the fetched awards to update the state
        setAchievementInfo((prevInfo) => [...prevInfo, ...fetchedAwards]);
      })
      .catch((error) => {
        console.error("Error when fetching achievements:", error);
      });
  }, [achievementData, props.userId]);
  useEffect(() => {
    get("/api/user", { _id: props.userId }).then((result) => {
      //console.log("result after get user = ", result);
      //console.log("result[0] after get user = ", result[0]);
      setUserExp(result.user[0].totalExp);
      props.setTotalExp(result.user[0].totalExp);
    });
  });
  useEffect(() => {
    console.log(button1);
    if (displayMode === "Achievements") {
      setButton1("#a1c374");
      setButton2("#bddeb3");
      setContent(
        <div>
          <div className="achievement-title-container">
            <img
              className="medal-image"
              src="https://i.ibb.co/pv6ykY2/Screenshot-2024-01-30-at-3-27-15-PM.png"
            />
            <h1 className="achievement-earned-text u-xlarge">Achievements Earned</h1>
          </div>
          <div className="comment-section">
            {achievementInfo && achievementInfo.length > 0 ? (
              achievementInfo.map((ach, index) =>
                makeSingleAchievement(ach.achievementId, ach.awardDescription, ach.awardName, index)
              )
            ) : (
              <h1 className="u-textCenter achievement-text">
                No achievements collected so far. Keep going!
              </h1>
            )}
          </div>
        </div>
      );
    } else {
      setButton2("#a1c374");
      setButton1("#bddeb3");
      setContent(
        <div className="story-container">
          <h1 className="story-title">Story</h1>

          <p className="story-div">{storyText}</p>
        </div>
      );
    }
  }, [achievementInfo, displayMode, story]);
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

  const toggleDisplayMode = () => {
    if (displayMode === "Achievements") {
      setDisplayMode("Story");
    } else {
      setDisplayMode("Achievements");
    }
  };
  return (
    <div>
      {props.userId ? (
        <>
          <div className="profile-container u-flex">
            <div className="left-half">
              <div className="board">
                <div className="custom-scrollbar">{content}</div>
              </div>

              <div className="toggle-button-container u-flex">
                <button
                  className="toggleButton"
                  onClick={() => {
                    setDisplayMode("Achievements");
                  }}
                  style={{ "background-color": button1 }}
                >
                  Achievements
                </button>
                <button
                  className="toggleButton"
                  style={{ "background-color": button2 }}
                  onClick={() => {
                    setDisplayMode("Story");
                  }}
                >
                  Story
                </button>
              </div>
            </div>
            <div className="right-half">
              <div className="profile-image-text-container">
                <img
                  src="https://i.ibb.co/h83sQhL/Screenshot-2024-01-30-at-11-57-01-AM.png"
                  alt="bear"
                  className="avatar-image"
                />
                <div className="all-caps profile-overlay-text">{props.name}</div>
              </div>
              <div className="user-box">
                <div className="exp">
                  Total exp earned to date: <span className="accent">{userExp}</span>
                </div>
                <div className="new-userid">
                  {" "}
                  UserId: <span className="accent">{props.userId}</span>
                </div>
              </div>
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
