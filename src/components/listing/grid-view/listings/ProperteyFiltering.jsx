import React, { useState, useEffect } from "react";
import FeaturedListings from "./FeatuerdListings";
import axios from "axios";
import Select from "react-select";

export default function ProperteyFiltering(city, postalCode, filterFunctions) {
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [dataValue, setDataValue] = useState(null);
  const [listingStatus, setListingStatus] = useState("Any");
  const [Propertytype, setPropertytype] = useState("Any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [yearBuilt, setYearBuilt] = useState("Any");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const handleListingStatus = (selectedOption) => {
    setListingStatus(selectedOption.value);
  };

  const handlePropertyType = (selectedOption) => {
    setPropertytype(selectedOption.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleBedsChange = (selectedOption) => {
    setBeds(selectedOption.value);
  };

  const handleBathsChange = (selectedOption) => {
    setBaths(selectedOption.value);
  };

  const handleYearBuiltChange = (selectedOption) => {
    setYearBuilt(selectedOption.value);
  };

  console.log(city);
  const catergoryOptions = [
    { value: "Any", label: "Any" },
    { value: "Active", label: "Active" },
    { value: "Active Under Contract", label: "Active Under Contract" },
    { value: "Canceled", label: "Canceled" },
    { value: "Closed", label: "Closed" },
    { value: "Expired", label: "Expired" },
    { value: "Pending", label: "Pending" },
    { value: "Withdrawn", label: "Withdrawn" },
  ];
  const TypeOptions = [
    { value: "Any", label: "Any" },
    { value: "Residential", label: "Residential" },
    { value: "Lease", label: "Lease" },
    { value: "Income", label: "Income" },
    { value: "Land", label: "Land" },
    { value: "Mobile", label: "Mobile" },
    { value: "Commercial Sale", label: "Commercial Sale" },
  ];
  const BedOptions = [
    { value: "Any", label: "Any" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];
  const BathOptions = [
    { value: "Any", label: "Any" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];
  function generateYearOptions(startYear, endYear) {
    const YearOptions = [{ value: "Any", label: "Any" }];
    for (let year = startYear; year <= endYear; year++) {
      YearOptions.push({ value: year.toString(), label: year.toString() });
    }
    return YearOptions;
  }
  const startYear = 1980;
  const endYear = 2024;
  const yearOptions = generateYearOptions(startYear, endYear);
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

  console.log(city);
useEffect(() => {
  const fetchData = async () => {
    try {
      // let apiUrl = "https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property?$top=30";
      let apiUrl = "https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property";
      let filterString = `?$top=${itemsPerPage}&$skip=${(currentPage - 1) * itemsPerPage}`;


      if (listingStatus !== "Any") {
        filterString += `&$filter=StandardStatus eq '${listingStatus}'`;
      }

      if (Propertytype !== "Any") {
        filterString += ` and PropertyType eq '${Propertytype}'`;
      }

      if (city && city.city) {
        filterString += ` and City eq '${city.city}'`;
      }

      if (city && city.postalCode !== "") {
        filterString += ` and PostalCode eq '${city.postalCode}'`;
      }

      if (minPrice !== "") {
        filterString += ` and ListPrice ge ${minPrice}`;
      }

      if (maxPrice !== "") {
        filterString += ` and ListPrice le ${maxPrice}`;
      }

      if (beds !== "Any") {
        filterString += ` and BedroomsTotal eq ${beds}`;
      }

      if (baths !== "Any") {
        filterString += ` and BathroomsTotalInteger eq ${baths}`;
      }

      if (yearBuilt !== "Any") {
        filterString += ` and YearBuilt eq '${yearBuilt}'`;
      }

      apiUrl += filterString;
      console.log(apiUrl);

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: "Bearer 23c8729a55e9986ae45ca71d18a3742c",
        },
      });

      setDataValue(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [
  listingStatus,
  Propertytype,
  city?.city,
  city?.postalCode,
  minPrice,
  maxPrice,
  beds,
  baths,
  yearBuilt,
  currentPage
]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className="pt0 pb90 bgc-f7">
        <div className="container">
          <div className="row">
            <form className="mb-4 row">
              <h4>Filters</h4>
              <div className="col-md-3">
                <label htmlFor="status">Listing Status</label>
                <Select
                  value={catergoryOptions.find(
                    (option) => option.value === listingStatus
                  )}
                  options={catergoryOptions}
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  required
                  onChange={handleListingStatus}
                  id="listing_status"
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="types">Property Types</label>
                <Select
                  defaultValue={TypeOptions.find(
                    (option) => option.value === listingStatus
                  )}
                  name="types"
                  options={TypeOptions}
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  required
                  onChange={handlePropertyType}
                  id="property_type"
                />
              </div>
              <div className="col-md-6 row">
                <label htmlFor="">Price range</label>
                <div className="col-md-6 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    id="price_range_from"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    id="price_range_to"
                  />
                </div>
              </div>
              <div className="col-md-3 mt-3">
                <label htmlFor="types">Beds</label>
                <Select
                  defaultValue={[BedOptions[0]]}
                  name="types"
                  options={BedOptions}
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  required
                  onChange={handleBedsChange}
                  id="beds"
                />
              </div>
              <div className="col-md-3 mt-3">
                <label htmlFor="types">Baths</label>
                <Select
                  defaultValue={[BathOptions[0]]}
                  name="types"
                  options={BathOptions}
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  required
                  onChange={handleBathsChange}
                  id="baths"
                />
              </div>
              <div className="col-md-3 mt-3">
                <label htmlFor="types">Year built</label>
                <Select
                  defaultValue={[yearOptions[0]]}
                  name="types"
                  options={yearOptions}
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  required
                  onChange={handleYearBuiltChange}
                  id="year"
                />
              </div>
              <div className="col-md-3 d-inline-flex align-items-end">
                <button className="ud-btn btn-thm">Reset Filters</button>
              </div>
            </form>
            {dataValue && (
              <FeaturedListings
                colstyle={colstyle}
                data={pageItems}
                listings={dataValue}
              />
            )}
            <div className="pagination">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              {Array.from({ length: Math.ceil(dataValue?.length / itemsPerPage) }, (_, i) => (
                <button key={i} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(dataValue?.length / itemsPerPage)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
