import "./NotebookEntry.css";
import "../../utilities.css";
import { useState, useEffect } from "react";
import React from "react";
import Header from "./Header";

import QuillToolbar from "./EditorToolbar.js";
import Editor from "./Editor.js";
import { Quill } from "react-quill";
import { get, post } from "../../utilities";
import FolderScroll from "./FolderScroll";
const NotebookEntry = (props) => {
  //entryIndex
  const [text, setText] = useState("");
  const [header, setHeader] = useState("");
  useEffect(() => {
    if (props.entry) {
      setText(props.entry.text);
      setHeader(props.entry.header);
    }
  }, []);

  const changeText = (value) => {
    setText(value);
    console.log(`value: ${value}`);
  };
  const changeHeader = (value) => {
    setHeader(value);
  };
  //Quill reference from: https://medium.com/@mircea.calugaru/react-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375
  // reference from https://docs.google.com/presentation/d/1YdqKZHpXFjCzGkahZLPItHKyvqIcskcJJAZHKTf28BE/edit#slide=id.g28e8818bc95_0_55
  const submitEntry = () => {
    post("/api/entry", {
      _id: props._id,
      userId: props.userId,
      text: text,
      header: header,
      folder: props.folder,
    }).then((entry) => {
      console.log(entry);
      props.updateEntries(entry, props.index);
      console.log(props.entries);
    });
  };

  const handleBack = () => {
    props.changePage("pages");
  };
  const updateFolder = (value) => {
    post("/api/entry", {
      _id: props.entry._id,
      userId: props.userId,
      text: text,
      header: header,
      folder: value,
    }).then((entry) => {
      console.log(entry);
      props.updateEntries(entry, props.index);
      console.log(props.entries);
    });
  };
  return (
    <div id="full_editor">
      <FolderScroll
        folder={props.folder}
        folders={props.folders}
        handleFolderChange={props.handleFolderChange}
        text={props.text}
        entry={props.entry}
      />
      <QuillToolbar className="toolbar" />
      <Header header={header} changeHeader={changeHeader} updateFolder={updateFolder} />

      <div id="scrollDiv">
        <Editor id="#quill" text={text} changeText={changeText} />
      </div>
      <div className="u-flex">
        <button onClick={submitEntry}>Save</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};
export default NotebookEntry;
