import React, { useEffect } from "react";

import "../../utilities.css";
import "./Notebook.css";
const Notebook = ({ userId }) => {
  return userId ? (
    <div>
      <h1>Notebook</h1>
    </div>
  ) : (
    <h1>Login first</h1>
  );
};
export default Notebook;
