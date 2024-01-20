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

  const newEntry = (props) => {
    post("/api/newEntry", { user_id: userId, text: "", header: props.header }).then((entry) => {
      setEntries(entries.concat([entry]));
      console.log(entries);
      console.log(entries.concat([entry]));
    });
  };
  const changeMode = (value) => {
    setMode(value);
  };
  const updateEntries = (value, entry_index) => {
    setEntries((entries) => entries.map((entry, i) => (i === entry_index ? value : entry)));
  };
  const changeHeader = (value) => {
    post("/api/entry", { user_id: userId, header: value, text: entries[index].text }).then(() => {
      setEntries((entries) =>
        entries.map((entry, i) => (i === index ? { text: entry.text, header: value } : entry))
      );
    });
  };

  useEffect(() => {
    //console.log(entries);
    get("/api/entry", { user_id: userId }).then((returned) => {
      console.log("returned", returned);
      setEntries(returned);
    });
  }, []);

  let content;
  if (mode === "page") {
    if (entries.length !== 0) {
      //console.log(entries);
      content = (
        <NotebookEntry
          updateEntries={updateEntries}
          entry={entries[index]}
          user_id={userId}
          changePage={changeMode}
          index={index}
          entries={entries}
        />
      );
    } else {
      setMode("pagelist");
    }
  } else {
    content = (
      <NotebookUnit
        changeHeader={changeHeader}
        setIndex={setIndex}
        entries={entries}
        changeMode={changeMode}
        newEntry={newEntry}
        changeIndex={setIndex}
      />
    );
  }
  return userId ? <div>{content} </div> : <>{navigate("/")}</>;
};
export default Notebook;
