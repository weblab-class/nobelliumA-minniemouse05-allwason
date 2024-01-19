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
      <div className="NavBar-linkContainer u-flex u-flex-alignCenter">
        <h1 className="u-xlarge u-primary pl-8 pr-8">RoomCraft</h1>
        {userId && (
          <Link to="/" className="NavBar-link pl-6 pr-6">
            Home
          </Link>
        )}

        {userId && (
          <Link to={`/profile/${userId}`} className="NavBar-link pl-6 pr-6">
            Profile
          </Link>
        )}
        {userId && (
          <Link to="/leaderboard" className="NavBar-link pl-6 pr-6">
            Leaderboard
          </Link>
        )}
        <div className="pl-6 pr-6">
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
              <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
            )}
          </GoogleOAuthProvider>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
