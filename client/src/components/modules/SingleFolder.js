import "./SingleFolder.css";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const SingleFolder = (props) => {
  const order = "Folder " + String(props.index + 1);
  const [text, setText] = useState(props.header);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handlePage = () => {
    props.changeMode("entry");
    console.log(props.index);
    props.setFolder(props.header);
  };
  const handleHeader = () => {
    //console.log("onblur");
    console.log(props.index);
    if (!props.folders.includes(text)) props.changeFolder(text, props.index);
    else {
      if (text !== props.header) {
        alert("Duplicate folder name!");
        setText(props.header);
      }
    }
  };
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this folder?")) props.deleteFolder(props.index);
  };
  //https://stackoverflow.com/questions/38791919/call-a-function-after-leaving-input-field#:~:text=You%20can%20use%20onblur(),out%20of%20that%20text%20field.
  return (
    <>
      <div className="folder">
        <div className="chapter">
          {props.header !== "Uncategorized" ? (
            <button className="delete" onClick={handleDelete}>
              delete
            </button>
          ) : (
            <></>
          )}
          <button className="chapter-button" onClick={handlePage}>
            <div className="u-flexColumn">
              <p>{order}</p>
            </div>
          </button>
        </div>

        <div className="u-flex">
          {props.header === "Uncategorized" ? (
            <>
              <input
                onFocus={() => {
                  props.changeIndex(props.index);
                  console.log(props.index);
                }}
                onBlur={handleHeader}
                className="page-title"
                value={text}
              ></input>
            </>
          ) : (
            <>
              <input
                onFocus={() => {
                  props.changeIndex(props.index);
                  console.log(props.index);
                }}
                onBlur={handleHeader}
                className="page-title"
                value={text}
                onChange={handleChange}
              ></input>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default SingleFolder;
