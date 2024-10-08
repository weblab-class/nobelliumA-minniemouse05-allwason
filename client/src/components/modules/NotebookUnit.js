import "../../utilities.css";
import "./NotebookUnit.css";
import Page from "./Page.js";
import React from "react";
import { useState } from "react";
const NotebookUnit = (props) => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const toggled = toggle ? "#a1c374" : "#bddeb3";
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const makePage = (_id, index) => {
    return (
      <Page
        key={_id}
        header={props.entries[index].header}
        index={index}
        changeMode={props.changeMode}
        setIndex={props.setIndex}
        changeHeader={props.changeHeader}
        newEntry={props.newEntry}
        changeIndex={props.changeIndex}
        deleteEntry={props.deleteEntry}
      />
    );
  };
  const handleNewEntry = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <h2>Folder: {props.folder}</h2>
      <div className="u-flex-justifyCenter u-space-between chapter-container">
        {props.entries.map((entry, ind) => {
          return makePage(entry._id, ind);
        })}
      </div>
      <div>
        {toggle && (
          <div className="u-flex input-area">
            <input className="folder-name-input" value={text} onChange={handleChange} />
            <button
              className="notebook-button"
              onClick={() => {
                props.newEntry({ header: text });
              }}
            >
              done
            </button>
          </div>
        )}
        <div className="u-flex add-button-notebook1">
          <button
            className="margin-button button-div notebook-button"
            onClick={() => {
              props.changeMode("folder");
            }}
          >
            Back
          </button>
          {props.folder !== "Shared" ? (
            <button
              className="button-div notebook-button"
              style={{ "background-color": toggled }}
              onClick={handleNewEntry}
            >
              Add Entry
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default NotebookUnit;
