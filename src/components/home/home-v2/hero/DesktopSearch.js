"use client";
import { debounce } from "@/utilis/debounce";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const DesktopSearch = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buy");
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);
  const [properties, setPoperties] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyData, setPropertyData] = useState(null); // Store fetched property data
  const [isGoogleSuggestion, setIsGoogleSuggestion] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State to determine if user is on mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(isMobile)
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Fetch suggestions from Google Places Autocomplete API
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

  const handleSuggestionClick = (city, e) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Stop event propagation
    setSelectedSuggestion(city);
    setSearchTerm(city);
    setShowSuggestions(false);
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
      // console.log("Navigate based on selected suggestion");
      const [city, state] = selectedSuggestion
        .split(",")
        .map((item) => item.trim());
      router.push(
        `/properties?address=${encodeURIComponent(
          handleGetAddress(selectedCity)
        )}&activeTab=${activeTab}${handleGetPropertyId(selectedCity)}`
      );
    } else if (isGoogleSuggestion) {
      // console.log("Navigate based on Google suggestion");
      router.push(
        `/properties?address=${encodeURIComponent(
          searchTerm
            .replace(/,/g, " ")
            .replace(/\s+/g, " ")
            .trim()
        )}&activeTab=${activeTab}${
          selectedCity?.id ? `&propertyId=${selectedCity.id}` : ""
        }`
      );
    } else if (isZipCode) {
      // console.log("Navigate directly to properties page based on zip code");
      router.push(
        `/properties?address=${encodeURIComponent(
          searchTerm
        )}&activeTab=${activeTab}`
      );
    } else {
      // console.log("Navigate based on bridges suggestion");
      const [city, state, postalCode] = searchTerm
        .split(",")
        .map((item) => item.trim());
      let fields = "UnparsedAddress";
      let filter = `contains(tolower(UnparsedAddress), tolower('${searchTerm}'))`;

      if (city && state && postalCode) {
        fields = "City,StateOrProvince,PostalCode";
        filter = `contains(tolower(City), tolower('${city}')) and StateOrProvince eq '${state}' and PostalCode eq '${postalCode}'`;
      }

      try {
        const response = await fetch(
          `https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property?access_token=23c8729a55e9986ae45ca71d18a3742c&$filter=${filter}&$select=${fields}`
        );
        const data = await response.json();
        if (data?.value?.length > 0) {
          selectedCity = handleGetSelectedCity(
            getCitiesDataFromBridgeApiResponse(data.value)
          );
        }
        router.push(
          `/properties?address=${encodeURIComponent(
            handleGetSearchTerm(selectedCity)
          )}&type=${activeTab}${handleGetPropertyId(selectedCity)}`
        );
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    }
  };

  return (
    <div className="mx-auto" data-aos="fade-up">
      <div className="tab-content">
        <div className="advance-content-style2">
          <div className="row align-items-center justify-content-start justify-content-md-center">
            <div className="col-lg-8">
              <div className="advance-search-field position-relative text-start">
                <h2 className="text-center text-white text-uppercase fs-md-5 fs-3">Find a home in a neighborhood you love.</h2>
                
                <form
                  className="form-search position-relative"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <div className="box-search">
                    <input
                      className="form-control "
                      type="text"
                      name="search"
                      placeholder={`Search by City, State & Zipcode... `}
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                  </div>
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
                  <button className="advance-search-icon" type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <span className="d-none">
                      Search
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSearch;
