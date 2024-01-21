import React from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./NavBar.css";

/**
 * NavBar is a component for displaying navigation bar
 *
 * Proptypes
 * @param {string} userId
 * @param {function} handleLogout
 * @param {function} handleLogin
 */

const GOOGLE_CLIENT_ID = "154522575589-2rkfiiho0carquu6j4suu809fsc5cnuc.apps.googleusercontent.com";

const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <nav className="NavBar">
      <div className="NavBar-linkContainer u-flex u-flex-alignCenter ">
        <h1 className="u-xlarge u-primary pl-20 pr-20">RoomCraft</h1>
        {userId && (
          <Link to="/" className="NavBar-link pl-15 pr-15">
            Home
          </Link>
        )}

        {userId && (
          <Link to={`/profile/${userId}`} className="NavBar-link pl-15 pr-15">
            Profile
          </Link>
        )}
        {userId && (
          <Link to="/" className="NavBar-link pl-15 pr-15">
            <span class="material-symbols-outlined">group</span>
          </Link>
        )}
        {userId && (
          <Link to="/leaderboard" className="NavBar-link pl-15 pr-15">
            Leaderboard
          </Link>
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
      </div>
    </nav>
  );
};

export default NavBar;
