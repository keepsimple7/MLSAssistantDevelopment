"use client";
import React from "react";
import Select from "react-select";

const structureTypeOptions = [
  { value: "Apartments", label: "Apartments" },
  { value: "Bungalow", label: "Bungalow" },
  { value: "Houses", label: "Houses" },
  { value: "Loft", label: "Loft" },
];

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => ({
    ...styles,
    backgroundColor: isSelected
      ? "#0076ff"
      : isHovered
      ? "#0076ff12"
      : isFocused
      ? "#0076ff12"
      : undefined,
  }),
};

const StructureType = () => {
  return (
    <div className="col-sm-6 col-xl-4">
      <div className="mb20">
        <label className="heading-color ff-heading fw600 mb10">
          Structure type
        </label>
        <div className="location-area">
          <Select
            styles={customStyles}
            className="select-custom pl-0"
            classNamePrefix="select"
            required
            isMulti
            defaultValue={[structureTypeOptions[0]]}
            name="structureType"
            options={structureTypeOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default StructureType;
