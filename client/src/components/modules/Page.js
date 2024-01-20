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
  return (
    <>
      <button className="chapter" onClick={handlePage}>
        <div className="u-flex-vertical">
          <p>{order}</p>
        </div>
      </button>
      <input className="page-title" value={text} onChange={handleChange}></input>
    </>
  );
};
export default Page;
