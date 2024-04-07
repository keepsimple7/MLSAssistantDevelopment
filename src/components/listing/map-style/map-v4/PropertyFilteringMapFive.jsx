"use client";
import React, { useState, useEffect } from "react";
import TopFilterBar2 from "./TopFilterBar2";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import ListingMap1 from "../ListingMap1";
import axios from "axios";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import PropertyDetailModal from "@/components/modal/property-detail-modal";
import { debounce } from "@/utilis/debounce";
import { ACTIVE_STATUS, LISTING_STATUS } from "@/utilis/constants";
import usePropertySearchParams from "@/custom-hooks/usePropertySearchParams";
import { useAppContext } from "@/custom-hooks/AppContext";
import ContentLoader from "react-content-loader";
export default function PropertyFilteringMapFive({ data }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { getPropertyAddress } = useAppContext();

  const {
    paramsObject,
    conversionList,
    splitPropertyAddress,
    convertParamsObjectToString,
  } = usePropertySearchParams();

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [filteredData, setFilteredData] = useState([]);
  const [params, setParams] = useState({ id: null });
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const [listingStatus, setListingStatus] = useState({
    value: "All",
    label: "All",
  });
  const [propertyTypes, setPropertyTypes] = useState([]);

  const [priceRange, setPriceRange] = useState([0, 0]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);
  const [propertyCount, setPropertyCount] = useState(0);
  const [activeStatus, setActiveStatus] = useState({
    label: "Active",
    value: "Active",
    defaultChecked: true,
  });

  const resetFilter = () => {
    // setListingStatus({ value: "All", label: "All" });
    setPropertyTypes([]);
    setPriceRange([0, 0]);
    setBedrooms(0);
    setBathroms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption("Newest");
    setActiveStatus({ label: "Active", value: "Active", defaultChecked: true });
    document.querySelectorAll(".filterInput").forEach(function(element) {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach(function(element) {
      element.value = "All Cities";
    });
  };
  const addFilter = (filterString, filterToAdd) => {
    if (!filterString) {
      return filterToAdd;
    }
    return `${filterString} and ${filterToAdd}`;
  };
  const getFilterString = (newFiltersObject = null) => {
    let filtersObject = {
      ...paramsObject,
      itemsPerPage,
      pageNumber,
      listingStatus: listingStatus.value,
      activeStatus: activeStatus.value,
      minPriceRange: priceRange[0],
      maxPriceRange: priceRange[1],
      bedrooms,
      bathroms,
      address: searchQuery,
      currentSortingOption,
    };
    if (newFiltersObject) {
      filtersObject = { ...filtersObject, ...newFiltersObject };
    }

    let newString = "?";
    let isFirstKey = true;
    Object.keys(filtersObject).map((key) => {
      if (isFirstKey) {
        newString += `${key}=${filtersObject[key]}`;
        isFirstKey = false;
      } else {
        newString += `&${key}=${filtersObject[key]}`;
      }
    });
    return newString;
  };
  const getFilterStringForSaveSearch = () => {
    const newString = getFilterString();
    return `${newString}&savedSearch=1`;
  };
  const getFilterStringForApi = () => {
    let filterString = `?$top=${itemsPerPage}&$skip=${(pageNumber - 1) *
      itemsPerPage}`;

    let orderBy = "";

    // Initialize filterArray to store all filter conditions
    const filterArray = [];

    if (listingStatus.value !== "All") {
      filterArray.push(`PropertyType eq '${listingStatus.value}'`);
    }

    // Correct the typo in the condition
    if (activeStatus.value !== "All") {
      filterArray.push(`StandardStatus eq '${activeStatus.value}'`);
    }

    // Add price range filter
    if (priceRange[0] > 0) {
      filterArray.push(`ListPrice ge ${priceRange[0]}`);
    }
    if (priceRange[0] <= priceRange[1] && priceRange[1] > 0) {
      filterArray.push(`ListPrice le ${priceRange[1]}`);
    }

    // Add bedrooms filter
    if (bedrooms > 0) {
      filterArray.push(`BedroomsTotal ge ${bedrooms}`);
    }

    // Add bathrooms filter
    if (bathroms > 0) {
      filterArray.push(`BathroomsFull ge ${bathroms}`);
    }

    // Add search query filter
    if (searchQuery) {
      filterArray.push(
        `contains(tolower(UnparsedAddress), tolower('${searchQuery}'))`
      );
    }

    // Construct the $filter parameter
    if (filterArray.length > 0) {
      filterString += `&$filter=${filterArray.join(" and ")}`;
    }

    // Handle sorting based on currentSortingOption
    if (currentSortingOption === "Newest") {
      orderBy = "ModificationTimestamp desc";
    } else if (currentSortingOption === "Oldest") {
      orderBy = "ModificationTimestamp asc";
    } else if (currentSortingOption === "Price Low") {
      orderBy = "ListPrice asc";
    } else if (currentSortingOption === "Price High") {
      orderBy = "ListPrice desc";
    }
    return `${filterString}&$orderby=${orderBy}`;
  };
  const getFilterStringForParams = () => {
    const newString = getFilterString();
    const { pathname } = window.location;
    router.replace(`${pathname}${newString}`);
  };

  const startItem = (pageNumber - 1) * itemsPerPage + 1;

  const totalResults = totalPages * itemsPerPage;
  const endItem = Math.min(pageNumber * itemsPerPage, totalResults);

  const handlePageClick = (selectedPage) => {
    setPageNumber(selectedPage.selected + 1); // Add 1 to account for 0-based indexing
  };
  const handlelistingStatus = (elm) => {
    setLoading(true);
    setListingStatus((pre) => (pre == elm ? "All" : elm));
  };

  const handlepropertyTypes = (elm) => {
    setLoading(true);
    if (elm == "All") {
      setPropertyTypes([]);
    } else {
      setPropertyTypes((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };
  const handlepriceRange = (elm) => {
    setLoading(true);
    setPriceRange(elm);
  };
  const handlebedrooms = (elm) => {
    setLoading(true);
    setBedrooms(elm);
  };
  const handlebathroms = (elm) => {
    setLoading(true);
    setBathroms(elm);
  };
  const handlelocation = (elm) => {
    setLoading(true);
    setLocation(elm);
  };
  const handlesquirefeet = (elm) => {
    setLoading(true);
    setSquirefeet(elm);
  };
  const handleyearBuild = (elm) => {
    setLoading(true);
    setyearBuild(elm);
  };
  const handlecategories = (elm) => {
    setLoading(true);
    if (elm == "All") {
      setCategories([]);
    } else {
      setCategories((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };
  const handleActiveStatus = (status) => {
    setLoading(true);
    setActiveStatus(status);
  };
  const handleSearch = (value) => {
    setLoading(true);
    setSearchQuery(value);
  };
  const handleClickProperty = (listing) => {
    localStorage.setItem("currentUrl", window.location.href);

    sessionStorage.setItem(
      "search",
      JSON.stringify({ ...paramsObject, address: searchQuery })
    );
    setParams({ id: listing.ListingKey, data: listing });
  };
  const handleClickCloseModal = () => {
    setParams({ ...params, id: null });
    const localSearchObject = JSON.parse(sessionStorage.getItem("search"));
    const newObject = {
      ...paramsObject,
      ...localSearchObject,
      address: searchQuery || splitPropertyAddress(0) || "",
    };
    // return;
    router.replace(`${pathName}?address=${newObject.address}`);
    setLoading(false);
  };
  const filterFunctions = {
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    setListingStatus,
    propertyTypes,
    resetFilter,

    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery,
    handleActiveStatus,
    activeStatus,
    searchQuery,
    setActiveStatus,
    handleSearch,
    handleClickProperty,
    setLoading,
    loading,
  };
  const getSearchFromStates = () => {
    return {
      itemsPerPage,
      pageNumber,
      orderby: currentSortingOption,
      listingStatus: listingStatus?.value,
      activeStatus: activeStatus?.value,
      minPriceRange: priceRange[0],
      maxPriceRange: priceRange[1],
      bedrooms,
      bathroms,
      address: searchQuery,
      currentSortingOption,
    };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl =
          "https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property";

        apiUrl += getFilterStringForApi();

        // if (
        //   !params.id &&
        //   !paramsObject?.propertyId &&
        //   !paramsObject?.propertyAddress
        // ) {

        //   getFilterStringForParams(); // Moved outside the fetchData function
        // }

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: "Bearer 23c8729a55e9986ae45ca71d18a3742c",
          },
        });
        if (response?.status == 200) {
          setTotalPages(
            Math.ceil(response.data["@odata.count"] / itemsPerPage)
          );
          setPropertyCount(response.data["@odata.count"]);
          setPageItems(response.data.value);
          setLoading(false);
          // updateUrl(pageNumber); // Update URL with current page number
        }
      } catch (error) {
        // Add proper error handling
        console.error("Error fetching data:", error);
        // Add UI feedback for the user
      }
    };
    sessionStorage.setItem("search", JSON.stringify(getSearchFromStates()));
    if (searchQuery != paramsObject?.address) {
      router.replace(`/properties?address=${searchQuery}`);
    }

    debounce(fetchData, 500);
    // fetchData();
  }, [
    pageNumber,
    listingStatus,
    activeStatus,
    priceRange,
    bedrooms,
    bathroms,
    searchQuery,
    itemsPerPage,
    currentSortingOption,
    searchQuery,
  ]); // Ensure correct dependencies are included
  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice(
        (pageNumber - 1) * itemsPerPage,
        pageNumber * itemsPerPage
      )
    );
    setPageContentTrac([
      (pageNumber - 1) * itemsPerPage + 1,
      pageNumber * itemsPerPage,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  useEffect(() => {
    const search = searchParams.get("address");
    if (search !== null && search !== undefined && search !== "") {
      setSearchQuery(search);
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption == "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) => a.yearBuilding - b.yearBuilding
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price Low") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          a.price
            .split("$")[1]
            .split(",")
            .join("") -
          b.price
            .split("$")[1]
            .split(",")
            .join("")
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price High") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          b.price
            .split("$")[1]
            .split(",")
            .join("") -
          a.price
            .split("$")[1]
            .split(",")
            .join("")
      );
      setSortedFilteredData(sorted);
    } else {
      setSortedFilteredData(filteredData);
    }
  }, [filteredData, currentSortingOption]);

  const handleSavedSarchToState = () => {
    let newSavedSearch = {};

    conversionList.map((key) => {
      newSavedSearch[key] = paramsObject[key];
    });

    setItemsPerPage(newSavedSearch.itemsPerPage);
    setPageNumber(newSavedSearch.pageNumber);
    setListingStatus(
      LISTING_STATUS.find(
        (option) => option.value === newSavedSearch.listingStatus
      )
    );
    setActiveStatus(
      ACTIVE_STATUS.find(
        (option) => option.value === newSavedSearch.activeStatus
      )
    );
    setPriceRange([
      Number(newSavedSearch.minPriceRange),
      Number(newSavedSearch.maxPriceRange),
    ]);
    setBedrooms(newSavedSearch.bedrooms);
    setBathroms(newSavedSearch.bathroms);
    setSearchQuery(newSavedSearch.address);
    return newSavedSearch;
  };

  // first time when components mount
  useEffect(() => {
    const { propertyId, address } = paramsObject;
    handleSavedSarchToState();
    sessionStorage.setItem("search", JSON.stringify(paramsObject));
    const newPropertyId = propertyId || splitPropertyAddress(1);
    const newAddress = address || splitPropertyAddress(0) || "";

    if (newAddress) {
      setSearchQuery(newAddress);
    }
    if (newPropertyId) {
      setParams({ id: newPropertyId });
      return;
    }

    // handle search

    if (newAddress) {
      router.replace(`/properties?address=${newAddress}`);
    }
  }, []);

  // when modal open
  useEffect(() => {
    if (params?.id && params?.data?.UnparsedAddress) {
      router.replace(getPropertyAddress(params?.data || {}));
      return;
    }
  }, [params]);
  return (
    <>
      <PropertyDetailModal
        params={params}
        setParams={setParams}
        handleClickCloseModal={handleClickCloseModal}
      />
      <section className="advance-search-menu bg-white position-relative default-box-shadow2 pt15 pb5 bb1 dn-992">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="advance-search-list no-box-shadow d-md-flex justify-md-content-center">
                <div className="dropdown-lists">
                  <ul className="p-0 mb-0">
                    <TopFilterBar2
                      filterFunctions={filterFunctions}
                      getFilterString={getFilterStringForSaveSearch}
                      propertyCount={propertyCount}
                      setCurrentSortingOption={setCurrentSortingOption}
                      handleClickProperty={handleClickProperty}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End container-fluid */}

        {/* <!-- Advance Feature Modal Start --> */}
        <div className="advance-feature-modal">
          <div
            className="modal fade"
            id="advanceSeachModal"
            tabIndex={-1}
            aria-labelledby="advanceSeachModalLabel"
            aria-hidden="true"
          >
            <AdvanceFilterModal filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* <!-- Advance Feature Modal End --> */}
      </section>

      {/* Property Filtering */}
      <section className="p-0 bgc-f7">
        <div className="container-fluid">
          <div className="row" data-aos="fade-up" data-aos-duration="200">
            <div
              id="propertListing"
              className="col-xl-6 overflow-hidden position-relative"
            >
              <div className="half_map_area map-canvas half_style">
                {pageItems && (
                  <ListingMap1
                    listings={pageItems ?? []}
                    handleClickProperty={handleClickProperty}
                  />
                )}
              </div>
            </div>
            {/* End col-7 */}

            <div className="col-xl-6">
              <div className="half_map_area_content mt30 p0 p-md-3">
                <div className="row align-items-center mb10">
                  <TopFilterBar
                    pageContentTrac={pageContentTrac}
                    colstyle={colstyle}
                    setColstyle={setColstyle}
                    startItem={startItem}
                    endItem={endItem}
                    totalResults={totalResults}
                    filterFunctions={filterFunctions}
                    setCurrentSortingOption={setCurrentSortingOption}
                  />
                </div>
                <div className="row">
                  {loading ? (
                    [...Array(10)].map((_, index) => (
                      <div className="col-md-6" key={index}>
                        <ContentLoader
                          viewBox="0 0 500 280"
                          speed={1}
                          backgroundColor="#cccccc"
                          foregroundColor="#a1a1a1"
                        >
                          <rect
                            x="3"
                            y="3"
                            rx="10"
                            ry="10"
                            width="100%"
                            height="180"
                          />
                          <rect
                            x="6"
                            y="190"
                            rx="0"
                            ry="0"
                            width="80%"
                            height="20"
                          />
                          <rect
                            x="4"
                            y="215"
                            rx="0"
                            ry="0"
                            width="75%"
                            height="20"
                          />
                          <rect
                            x="4"
                            y="242"
                            rx="0"
                            ry="0"
                            width="90%"
                            height="20"
                          />
                        </ContentLoader>
                      </div>
                    ))
                  ) : (
                    <FeaturedListings
                      colstyle={colstyle}
                      listings={pageItems}
                      handleClickProperty={handleClickProperty}
                      loading={loading}
                    />
                  )}
                </div>
                {/* End .row */}

                <div className="row text-center">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="< Previous"
                    marginPagesDisplayed={2}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                  />
                </div>
                {/* End .row */}
              </div>
              {/* End .half_map_area_content */}
            </div>
            {/* End col-5 */}
          </div>
          {/* End TopFilterBar */}
        </div>
        {/* End .container */}
      </section>
    </>
  );
}
