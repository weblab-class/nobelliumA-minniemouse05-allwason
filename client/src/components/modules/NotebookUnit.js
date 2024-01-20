import "../../utilities.css";
import "./NotebookUnit.css";
import Page from "./Page.js";
import React from "react";
const NotebookUnit = (props) => {
  return (
    <div className="u-flex-vertical u-flex-justifyCenter u-space-between chapter-container">
      <div>
        <Page />
        <Page />
        <Page />
        <Page />
        <Page />
      </div>
    </div>
  );
};
export default NotebookUnit;
