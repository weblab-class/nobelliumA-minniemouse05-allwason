import React from "react";
import "./Music.css";
import ExitButton from "../modules/ExitButton";

const Music = () => {
  return (
    <div>
      <ExitButton />
      <h1> </h1>
      <iframe
        src="https://open.spotify.com/embed/playlist/1E9PGL9rpWg53rnt0qQNeI?utm_source=generator"
        className="music"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
};
export default Music;
