import React, { useEffect } from "react";

import "../../utilities.css";
import "./Leaderboard.css";
import { useNavigate } from "react-router-dom";
const Leaderboard = ({ userId }) => {
  const navigate = useNavigate();
  return (
    <div>
      {userId ? (
        <div className="ranking">
          <a>
            <img src="https://i.ibb.co/G3wW9jq/leaderboard.png" alt="leaderboard" />
          </a>
        </div>
      ) : (
        <div className="login">{navigate("/")}</div>
      )}
    </div>
  );
};

export default Leaderboard;
