"use client";

import React, {useEffect, useState, useRef} from "react";
import PriceRange from "../../sidebar/PriceRange";
import Bedroom from "../../sidebar/Bedroom";
import Bathroom from "../../sidebar/Bathroom";
import ListingStatus from "../../sidebar/ListingStatus";
import ActiveStatus from "../../sidebar/ActiveStatus"; // Import the new component
import { add_customer_search_history } from "@/DAL/user";
import { enqueueSnackbar } from "notistack";
import SaveSearchMenu from "@/components/menu/SaveSearchMenu";
import { useAppContext } from "@/custom-hooks/AppContext";
import { LISTING_STATUS } from "@/utilis/constants";
import Select from "react-select";
import { debounce } from "@/utilis/debounce";
import { useRouter } from "next/navigation";

const TopFilterBar2 = ({ filterFunctions, getFilterString, propertyCount, setCurrentSortingOption }) => {
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
  const [isMobile, setIsMobile] = useState(false); // State to determine if user is on mobile
  const [showModal, setShowModal] = useState(false);
  const searchInputRef = useRef(null);
  const { isLoggedIn, handleOpenLoginModal } = useAppContext()
  const handleSaveSearch = async (inputs, setInputs, handleClose) => {
    if (!isLoggedIn) {
      handleOpenLoginModal()
      return
    }
    const payload = {
      search_data: getFilterString(),
      name: inputs.name,
    };
    const response = await add_customer_search_history(payload);
    if (response.code == 200) {
      enqueueSnackbar("Search saved successfully", { variant: "success" });
      handleClose()
      setInputs({ name: "" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };
    useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);
    const showSearchModal = () => {
      setShowModal(true);
    }
  const handleTabClick = (tab) => {
    filterFunctions.setListingStatus(tab);
  };
  useEffect(() => {
    if (showModal) {
      // When modal is visible, add styles to the body
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // When modal is hidden, remove added styles
      document.body.style.height = '';
      document.body.style.overflow = '';
    }

    // Cleanup function
    return () => {
      document.body.style.height = '';
      document.body.style.overflow = '';
    };
  }, [showModal]);
  useEffect(() => {
    if (showModal) {
      searchInputRef.current.focus();
    }
  }, [showModal]);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(LISTING_STATUS[1]?.value);
  const [searchTerm, setSearchTerm] = useState(filterFunctions.searchQuery);
  const [cities, setCities] = useState([]);
  const [properties, setPoperties] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyData, setPropertyData] = useState(null); // Store fetched property data
  const [isGoogleSuggestion, setIsGoogleSuggestion] = useState(false);
  const [newSearch, setNewSearch] = useState(filterFunctions.searchQuery);


  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() !== "") {
      debounce(() => {
        fetchSuggestions(value);
      }, 150);
    } else {
      setShowSuggestions(false);
    }
  };

  const fetchSuggestions = async (value) => {
    try {
      const placesService = new google.maps.places.AutocompleteService();
      placesService.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "us" },
          types: ["(cities)"],
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const cityNames = predictions.map((prediction) => {
              const [city, state] = prediction.description
                .split(", ")
                .slice(0, 2);
              return { name: `${city}, ${state}`, id: null };
            });
            setCities(cityNames);
            setShowSuggestions(true);
            setIsGoogleSuggestion(true);
          } else {
            setIsGoogleSuggestion(false);
            fetchBridgesSuggestions(value);
          }
        }
      );
    } catch (error) {
      // console.error("Error fetching suggestions:", error);
    }
  };

  const getCitiesDataFromBridgeApiResponse = (data) => {
    return data.map((property) => ({
      name: property.UnparsedAddress,
      id: property.ListingKey,
    }));
  };
  const fetchBridgesSuggestions = async (value) => {
    try {
      const response = await fetch(
        `https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property?access_token=23c8729a55e9986ae45ca71d18a3742c&$filter=contains(tolower(UnparsedAddress), tolower('${value}'))&$select=UnparsedAddress`
      );
      const data = await response.json();
      if (data.value.length > 0) {
        setCities(getCitiesDataFromBridgeApiResponse(data.value));
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching Bridge suggestions:", error);
    }
  };

  const handleSuggestionClick = async (city, e) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Stop event propagation
    setSelectedSuggestion(city);
    setSearchTerm(city);
    setShowSuggestions(false);
    await handleSubmit(e); // Submit the selected suggestion
  };


  const handleGetAddress = (selectedCity = {}) => {
    if (selectedCity?.id) {
      return selectedCity?.name?.split(",")?.[1]?.replace(/,\s*/g, " ");
    }
    return selectedSuggestion?.replace(/,\s*/g, " ");
  };
  const handleGetPropertyId = (selectedCity) => {
    if (selectedCity?.id) {
      return `&propertyId=${selectedCity.id}`;
    }
    return "";
  };

  const handleGetSearchTerm = (selectedCity) => {
    if (selectedCity?.id) {
      return selectedCity?.name?.split(",")?.[1]?.replace(/,\s*/g, " ");
    }
    return searchTerm
      .replace(/,/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const handleGetSelectedCity = (citiesList) => {
    return citiesList.find((city) =>
      city?.name
        ?.toLowerCase()
        ?.trim()
        ?.split(",")?.[0]
        ?.includes(
          searchTerm
            ?.toLowerCase()
            ?.trim()
            ?.split(",")?.[0]
        )
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isZipCode = /^\d{5}(?:[-\s]\d{4})?$/.test(searchTerm.trim());
    let selectedCity = handleGetSelectedCity(cities);
    if (selectedSuggestion) {
      const [city, state] = selectedSuggestion.split(",").map((item) => item.trim());
      console.log("Navigate directly to properties page based selected");
      console.log(selectedSuggestion);
      filterFunctions.setSearchQuery(handleGetAddress(selectedCity));
    } else if (isGoogleSuggestion) {
      console.log("Navigate directly to properties page based on google code");
      const [city, state] = selectedSuggestion
      .split(",")
        .map((item) => item.trim());
      filterFunctions.setSearchQuery(handleGetAddress(selectedCity));
    } else if (isZipCode) {
      console.log("Navigate directly to properties page based on zip code");
      filterFunctions.setSearchQuery(handleGetAddress(searchTerm));
      // router.push(
      //   `/properties?address=${encodeURIComponent(
      //     searchTerm
      //   )}&listingStatus=${activeTab}`
      // );
    } else {
      console.log("Navigate based on bridges suggestion");
      // const [city, state, postalCode] = searchTerm
      //   .split(",")
      //   .map((item) => item.trim());
      // let fields = "UnparsedAddress";
      // let filter = `contains(tolower(UnparsedAddress), tolower('${searchTerm}'))`;

      // if (city && state && postalCode) {
      //   fields = "City,StateOrProvince,PostalCode";
      //   filter = `contains(tolower(City), tolower('${city}')) and StateOrProvince eq '${state}' and PostalCode eq '${postalCode}'`;
      // }

      // try {
      //   const response = await fetch(
      //     `https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property?access_token=23c8729a55e9986ae45ca71d18a3742c&$filter=${filter}&$select=${fields}`
      //   );
      //   const data = await response.json();
      //   if (data?.value?.length > 0) {
      //     selectedCity = handleGetSelectedCity(
      //       getCitiesDataFromBridgeApiResponse(data.value)
      //     );
      //   }
      //   console.log(data);
      //   // router.push(
      //   //   `/properties?address=${encodeURIComponent(
      //   //     handleGetSearchTerm(selectedCity)
      //   //   )}&type=${activeTab}${handleGetPropertyId(selectedCity)}`
      //   // );
      // } catch (error) {
      //   console.error("Error fetching property data:", error);
      // }
    }
  };

  console.log(searchTerm);





  return (
    <>
      {
        isMobile ? (
          <>
            <div className="d-flex property-search">
              <form className="position-relative w-100">
                <input type="text" className="form-control" value={searchTerm} onChange={handleInputChange}/>
              </form>
              {showSuggestions && cities.length > 0 && (
                <ul className="search-suggestion">
                  {cities.map((city, index) => (
                    <li
                      key={index}
                      onClick={(e) =>
                        handleSuggestionClick(city.name, e)
                      }
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
              <button className="ml5" onClick={showSearchModal}>
                <i className="fa-solid fa-sliders"></i>
                <span className="ml5">
                  Filters
                </span>
              </button>
            </div>
            <div className="mt-2 mb-2 d-flex justify-content-between align-items-center">
              <p className="p0 m0">
                {propertyCount} Results
              </p>
              <div className="d-flex">
                <SaveSearchMenu
                  handleSaveSearch={handleSaveSearch}
                  getFilterString={getFilterString}
                  filterFunctions={filterFunctions}
                />
                
                <div className="pcs_dropdown d-flex align-items-center justify-content-end">
                    <i className="fa-solid fa-arrow-down-short-wide"></i>
                    <select className="form-select"  onChange={(e)=>setCurrentSortingOption && setCurrentSortingOption(e.target.value)}>
                      <option>Newest</option>
                      <option>Oldest</option>
                      <option>Price Low</option>
                      <option>Price High</option>
                    </select>
                  </div>
              </div>
            </div>
          </>
        ): (
          <>
            <div className="row">
              <div className="col-8 col-md-4">
                <li className="list-inline-item position-relative w-100">
                  <input
                    type="text"
                    className="form-control search-field"
                    onChange={(e) =>
                      filterFunctions &&
                      filterFunctions.setSearchQuery(e.target.value)
                    }
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
                    {filterFunctions.listingStatus.label}{" "}
                    <i className="fa fa-angle-down ms-2" />
                  </button>
                  <div className="dropdown-menu">
                    <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                      <h6 className="list-title">Listing Status</h6>
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
                    {filterFunctions.activeStatus.label}{" "}
                    <i className="fa fa-angle-down ms-2" />
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
                <SaveSearchMenu
                  handleSaveSearch={handleSaveSearch}
                  getFilterString={getFilterString}
                  filterFunctions={filterFunctions}

                />
              </div>
              <div className="col-4 col-md-2 d-md-none ps-1">
                <li className="list-inline-item">
                  <button
                    type="button"
                    className="open-btn mb15"
                    data-bs-toggle="modal"
                    data-bs-target="#advanceSeachModal"
                  >
                    <i className="flaticon-settings me-2" />
                  </button>
                </li>
              </div>
              {/* End li Price */}
      
              {/* End bed and bathroom check */}
            </div>
          </>
        )
      }
      {showModal ? (
        <div className="search-popup">
          <form autoComplete="off">
            <div className={`search-header ${isMobile ? 'sticky-header' : ''}`}>
                <button onClick={() => setShowModal(false)}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <input
                  className="form-control "
                  type="text"
                  name="search"
                  id="searchInput"
                  ref={searchInputRef}
                  placeholder={`Search by City, State & Zipcode... `}
                  value={newSearch}
                  onChange={(e) => handleInputChange(e.target.value)}
                  // onChange={(e) =>
                  //   filterFunctions &&
                  //   filterFunctions.setSearchQuery(e.target.value)
                  // }
                />
            </div>

            <div className="container mt75">
              <div className="radio-group">
                <input type="radio" id="option-one" name="selector" onClick={() => handleTabClick(LISTING_STATUS[0])} checked={filterFunctions.listingStatus.value === LISTING_STATUS[0]?.value} /><label htmlFor="option-one">{LISTING_STATUS[0]?.label}</label>
                <input type="radio" id="option-two" name="selector" onClick={() => handleTabClick(LISTING_STATUS[1])}  checked={filterFunctions.listingStatus.value === LISTING_STATUS[1]?.value}/><label htmlFor="option-two">{LISTING_STATUS[1]?.label}</label>
                <input type="radio" id="option-three" name="selector" onClick={() => handleTabClick(LISTING_STATUS[2])}  checked={filterFunctions.listingStatus.value === LISTING_STATUS[2]?.value}/><label htmlFor="option-three">{LISTING_STATUS[2]?.label}</label>
              </div>
              {/* <button id="showMoreFilters">
                Show more filters
              </button> */}
              <div className="filters mt15">
                <PriceRange filterFunctions={filterFunctions} />
                
                <div className="mt15">
                  <h6 className="list-title">Listing Status</h6>
                  <Select
                    defaultValue={[options[1]]}
                    name="colors"
                    options={options}
                    styles={customStyles}
                    onChange={(selectedOption) => filterFunctions?.handleActiveStatus(selectedOption)}
                    className="select-custom"
                    classNamePrefix="select"
                    isSearchable={false}
                    required
                  />
                </div>
                <div className="mt15">
                  <h6 className="list-title">Bedrooms</h6>
                  <div className="d-flex">
                    <Bedroom filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="mt15">
                  <h6 className="list-title">Bathrooms</h6>
                  <div className="d-flex">
                    <Bathroom filterFunctions={filterFunctions} />
                  </div>
                </div>
  
              </div>
              <div className="filter-button d-block mt-3">
                <button type='button' className="result-btn" onClick={() => setShowModal(false)}>
                  See {propertyCount} results
                </button>
              </div>
            </div>
          </form>
        </div>
      ): null}
    </>
  );
};

export default TopFilterBar2;
