"use client";

import React, { useEffect, useState } from "react";
import ListingStatus from "../../sidebar/ListingStatus";
import PropertyType from "../../sidebar/PropertyType";
import PriceRange from "../../sidebar/PriceRange";
import Bedroom from "../../sidebar/Bedroom";
import Bathroom from "../../sidebar/Bathroom";
import axios from "axios";

const TopFilterBar = ({
  filterFunctions,
  setCurrentSortingOption,
  colstyle,
  setColstyle,
}) => {
  const status = [
    { id: "flexRadioDefault0", label: "Active", defaultChecked: true },
    { id: "flexRadioDefault1", label: "Pending" },
    { id: "flexRadioDefault2", label: "Sale" },
    { id: "flexRadioDefault2", label: "Lease" },
  ];
  const parking = [
    { id: "flexRadioDefault0", label: "1", defaultChecked: true },
    { id: "flexRadioDefault1", label: "2" },
    { id: "flexRadioDefault2", label: "3" },
    { id: "flexRadioDefault2", label: "4" },
  ];

  const garage = [
    { id: "flexRadioDefault0", label: "1", defaultChecked: true },
    { id: "flexRadioDefault1", label: "2" },
    { id: "flexRadioDefault2", label: "3" },
    { id: "flexRadioDefault2", label: "4" },
  ];

  const building = [
    { id: "flexRadioDefault0", label: "500", defaultChecked: true },
    { id: "flexRadioDefault1", label: "1500" },
    { id: "flexRadioDefault2", label: "2500" },
    { id: "flexRadioDefault2", label: "3500" },
  ];
  const year = [
    { id: "flexRadioDefault0", label: "1986", defaultChecked: true },
    { id: "flexRadioDefault1", label: "1990" },
    { id: "flexRadioDefault2", label: "1994" },
    { id: "flexRadioDefault2", label: "1998" },
    { id: "flexRadioDefault2", label: "2002" },
    { id: "flexRadioDefault2", label: "2006" },
    { id: "flexRadioDefault2", label: "2010" },
    { id: "flexRadioDefault2", label: "2018" },
  ];
  const structure = [
    { id: "flexRadioDefault0", label: "Townhouse", defaultChecked: true },
    { id: "flexRadioDefault1", label: "Townhouse" },
    { id: "flexRadioDefault1", label: "Townhouse" },
    { id: "flexRadioDefault1", label: "Townhouse" },
    { id: "flexRadioDefault1", label: "Townhouse" },
  ];

  return (
    <>
      <div className="col-xl-9 d-none d-lg-block">
        <div className="dropdown-lists">
          <ul className="p-0 text-center text-xl-start">
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Standard Status
                <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <div className="radio-element">
                    {status.map((option) => (
                      <div
                        className="form-check d-flex align-items-center mb10"
                        key={option.id}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={
                            filterFunctions?.listingStatus == option.label
                          }
                          onChange={() =>
                            filterFunctions.handlelistingStatus(option.label)
                          }
                        />
                        <label className="form-check-label" htmlFor={option.id}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn"
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
                For Sale <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <div className="radio-element">
                    <ListingStatus filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn"
                  >
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
                Property Type <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <div className="checkbox-style1">
                    <PropertyType filterFunctions={filterFunctions} />
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
            {/* End li Property Type */}

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Listing Price <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  {/* Range Slider Desktop Version */}
                  <div className="range-slider-style1">
                    <PriceRange filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn3"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>
            {/* End li Price */}

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
                    <Bedroom filterFunctions={filterFunctions} />
                  </div>
                </div>

                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <h6 className="list-title">Bathrooms</h6>
                  <div className="d-flex">
                    <Bathroom filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn4"
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
                Parking Total <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  {/* Range Slider Desktop Version */}
                  <div className="radio-element">
                    {parking.map((option) => (
                      <div
                        className="form-check d-flex align-items-center mb10"
                        key={option.id}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={
                            filterFunctions?.listingStatus == option.label
                          }
                          onChange={() =>
                            filterFunctions.handlelistingStatus(option.label)
                          }
                        />
                        <label className="form-check-label" htmlFor={option.id}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn3"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>

            {/* ----- Parking ----- */}
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Garage Space <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  {/* Range Slider Desktop Version */}
                  <div className="radio-element">
                    {parking.map((option) => (
                      <div
                        className="form-check d-flex align-items-center mb10"
                        key={option.id}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={
                            filterFunctions?.listingStatus == option.label
                          }
                          onChange={() =>
                            filterFunctions.handlelistingStatus(option.label)
                          }
                        />
                        <label className="form-check-label" htmlFor={option.id}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn3"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>

            {/* ----- Garage ------ */}
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Building Area <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  {/* Range Slider Desktop Version */}
                  <div className="radio-element">
                    {building.map((option) => (
                      <div
                        className="form-check d-flex align-items-center mb10"
                        key={option.id}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={
                            filterFunctions?.listingStatus == option.label
                          }
                          onChange={() =>
                            filterFunctions.handlelistingStatus(option.label)
                          }
                        />
                        <label className="form-check-label" htmlFor={option.id}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn3"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>

            {/* ---- building ---- */}
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Year Built <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  {/* Range Slider Desktop Version */}
                  <div className="radio-element">
                    {year.map((option) => (
                      <div
                        className="form-check d-flex align-items-center mb10"
                        key={option.id}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={
                            filterFunctions?.listingStatus == option.label
                          }
                          onChange={() =>
                            filterFunctions.handlelistingStatus(option.label)
                          }
                        />
                        <label className="form-check-label" htmlFor={option.id}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn3"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>
            {/* Year Built */}
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Structure Type <i className="fa fa-angle-down ms-2" />
              </button>

              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  {/* Range Slider Desktop Version */}
                  <div className="radio-element">
                    {structure.map((option) => (
                      <div
                        className="form-check d-flex align-items-center mb10"
                        key={option.id}
                      >
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={
                            filterFunctions?.listingStatus == option.label
                          }
                          onChange={() =>
                            filterFunctions.handlelistingStatus(option.label)
                          }
                        />
                        <label className="form-check-label" htmlFor={option.id}>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn3"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>
            {/* END ----- */}
          </ul>
        </div>
      </div>
      {/* End .col-9 */}

      {/* <div className="col-xl-3">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>Sort by</span>
            <select
              className="form-select"
              onChange={(e) =>
                setCurrentSortingOption &&
                setCurrentSortingOption(e.target.value)
              }
            >
              <option>Newest</option>
              <option>Best Seller</option>
              <option>Best Match</option>
              <option>Price Low</option>
              <option>Price High</option>
            </select>
          </div>
          <div
            className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block  cursor ${
              !colstyle ? "menuActive" : "#"
            } `}
            onClick={() => setColstyle(false)}
          >
            Grid
          </div>
          <div
            className={`pl15 d-none d-md-block  cursor ${
              colstyle ? "menuActive" : "#"
            }`}
            onClick={() => setColstyle(true)}
          >
            List
          </div>
        </div>
      </div> */}
      {/* End .col-3 */}
    </>
  );
};

export default TopFilterBar;
