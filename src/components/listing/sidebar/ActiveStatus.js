import { ACTIVE_STATUS } from "@/utilis/constants";
import React from "react";

const ActiveStatus = ({ filterFunctions }) => {
  

  return (
    <>
      {ACTIVE_STATUS.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            type="radio"
            checked={filterFunctions?.ActiveStatus === option.value}
            onChange={() => filterFunctions.handleActiveStatus(option)}
          />
          <label className="form-check-label ms-1 mt-1" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ActiveStatus;
