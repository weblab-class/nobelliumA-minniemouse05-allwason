import React, { useEffect } from "react";

import "../../utilities.css";
import "./Room.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "154522575589-2rkfiiho0carquu6j4suu809fsc5cnuc.apps.googleusercontent.com";

const Room = ({ userId, name }) => {
  console.log(name);
  return (
    <div>
      <div className="welcome">
        {userId ? (
          <>
            <h1>Welcome, {name}</h1>
            <div className="room button-overlay">
              <img id="roomdisplay" src="https://i.redd.it/s7i5m1g62if61.png" />
              <button id="notebook">notebook</button>
              <button id="todo">To do List</button>
            </div>
          </>
        ) : (
          <h1>login</h1>
        )}
      </div>
    </div>
  );
};

export default Room;
