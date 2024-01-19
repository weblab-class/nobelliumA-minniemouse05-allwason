import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Room.css";
import Display from "./Display.js";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "154522575589-2rkfiiho0carquu6j4suu809fsc5cnuc.apps.googleusercontent.com";

const Room = ({ userId, name, open, handleLogin, handleLogout }) => {
  return (
    <div>
      <div className="welcome">
        {userId ? (
          <>
            <h1 className="textdisplay">{name}'s Room</h1>
            <Display open={open} />
          </>
        ) : (
          <div className="u-flex u-flex-justifyCenter login">
            <img href="../../../dist/key.png" />
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
