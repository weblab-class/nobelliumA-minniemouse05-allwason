import React, { useEffect, useState } from "react";

import "../../utilities.css";
import "./Notebook.css";
import Header from "../modules/Header";
import { useNavigate } from "react-router-dom";
import NotebookEntry from "../modules/NotebookEntry.js";
const Notebook = ({ userId }) => {
  const navigate = useNavigate;
  return userId ? (
    <div>
      <NotebookEntry />
    </div>
  ) : (
    { navigate }
  );
};
export default Notebook;
