import React from "react";
import "../../utilities.css";
import "./FolderScroll.css";
import { useState } from "react";
const FolderScroll = (props) => {
  const [content, setContent] = useState(
    <button
      onClick={() => {
        handleShow();
      }}
    >
      {props.folder}
    </button>
  );
  const [expanded, setExpanded] = useState(false);
  const makeFolder = (_id, index) => {
    //console.log(index);
    //console.log("mkaing");
    return (
      <button
        onClick={() => {
          handleFolderChange(props.folders[index], props.entry);
        }}
      >
        {props.folders[index]}
      </button>
    );
  };
  const handleFolderChange = (folder) => {
    props.handleFolderChange(folder, props.entry);
    console.log(folder);
    setContent(<button onClick={handleShow}>{folder}</button>);
    setExpanded(false);
  };
  const handleShow = () => {
    console.log(expanded);

    console.log(props.folders);
    setContent(
      props.folders.map((entry, ind) => {
        //console.log(ind);
        return makeFolder(entry._id, ind);
      })
    );
    setExpanded(true);
  };
  return <div className="scroll-container u-flexColumn">{content}</div>;
};
export default FolderScroll;
