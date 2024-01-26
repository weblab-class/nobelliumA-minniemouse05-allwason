import "../../utilities.css";
import "./NotebookUnit.css";
import Page from "./Page.js";
import React from "react";
import { useEffect, useState } from "react";
const NotebookUnit = (props) => {
  //console.log(props);
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const makePage = (_id, index) => {
    //console.log(index);
    //console.log("mkaing");
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
    <div className="u-flex-vertical u-flex-justifyCenter u-space-between chapter-container">
      <div>
        {props.entries.map((entry, ind) => {
          //console.log(ind);
          return makePage(entry._id, ind);
        })}
      </div>
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
      <button className="add-button-notebook" onClick={handleNewEntry}>
        Add Entry
      </button>
    </div>
  );
};
export default NotebookUnit;
