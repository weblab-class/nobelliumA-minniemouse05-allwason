import "./NotebookEntry.css";
import "../../utilities.css";
import { useState, useEffect } from "react";
import React from "react";
import Header from "./Header";

import QuillToolbar from "./EditorToolbar.js";
import Editor from "./Editor.js";
import { Quill } from "react-quill";

const NotebookEntry = (props) => {
  const express = require("express");
  const router = express.Router();
  //Quill reference from: https://medium.com/@mircea.calugaru/react-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375
  // reference from https://docs.google.com/presentation/d/1YdqKZHpXFjCzGkahZLPItHKyvqIcskcJJAZHKTf28BE/edit#slide=id.g28e8818bc95_0_55
  return (
    <div id="full_editor">
      <QuillToolbar />
      <Header></Header>

      <div id="scrollDiv">
        <Editor id="#quill" />
      </div>

      <button
        onClick={router.post("/api/saveEntry", { _id: props._id, content: Editor.getContents() })}
      >
        Save
      </button>
    </div>
  );
};
export default NotebookEntry;
