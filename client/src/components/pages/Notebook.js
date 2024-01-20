import React, { useEffect, useState } from "react";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "./Notebook.css";
import NotebookUnit from "../modules/NotebookUnit";
import Header from "../modules/Header";
import { useNavigate } from "react-router-dom";
import NotebookEntry from "../modules/NotebookEntry.js";

const Notebook = ({ userId }) => {
  const [mode, setMode] = useState("page");
  const [index, setIndex] = useState(0);
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate;
  const changeMode = (value) => {
    setMode(value);
  };
  const updateEntries = (value) => {
    setEntries((entries) => entries.map((entry, i) => (i === index ? value : entry)));
  };
  useEffect(() => {
    console.log("entries", entries);
  }, [entries]);

  useEffect(() => {
    console.log(entries);
    get("/api/entry", { _id: userId }).then((returned) => {
      console.log("returned", returned);
      setEntries(returned);
    });
  }, []);

  let content;
  if (mode === "page") {
    if (entries.length !== 0) {
      console.log(entries);
      content = (
        <NotebookEntry
          updateEntries={updateEntries}
          entry={entries[index]}
          _id={userId}
          changePage={changeMode}
        />
      );
    } else {
      setMode("pagelist");
    }
  } else {
    content = <NotebookUnit setIndex={setIndex} entries={entries} changeMode={changeMode} />;
  }
  return userId ? <div>{content} </div> : <>{navigate("/")}</>;
};
export default Notebook;
