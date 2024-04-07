"use client";
import Select from "react-select";
import PriceRange from "../../listing/sidebar/PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Amenities from "./Amenities";


const AdvanceFilterModal = ({ filterFunctions }) => {
  const catOptions = [
    { value: "Houses", label: "Houses" },
    { value: "Office", label: "Office" },
    { value: "Apartments", label: "Apartments" },
    { value: "Villa", label: "Villa" },
  ];

  const locationOptions = [
    { value: "All Cities", label: "All Cities" },
    { value: "California", label: "California" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "New Jersey", label: "New Jersey" },
    { value: "New York", label: "New York" },
    { value: "San Diego", label: "San Diego" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "Texas", label: "Texas" },
  ];
  const options = [
    { id: "flexRadioDefault0", label: "All", value: "All"},
    { id: "flexRadioDefault1", label: "Active", value: "Active", defaultChecked: true},
    { id: "flexRadioDefault2", label: "Active Under Contract", value: "Active Under Contract" },
    { id: "flexRadioDefault3", label: "Canceled", value: "Canceled" },
    { id: "flexRadioDefault4", label: "Closed", value: "Closed" },
    { id: "flexRadioDefault5", label: "Expired", value: "Expired" },
    { id: "flexRadioDefault6", label: "Pending", value: "Pending" },
    { id: "flexRadioDefault7", label: "Withdrawn", value: "Withdrawn" },
  ];
  const propertyOption = [
    { id: "flexRadioDefault0", label: "All", value: "All" },
    { id: "flexRadioDefault1", label: "Buy", value: "Residential", defaultChecked: true},
    { id: "flexRadioDefault2", label: "Rent", value: "Residential Lease" },
  ];

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

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            Filters
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>

        <div className="modal-body pb-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">Price Range</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="widget-wrapper">
                <h6 className="list-title">Property For</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[propertyOption[1]]}
                    name="colors"
                    options={propertyOption}
                    styles={customStyles}
                    onChange={(selectedOption) => filterFunctions?.handlelistingStatus(selectedOption)}
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="widget-wrapper">
                <h6 className="list-title">Listing Status</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[options[1]]}
                    name="colors"
                    options={options}
                    styles={customStyles}
                    onChange={(selectedOption) => filterFunctions?.handleActiveStatus(selectedOption)}
                    className="select-custom"
                    classNamePrefix="select"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bedrooms</h6>
                <div className="d-flex">
                  <Bedroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Bathrooms</h6>
                <div className="d-flex">
                  <Bathroom filterFunctions={filterFunctions} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer justify-content-between">
          <button
            className="reset-button"
            onClick={() => filterFunctions?.resetFilter()}
          >
            <span className="flaticon-turn-back" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button type="button" className="ud-btn btn-thm" data-bs-dismiss="modal">
              <span className="flaticon-search align-text-top pr10" />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
