import "./Page.css";
import React from "react";
import { useState } from "react";
const Page = (props) => {
  const order = "Page " + String(props.index + 1);
  const [text, setText] = useState(props.header);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handlePage = () => {
    props.changeMode("page");
    console.log(props.index);
    props.setIndex(props.index);
  };
  const handleHeader = () => {
    console.log(props.index);
    props.changeHeader(text);
  };
  const handleDelete = () => {
    props.deleteEntry(props.index);
  };
  //https://stackoverflow.com/questions/38791919/call-a-function-after-leaving-input-field#:~:text=You%20can%20use%20onblur(),out%20of%20that%20text%20field.
  return (
    <div>
      <div className="chapter">
        <button className="delete" onClick={handleDelete}>
          delete
        </button>
        <button className="file-button-container" onClick={handlePage}>
          <img className="file-image" src="https://i.ibb.co/vmq3nN9/image-removebg-preview-2.png" />
          <div className="file-name u-flex-vertical">
            <p>{order}</p>
          </div>
        </button>
      </div>

      <div className="u-flex">
        <input
          onFocus={() => {
            props.changeIndex(props.index);
          }}
          onBlur={handleHeader}
          className="page-title"
          value={text}
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
};
export default Page;
