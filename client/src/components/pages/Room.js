import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./Room.css";
import Display from "./Display.js";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import key from "./../../../dist/key-right.png";
import room from "./../../../dist/room.png";
import Game from "./Game.js";
import NavBar from "../modules/NavBar.js";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "154522575589-2rkfiiho0carquu6j4suu809fsc5cnuc.apps.googleusercontent.com";

/**
 * Parent: App
 *
 * Proptypes
 * @param {String} name
 * @param {String} userId
 * @param open
 * @param handleLogin
 * @param handleLogout
 * @param _id
 * @param totalExp
 */

const Room = ({
  togglePomodoro,
  setTotalExp,
  totalExp,
  userId,
  name,
  open,
  handleLogin,
  handleLogout,
  _id,
}) => {
  return (
    <div>
      <div className="welcome">
        {userId ? (
          <>
            <NavBar
              path="/"
              userName={name}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
            />
            <Game
              open={open}
              userId={userId}
              name={name}
              totalExp={totalExp}
              setTotalExp={setTotalExp}
              togglePomodoro={togglePomodoro}
            />
          </>
        ) : (
          <div className="login-container login">
            <img
              className="door_img"
              src="https://i.ibb.co/2yLRQRw/Screenshot-2024-01-30-at-2-29-58-PM.png"
            />
            <div className="login-text-container">
              <div className="login-welcome-text"> Welcome to</div>
              <div className="login-roomcraft-text"> RoomCraft! </div>
              <div className="login-directions-text"> use arrow keys to move around the room! </div>
              <div className="login-directions2-text"> click around to interact! </div>
              <div className="key-login-container">
                <img className="key_img pr-15" src={key} />
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                  <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
                </GoogleOAuthProvider>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
