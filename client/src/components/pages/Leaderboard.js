import React, { useEffect } from "react";

import "../../utilities.css";
import "./Leaderboard.css";

const Leaderboard = ({ userId }) => {
  return (
    <div>
      {userId ? (
        <div className="ranking">
          <a>
            <img src="https://i.ibb.co/G3wW9jq/leaderboard.png" alt="leaderboard" />
          </a>
        </div>
      ) : (
        <div className="login">
          <h1>login</h1>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
