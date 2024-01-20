import React, { useEffect, useState } from "react";

import "../../utilities.css";
import "./Notebook.css";
import NotebookUnit from "../modules/NotebookUnit";
import Header from "../modules/Header";
import { useNavigate } from "react-router-dom";
import NotebookEntry from "../modules/NotebookEntry.js";
const Notebook = ({ userId }) => {
  const [mode, setMode] = useState("page");
  const navigate = useNavigate;
  const changeMode = (value) => {
    setMode(value);
  };
  let content;
  if (mode === "page") {
    content = <NotebookEntry _id={userId} entryIndex={0} changePage={changeMode} />;
  } else {
    content = <NotebookUnit />;
  }
  return userId ? <div>{content} </div> : <>{navigate("/")}</>;
};
export default Notebook;
