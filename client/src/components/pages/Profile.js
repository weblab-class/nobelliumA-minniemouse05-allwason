import React, { useState } from "react";
import "../../utilities.css";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
const Profile = ({ userId, name }) => {
  const navigate = useNavigate();
  return (
    <div>
      {userId ? (
        <>
          <div className="profile-container">
            <div className="left-half">
              <div className="board" />
            </div>
            <div className="right-half">
              <img
                src="https://static.vecteezy.com/system/resources/previews/027/517/647/original/pixel-art-cute-fat-bear-character-2-png.png"
                alt="bear"
                className="avatar-image"
              />
              <div className="name">{name}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="login">{navigate("/")}</div>
        </>
      )}
    </div>
  );
};

export default Profile;
