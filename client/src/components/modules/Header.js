import React from "react";
import "../../utilities.css";
import "./Header.css";
const Header = (props) => {
  const handleChange = (e) => {
    props.changeHeader(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <div className="u-flex u-flex-alignCenter container">
        <h1 className="u-xlarge pr-15">Title:</h1>
        <input value={props.header} onChange={handleChange}></input>
      </div>
    </>
  );
};

export default Header;
