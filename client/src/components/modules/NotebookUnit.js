import "../../utilities.css";
import "./NotebookUnit.css";
import Page from "./Page.js";
import React from "react";
import { useEffect, useState } from "react";
const NotebookUnit = (props) => {
  console.log(props);
  const [toggle, setToggle] = useState(false);
  let new_Content = <></>;

  const makePage = (index) => {
    return (
      <Page
        header={props.entries[index].header}
        index={index}
        changeMode={props.changeMode}
        setIndex={props.setIndex}
        changeHeader={props.changeHeader}
        newEntry={props.newEntry}
      />
    );
  };
  const handleNewEntry = () => {
    setToggle(!toggle);
  };
  return (
    <div className="u-flex-vertical u-flex-justifyCenter u-space-between chapter-container">
      <div>
        {props.entries.map((_, ind) => {
          console.log(ind);
          return makePage(ind);
        })}
      </div>
      {toggle && (
        <div className="u-flex">
          <input className="" />
          <button onClick={props.newEntry}>done</button>
        </div>
      )}
      <button className="add-button" onClick={handleNewEntry}>
        Add Entry
      </button>
    </div>
  );
};
export default NotebookUnit;
