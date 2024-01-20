import "./Page.css";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Page = (props) => {
  const order = "Page 1";
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <Link>
        <button className="chapter">
          <div className="u-flex-vertical">
            <p>{order}</p>

            <input value={text} onChange={handleChange}></input>
            <div>
              <p></p>
            </div>
          </div>
        </button>
      </Link>
    </>
  );
};
export default Page;
