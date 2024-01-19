import "./NotebookEntry.css";
import "../../utilities.css";
import { useState, useEffect } from "react";
import React from "react";
import Header from "./Header";

import QuillToolbar from "./EditorToolbar.js";
import Editor from "./Editor.js";
import { Quill } from "react-quill";
const NotebookEntry = (props) => {
  //Code from: https://medium.com/@mircea.calugaru/react-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375

  return (
    <div id="full_editor">
      <QuillToolbar />
      <Header></Header>

      <div id="scrollDiv">
        <Editor id="#quill" />
      </div>
    </div>
  );
};
export default NotebookEntry;
