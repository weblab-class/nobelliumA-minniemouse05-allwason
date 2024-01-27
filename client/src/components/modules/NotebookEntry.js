import "./NotebookEntry.css";
import "../../utilities.css";
import { useState, useEffect } from "react";
import React from "react";
import Header from "./Header";

import QuillToolbar from "./EditorToolbar.js";
import Editor from "./Editor.js";
import { Quill } from "react-quill";
import { get, post } from "../../utilities";
const NotebookEntry = (props) => {
  //entryIndex
  const [text, setText] = useState(props.entry.text);
  const [header, setHeader] = useState(props.entry.header);

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
    console.log(props.index);
    console.log(text);
    console.log(header);
    console.log(props);
    post("/api/entry", {
      _id: props.entry._id,
      userId: props.userId,
      text: text,
      header: header,
      folder: props.folder,
    }).then((entry) => {
      props.updateEntries(entry, props.index);
      console.log(props.entries);
    });
    //console.log("posted")

    //console.log(state);
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
      props.updateEntries(entry, props.index);
      console.log(props.entries);
    });
  };
  return (
    <div id="full_editor">
      <QuillToolbar />
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
