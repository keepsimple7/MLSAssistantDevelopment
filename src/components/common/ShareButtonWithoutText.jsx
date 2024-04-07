import React from "react";

function ShareButtonWithoutText({ open, handleClick }) {
  return (
    <button onClick={handleClick} className="share-button">
      <i className="fa-solid fa-share-nodes me-1"></i>
      <span>
        Share
      </span>
    </button>
  );
}

export default ShareButtonWithoutText;
