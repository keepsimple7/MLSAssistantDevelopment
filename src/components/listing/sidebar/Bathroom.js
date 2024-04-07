"use client";

import { BATHROOMS } from "@/utilis/constants";
import React from "react";

const Bathroom = ({ filterFunctions }) => {
  return (
    <>
      {BATHROOMS.map((option) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
            type="radio"
            checked={filterFunctions?.bathroms == option.value}
            onChange={() => filterFunctions?.handlebathroms(option.value)}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bathroom;
