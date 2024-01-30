import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import Room from "./pages/Room.js";
import Profile from "./pages/Profile.js";
import Leaderboard from "./pages/Leaderboard.js";
import Friends from "./pages/Friends.js";
import Pomodoro from "./modules/Pomodoro.js";
import { useNavigate } from "react-router-dom";
import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [open, setOpen] = useState("room");
  const [totalExp, setTotalExp] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [story, setStory] = useState({ text: "generating...", length: 0 });
  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserName(user.name);
        setTotalExp(user.totalExp);
        // post("/api/updateExp", { name: user.name, userId: user._id, totalExp: 0 });
        // return user;
        // } else {
        //   post("/api/updateExp", { name: user.name, userId: user._id, totalExp: 0 });
        //   return user;
        // }
      }
    }, []);

    // .then((user) => {
    //   console.log("user then", user);
    //   if (user._id) {
    //     post("/api/updateExp", { name: user.name, userId: user._id, totalExp: 0 });
    //     return user;
    //   }
    // });
    // .then((user) => {
    //   if (user._id) {
    //     console.log("running get(/api/exp in app.js");
    //     get("/api/exp", { userId: user._id }).then((userprofiles) => {
    //       console.log("App.js totalExp", userprofiles.totalExp);
    //       setTotalExp(userprofiles.totalExp);
    //     });
    //   }
    // })
    // .catch((error) => {
    //   console.error("Error when running get for api/exp:", error);
    // });
  }, []);
  useEffect(() => {
    if (totalExp >= 5) {
      post("/api/addAchievement", { achievementId: 6, _id: userId });
    }
    if (totalExp >= 25) {
      post("/api/addAchievement", { achievementId: 0, _id: userId });
    }
    if (totalExp >= 50) {
      post("/api/addAchievement", { achievementId: 2, _id: userId });
    }
    if (totalExp >= 125) {
      post("/api/addAchievement", { achievementId: 3, _id: userId });
    }
  }, [userId, totalExp]);
  ////////////////
  useEffect(() => {
    const setup = async () => {
      let user = await get("/api/whoami");

      if (user._id) {
        get("/api/exp", { userId: user._id })
          .then((userInfo) => {
            //console.log("userprofiles display.js", userprofiles.totalExp);
            setTotalExp(userInfo.totalExp);
          })
          .catch((error) => {
            console.error("Error when running get for api/exp:", error);
          });
      }

      let res = await get("/api/friends", { userId: userId });
      if (res.friends.length > 0) {
        post("/api/addAchievement", { achievementId: 7, _id: userId });
      }
    };
  });
  ////////////////////

  /*useEffect(() => {
    post("/api/makeAchievement", {
      achievementId: 6,
      awardDescription:
        "You've officially embarked on your journey to success by completing your very 1st to-do item with RoomCraft!",
      awardName: "First Steps",
    }).then((achievementData) => {
      console.log("achievementData in App.js", achievementData);
    });
  }, []);*/

  // useEffect(() => {
  //   get("/api/getAchievement", { achievementId: 0 }).then((achievementData) => {
  //     console.log("achievementData in App.js", achievementData);
  //   });
  // }, []);

  // useEffect(() => {
  //   get("/api/getAllAchievement").then((achievementData) => {
  //     console.log("achievementData in App.js", achievementData);
  //   });
  // }, []);
  const [pomodoro, setPomodoro] = useState(false);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    setUserName(decodedCredential.name);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };
  const togglePomodoro = () => {
    setPomodoro(!pomodoro);
  };
  const handleLogout = () => {
    setUserId(undefined);
    setPomodoro(false);
    post("/api/logout");
  };

  var ESCAPE_KEY = 27;
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener("keydown", _handleKeyDown, true);
  }, []);
  const _handleKeyDown = (event) => {
    if (event.keyCode === ESCAPE_KEY) {
      navigate("/");
      console.log("back to home");
    }
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Room
              open={"room"}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
              name={userName}
              totalExp={totalExp}
              togglePomodoro={togglePomodoro}
            />
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <>
              <NavBar
                path="/"
                userName={name}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={userId}
              />
              <Profile
                generating={generating}
                setGenerating={setGenerating}
                userId={userId}
                name={userName}
                totalExp={totalExp}
              />
            </>
          }
        />

        <Route
          path="/leaderboard/:userId"
          element={
            <>
              <NavBar
                path="/"
                userName={userName}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={userId}
              />
              <Leaderboard userId={userId} name={userName} totalExp={totalExp} />
            </>
          }
        />
        <Route
          path="/friends/:userId"
          element={
            <>
              <NavBar
                path="/"
                userName={userName}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                userId={userId}
              />
              <Friends userId={userId} />
            </>
          }
        />
        <Route
          path="/todo"
          element={
            <Room
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              open={"todo"}
              userId={userId}
              name={userName}
              totalExp={totalExp}
            />
          }
        />
        <Route
          path="/notebook"
          element={
            <Room
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              open={"notebook"}
              userId={userId}
              name={userName}
              totalExp={totalExp}
              togglePomodoro={togglePomodoro}
            />
          }
        />
        <Route
          path="/calendar"
          element={
            <Room
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              open={"calendar"}
              userId={userId}
              name={userName}
              totalExp={totalExp}
              togglePomodoro={togglePomodoro}
            />
          }
        />
        <Route
          path="/music"
          element={
            <Room
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              open={"music"}
              userId={userId}
              name={userName}
              totalExp={totalExp}
              togglePomodoro={togglePomodoro}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Pomodoro togglePomodoro={togglePomodoro} pomodoro={pomodoro} userId={userId} />
    </>
  );
};

export default App;
