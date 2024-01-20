//from https://medium.com/@mircea.calugaru/react-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375
import React from "react";
import ReactQuill, { editor, Quill } from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "../../utilities.css";
import "./NotebookEntry.css";
import { useEffect } from "react";
import { useQuill } from "react-quill";

export const Editor = (props) => {
  //const [state, setState] = React.useState({ value: null });
  const text = props.text;
  const handleChange = (value) => {
    props.changeText(value);
  };
  const updateDoc = {
    $set: {
      content: props.text,
    },
  };

  return (
    <div className="text-editor">
      <ReactQuill
        theme="snow"
        value={text}
        onChange={handleChange}
        placeholder={"Type here..."}
        modules={modules}
        formats={formats}
        scrollingContainer={"#scrollDiv"}
        bounds={"#full_editor"}
      />
    </div>
  );
};
export default Editor;
