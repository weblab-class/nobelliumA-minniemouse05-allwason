import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import NavBar from "./modules/NavBar.js";
import Room from "./pages/Room.js";
import Profile from "./pages/Profile.js";
import Leaderboard from "./pages/Leaderboard.js";
import Friends from "./pages/Friends.js";
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

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUserName(user.name);
      }
    });
  }, []);

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
            />
          }
        />
        <Route path="/profile/:userId" element={<Profile userId={userId} name={userName} />} />

        <Route
          path="/leaderboard/:userId"
          element={<Leaderboard userId={userId} name={userName} />}
        />
        <Route path="/friends/:userId" element={<Friends userId={userId} name={userName} />} />
        <Route
          path="/todo"
          element={
            <Room
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              open={"todo"}
              userId={userId}
              name={userName}
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
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
