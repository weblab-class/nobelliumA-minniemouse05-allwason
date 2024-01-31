import React, { useState } from "react";
import "../../utilities.css";
import "./FolderScroll.css";

const FolderScroll = (props) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  const handleFolderChange = (folder) => {
    props.handleFolderChange(folder, props.entry);
    setExpanded(false);
  };

  return (
    <div className="scroll-container u-flexColumn">
      <button onClick={toggleDropdown}>
        Current Folder: {props.folder} <span className="click">(click to edit)</span>{" "}
        {/* Added a down arrow for a visual cue */}
      </button>
      {expanded && (
        <div className="dropdown-content">
          {props.folders.map((entry, ind) => (
            <button key={entry} onClick={() => handleFolderChange(props.folders[ind])}>
              {props.folders[ind]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderScroll;
