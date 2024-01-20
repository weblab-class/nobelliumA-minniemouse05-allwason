import "./Page.css";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Page = (props) => {
  const order = "Page 1";
  const [text, setText] = useState(props.header);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handlePage = () => {
    props.changeMode("page");
    props.setIndex(props.index);
  };
  const handleHeader = () => {
    console.log("onblur");
    props.changeHeader(text);
  };
  //https://stackoverflow.com/questions/38791919/call-a-function-after-leaving-input-field#:~:text=You%20can%20use%20onblur(),out%20of%20that%20text%20field.
  return (
    <>
      <button className="chapter" onClick={handlePage}>
        <div className="u-flex-vertical">
          <p>{order}</p>
        </div>
      </button>
      <input
        onBlur={handleHeader}
        className="page-title"
        value={text}
        onChange={handleChange}
      ></input>
    </>
  );
};
export default Page;
