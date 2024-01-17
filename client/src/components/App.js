import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Room from "./pages/Room.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);
  const [userName, setUserName] = useState(undefined);
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

  return (
    <>
      <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <Routes>
        <Route path="/" element={<Room path="/" userId={userId} name={userName} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
