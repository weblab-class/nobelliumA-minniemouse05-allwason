import React, { useState } from "react";
import "../../utilities.css";
import "./Profile.css";

const Profile = ({ userId, name }) => {
  return (
    <div>
      {userId ? (
        <>
          <div className="name">Hello, {name}</div>
          <img src="https://i.ibb.co/4FNF9LY/bear.webp" alt="bear" className="avatar-image" />
        </>
      ) : (
        <>
          <div className="login">
            <h1>login</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
