import React, { useEffect } from "react";
import { get, post } from "../../utilities.js";

import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import { useState } from "react";
import "../../utilities.css";
import "./NavBar.css";

/**
 * NavBar is a component for displaying navigation bar
 *
 * Parent: App
 *
 * Proptypes
 * @param {string} userId
 * @param {function} handleLogout
 * @param {function} handleLogin
 */
//tooltip code and styling: https://blog.logrocket.com/creating-beautiful-tooltips-with-only-css/
const GOOGLE_CLIENT_ID = "154522575589-2rkfiiho0carquu6j4suu809fsc5cnuc.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <nav className="NavBar">
      <div className="NavBar-linkContainer u-flex u-flex-alignCenter ">
        <h1 className="u-xlarge pl-20 pr-20">RoomCraft</h1>
        {userId && !collapse && (
          <>
            <Link to="/" className="NavBar-link pl-15 pr-15">
              <span data-text="Home" className="tooltip">
                <span class="material-symbols-outlined">home</span>
              </span>
            </Link>
            <Link to={`/profile/${userId}`} className="NavBar-link pl-15 pr-15">
              <span data-text="Profile" className="tooltip">
                <span className="material-symbols-outlined">person</span>
              </span>
            </Link>
            <Link to="/" className="NavBar-link pl-15 pr-15">
              <span data-text="Friends" className="tooltip">
                <span className="material-symbols-outlined">group</span>
              </span>
            </Link>
            <Link to="/leaderboard" className="NavBar-link pl-15 pr-15">
              <span data-text="Leaderboard" className="tooltip">
                <span className="material-symbols-outlined">leaderboard</span>
              </span>
            </Link>
          </>
        )}

        <div className="pl-15 pr-15">
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {userId ? (
              <button
                onClick={() => {
                  googleLogout();
                  handleLogout();
                }}
              >
                Logout
              </button>
            ) : (
              <></>
            )}
          </GoogleOAuthProvider>
        </div>
        {userId && (
          <button
            id="collapse"
            onClick={() => {
              setCollapse(!collapse);
              console.log(collapse);
            }}
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
