"use client";
import React from "react";
import Select from "react-select";

const options = {
  floorNo: ["1st", "2nd", "3rd", "4th"],
  energyClass: ["All Listing", "Active", "Sold", "Processing"],
  energyIndex: ["All Cities", "Pending", "Processing", "Published"],
};

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "#0076ff"
        : isHovered
        ? "#0076ff12"
        : isFocused
        ? "#0076ff12"
        : undefined,
    };
  },
};

const MultiSelectField = () => {
  const fieldTitles = ["Floors no", "Energy Class", "Energy index in kWh/m2a"];
  return (
    <>
      {Object.keys(options).map((key, index) => (
        <div className="col-sm-6 col-xl-4" key={index}>
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {fieldTitles[index]}
            </label>
            <div className="location-area">
              <Select
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
                options={options[key].map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MultiSelectField;
