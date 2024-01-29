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
    props.deleteFolder(props.index);
  };
  //https://stackoverflow.com/questions/38791919/call-a-function-after-leaving-input-field#:~:text=You%20can%20use%20onblur(),out%20of%20that%20text%20field.
  return (
    <>
      <button className="chapter" onClick={handlePage}>
        <div className="u-flexColumn">
          <p>{order}</p>
        </div>
      </button>

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
            <button onClick={handleDelete}>x</button>
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
    </>
  );
};
export default SingleFolder;
