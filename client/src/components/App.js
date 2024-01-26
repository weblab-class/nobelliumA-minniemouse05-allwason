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

  const [totalExp, setTotalExp] = useState(0);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        console.log("running api/whoami in app.js");
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
    });
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

  ////////////////
  useEffect(() => {
    get("/api/whoami").then((user) => {
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
    });
  });
  ////////////////////

  // useEffect(() => {
  //   post("/api/makeAchievement", {
  //     achievementId: 42,
  //     awardDescription: "test",
  //     awardName: "test",
  //   }).then((achievementData) => {
  //     console.log("achievementData in App.js", achievementData);
  //   });
  // }, []);

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
    console.log(`Logged in as ${decodedCredential.name}`);
    setUserName(decodedCredential.name);
    console.log(userName);
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
  useEffect(() => {
    console.log(userId);
  }, [userId]);
  return (
    <>
      <NavBar
        path="/"
        userName={userName}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
      />
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
          element={<Profile userId={userId} name={userName} totalExp={totalExp} />}
        />

        <Route
          path="/leaderboard/:userId"
          element={<Leaderboard userId={userId} name={userName} />}
        />
        <Route path="/friends/:userId" element={<Friends userId={userId} />} />
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
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Pomodoro togglePomodoro={togglePomodoro} pomodoro={pomodoro} />
    </>
  );
};

export default App;
