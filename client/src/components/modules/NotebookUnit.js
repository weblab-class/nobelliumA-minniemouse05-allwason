import "../../utilities.css";
import "./NotebookUnit.css";
import Page from "./Page.js";
import React from "react";
import { useState } from "react";
const NotebookUnit = (props) => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
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
      <div className="u-flex-justifyCenter u-space-between chapter-container">
        {props.entries.map((entry, ind) => {
          return makePage(entry._id, ind);
        })}
      </div>
      <div>
        {toggle && (
          <div className="u-flex">
            <input className="" value={text} onChange={handleChange} />
            <button
              onClick={() => {
                props.newEntry({ header: text });
              }}
            >
              done
            </button>
          </div>
        )}
        <div className="u-flex add-button-notebook">
          <button
            className=""
            onClick={() => {
              props.changeMode("folder");
            }}
          >
            Back
          </button>
          {props.folder !== "Shared" ? (
            <button className="" onClick={handleNewEntry}>
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
