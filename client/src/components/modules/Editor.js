import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "../../utilities.css";
import "./NotebookEntry.css";
import { modules, formats } from "./EditorToolbar";

export const Editor = ({ text, changeText }) => {
  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        value={text}
        onChange={changeText}
        placeholder="Type here..."
        modules={modules}
        formats={formats}
        scrollingContainer="#scrollDiv"
        bounds="#full_editor"
      />
    </div>
  );
};

export default Editor;
