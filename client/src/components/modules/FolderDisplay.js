import "../../utilities.css";
import "./FolderDisplay.css";
import SingleFolder from "./SingleFolder";
import React from "react";
import { useEffect, useState } from "react";
const FolderDisplay = (props) => {
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
      <SingleFolder
        key={_id}
        header={props.folders[index]}
        index={index}
        changeMode={props.changeMode}
        setFolder={props.setFolder}
        changeIndex={props.changeIndex}
        newFolder={props.newFolder}
        deleteFolder={props.deleteFolder}
        changeFolder={props.changeFolder}
      />
    );
  };
  const handleNewFolder = () => {
    setToggle(!toggle);
  };
  return (
    <div className="u-flex-vertical u-flex-justifyCenter u-space-between chapter-container">
      <div>
        {props.folders.map((folder, ind) => {
          //console.log(ind);
          return makePage(folder, ind);
        })}
      </div>
      {toggle && (
        <div className="u-flex">
          <input className="" value={text} onChange={handleChange} />
          <button
            onClick={() => {
              props.newFolder({ folder: text });
            }}
          >
            done
          </button>
        </div>
      )}
      <button className="add-button-notebook" onClick={handleNewFolder}>
        Add Folder
      </button>
    </div>
  );
};
export default FolderDisplay;
