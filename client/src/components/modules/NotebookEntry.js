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
  const [text, setText] = useState("");
  const [header, setHeader] = useState("");
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
    post("/api/entry", { _id: props._id, text: text, header: header }).then(console.log("posted"));
    //console.log(state);
  };
  useEffect(() => {
    get("/api/entry", { _id: props._id }).then((entry) => {
      setText(entry[0].text);
      setHeader(entry[0].header);
      console.log("entry retrieved");
      console.log(entry[0].content);
      console.log(entry[0].header);
    });
  }, []);
  return (
    <div id="full_editor">
      <QuillToolbar />
      <Header header={header} changeHeader={changeHeader} />

      <div id="scrollDiv">
        <Editor id="#quill" text={text} changeText={changeText} />
      </div>
      <button onClick={submitEntry}>Save</button>
    </div>
  );
};
export default NotebookEntry;
