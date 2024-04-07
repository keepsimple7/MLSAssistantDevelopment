
'use client'

import React from "react";
import PropertyType from "../../sidebar/PropertyType";
import PriceRange from "../../sidebar/PriceRange";
import Bedroom from "../../sidebar/Bedroom";
import Bathroom from "../../sidebar/Bathroom";
import ListingStatus from "../../sidebar/ListingStatus";
import ActiveStatus from "../../sidebar/ActiveStatus"; // Import the new component


const TopFilterBar2 = ({filterFunctions}) => {
  return (
    <>
      <div className="row">
        <div className="col-8 col-md-4">
            <li className="list-inline-item position-relative w-100">
              <input
                type="text"
                className="form-control search-field"
                onChange={(e)=>filterFunctions && filterFunctions.setSearchQuery(e.target.value)}
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                value={filterFunctions.searchQuery}
              />
            </li>
        </div>
        <div className="col-md-8 d-none d-md-flex justify-content-center">
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                {filterFunctions.listingStatus.label} <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h6 className="list-title">Listing Status</h6>
                  <div className="radio-element">
                    <ListingStatus  filterFunctions={filterFunctions}  />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button type="button" className="done-btn ud-btn btn-thm drop_btn">
                    Done
                  </button>
                </div>
              </div>
            </li>
            {/* End li Listing Status */}
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                {filterFunctions.activeStatus.label} <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h6 className="list-title">Active Status</h6>
                  <div className="checkbox-style1">
                    <ActiveStatus filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm dropdown-toggle"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Price <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <h6 className="list-title">Price Range</h6>
                  {/* Range Slider Desktop Version */}
                  <div className="range-slider-style1">
                    <PriceRange  filterFunctions={filterFunctions}  />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button type="button" className="done-btn ud-btn btn-thm drop_btn3">
                    Done
                  </button>
                </div>
              </div>
            </li>
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Beds / Baths <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu dd4 pb20">
                <div className="widget-wrapper pl20 pr20">
                  <h6 className="list-title">Bedrooms</h6>
                  <div className="d-flex">
                    <Bedroom   filterFunctions={filterFunctions} />
                  </div>
                </div>

                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <h6 className="list-title">Bathrooms</h6>
                  <div className="d-flex">
                    <Bathroom   filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button type="button" className="done-btn ud-btn btn-thm drop_btn4">
                    Done
                  </button>
                </div>
              </div>
            </li>
        </div>
        <div className="col-4 col-md-2 d-md-none ps-1">
          <li className="list-inline-item">
            <button
              type="button"
              className="open-btn mb15"
              data-bs-toggle="modal"
              data-bs-target="#advanceSeachModal"
            >
              <i className="flaticon-settings" />
            </button>
          </li>

        </div>
        {/* End li Price */}

        {/* End bed and bathroom check */}

      </div>
    </>
  );
};

export default TopFilterBar2;
