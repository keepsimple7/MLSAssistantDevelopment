'use client'

import { BEDROOMS } from "@/utilis/constants";
import React from "react";

const Bedroom = ({filterFunctions}) => {


  return (
    <>
      {BEDROOMS.map((option) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
           
            type="radio"
            onChange={(e)=>filterFunctions?.handlebedrooms(option.value)}
            checked={filterFunctions?.bedrooms == option.value}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bedroom;
