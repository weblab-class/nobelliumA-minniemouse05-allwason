import React, { useState } from "react";
import "../../utilities.css";
import "./Profile.css";

const Profile = ({ userId, name }) => {
  return (
    <div>
      {userId ? (
        <>
          <section className="container">
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
          </section>
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
