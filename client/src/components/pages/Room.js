import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities.js";

import "../../utilities.css";
import "./Room.css";
import Display from "./Display.js";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import key from "./../../../dist/key-right.png";
import room from "./../../../dist/room.png";
import Game from "./Game.js";
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

const Room = ({ togglePomodoro, totalExp, userId, name, open, handleLogin, handleLogout, _id }) => {
  // useEffect(() => {
  //   console.log("Room.js useEffect", name, userId);
  //   post("/api/updateExp", { name: name, userId: userId, totalExp: 0 });
  // }, []);
  /* */
  return (
    <div>
      <div className="welcome">
        {userId ? (
          <>
            {/*<Display
              className="display"
              open={open}
              userId={userId}
              name={name}
              totalExp={totalExp}
              togglePomodoro={togglePomodoro}
        />*/}
            <Game />
          </>
        ) : (
          <div className="u-flex u-flex-justifyCenter u-flex-alignCenter login">
            <img className="key_img pr-15" src={key} />
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
            </GoogleOAuthProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
