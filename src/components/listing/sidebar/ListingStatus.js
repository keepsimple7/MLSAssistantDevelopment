import { LISTING_STATUS } from "@/utilis/constants";
import React from "react";

const ListingStatus = ({ filterFunctions }) => {
  return (
    <>
      {LISTING_STATUS.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            type="radio"
            checked={filterFunctions?.listingStatus?.value === option.value}
            onChange={() => filterFunctions.handlelistingStatus(option)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
