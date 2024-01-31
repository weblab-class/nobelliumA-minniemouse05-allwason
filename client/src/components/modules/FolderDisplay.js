import "../../utilities.css";
import "./FolderDisplay.css";
import SingleFolder from "./SingleFolder";
import React, { useState } from "react";

const FolderDisplay = (props) => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("");
  const toggled = toggle ? "#a1c374" : "#bddeb3";
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const makePage = (_id, index) => (
    <SingleFolder
      key={_id}
      header={props.folders[index]}
      index={index}
      changeMode={props.changeMode}
      setFolder={props.setFolder}
      newFolder={props.newFolder}
      deleteFolder={props.deleteFolder}
      changeFolder={props.changeFolder}
      folders={props.folders}
      folder={props.folders[index]}
    />
  );

  const handleNewFolder = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <div className="u-flex-justifyCenter u-space-between chapter-container">
        {props.folders.map((folder, ind) => makePage(folder, ind))}
      </div>
      {toggle && (
        <div className="u-flex input-area">
          <input className="folder-name-input" value={text} onChange={handleChange} />
          <button
            className="u-ml-15"
            onClick={() => {
              if (!props.folders.includes(text)) props.newFolder({ folder: text });
              else {
                alert("Duplicate folder name!");
              }
            }}
          >
            done
          </button>
        </div>
      )}

      <button
        className="add-button-notebook"
        style={{ "background-color": toggled }}
        onClick={handleNewFolder}
      >
        Add Folder
      </button>
    </div>
  );
};

export default FolderDisplay;
