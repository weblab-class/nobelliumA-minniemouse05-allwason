import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Room.css";
import Display from "./Display.js";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import key from "./../../../dist/key-right.png";
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "154522575589-2rkfiiho0carquu6j4suu809fsc5cnuc.apps.googleusercontent.com";

const Room = ({ userId, name, open, handleLogin, handleLogout, _id }) => {
  return (
    <div>
      <div className="welcome">
        {userId ? (
          <>
            <Display className="display" open={open} userId={userId} />
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
