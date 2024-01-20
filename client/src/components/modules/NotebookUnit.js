import "../../utilities.css";
import "./NotebookUnit.css";
import Page from "./Page.js";
import React from "react";
const NotebookUnit = (props) => {
  const makePage = (index) => {
    return (
      <Page
        header={props.entries[index].header}
        index={index}
        changeMode={props.changeMode}
        setIndex={props.setIndex}
      />
    );
  };
  return (
    <div className="u-flex-vertical u-flex-justifyCenter u-space-between chapter-container">
      <div>
        {props.entries.map((_, ind) => {
          console.log(ind);
          return makePage(ind);
        })}
      </div>
    </div>
  );
};
export default NotebookUnit;
