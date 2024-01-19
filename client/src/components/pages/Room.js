import React, { useState, useEffect } from "react";

import "../../utilities.css";
import "./Room.css";
import Display from "./Display.js";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "154522575589-2rkfiiho0carquu6j4suu809fsc5cnuc.apps.googleusercontent.com";

const Room = ({ userId, name, open }) => {
  return (
    <div>
      <div className="welcome">
        {userId ? (
          <>
            <h1 className="textdisplay">{name}'s Room</h1>
            <Display open={open} />
          </>
        ) : (
          <h1>login</h1>
        )}
      </div>
    </div>
  );
};

export default Room;
