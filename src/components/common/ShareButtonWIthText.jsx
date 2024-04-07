import React from "react";

function ShareButtonWIthText({ open, handleClick }) {
  return (
    <button
      className="icon icon-custom"
      onClick={handleClick}
      type="button"
    >
      <span className="flaticon-share-1 me-1 d-flex align-items-center" />
      <span>Share</span>
    </button>
  );
}

export default ShareButtonWIthText;
