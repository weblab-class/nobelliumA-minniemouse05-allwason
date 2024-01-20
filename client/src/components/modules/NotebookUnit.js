import "../../utilities.css";
import "./NotebookUnit.css";
import Page from "./Page.js";
import React from "react";
import { useEffect } from "react";
const NotebookUnit = (props) => {
  console.log(props);
  const makePage = (index) => {
    return (
      <Page
        header={props.entries[index].header}
        index={index}
        changeMode={props.changeMode}
        setIndex={props.setIndex}
        changeHeader={props.changeHeader}
      />
    );
  };
  const handleNewEntry = () => {
    props.newEntry();
    console.log("new entry");
  };
  return (
    <div className="u-flex-vertical u-flex-justifyCenter u-space-between chapter-container">
      <div>
        {props.entries.map((_, ind) => {
          console.log(ind);
          return makePage(ind);
        })}
      </div>
      <button className="add-button" onClick={handleNewEntry}>
        Add Entry
      </button>
    </div>
  );
};
export default NotebookUnit;
