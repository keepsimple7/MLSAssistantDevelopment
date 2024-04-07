"use client";
import React, { useState, useEffect } from "react";
import TopFilterBar2 from "./TopFilterBar2";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import ListingMap1 from "../ListingMap1";
import axios from "axios";
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'next/navigation'


export default function PropertyFilteringMapFive({ data }) {
	const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	const searchParams = useSearchParams()
	const [filteredData, setFilteredData] = useState([]);
	const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
	const [sortedFilteredData, setSortedFilteredData] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [colstyle, setColstyle] = useState(false);
	const [pageItems, setPageItems] = useState([]);
	const [pageContentTrac, setPageContentTrac] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");

	
	let itemsPerPage = 10;
	const endOffset = itemOffset + itemsPerPage;
	const currentItems = items.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(items.length / itemsPerPage);
	useEffect(() => {
		setPageItems(
		sortedFilteredData.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage),
		);
		setPageContentTrac([
		(pageNumber - 1) * itemsPerPage + 1,
		pageNumber * itemsPerPage,
		sortedFilteredData.length,
		]);
	}, [pageNumber, sortedFilteredData]);

	const search = searchParams.get('address');

	useEffect(() => {
	if (search !== null && search !== undefined && search !== "") {
		setSearchQuery(search);
	}
	}, []); // Empty dependency array ensures this effect runs only once when the component mounts


	const [listingStatus, setListingStatus] = useState({value: "All", label: "All"});
	const [propertyTypes, setPropertyTypes] = useState([]);
	const [priceRange, setPriceRange] = useState([0, 1000000]);
	const [bedrooms, setBedrooms] = useState(0);
	const [bathroms, setBathroms] = useState(0);
	const [location, setLocation] = useState("All Cities");
	const [squirefeet, setSquirefeet] = useState([]);
	const [yearBuild, setyearBuild] = useState([]);
	const [categories, setCategories] = useState([]);
	const [activeStatus, setActiveStatus] = useState({ label: "Active", value: "Active", defaultChecked: true });

	const resetFilter = () => {
		setListingStatus({value: "All", label: "All"});
		setPropertyTypes([]);
		setPriceRange([0, 100000]);
		setBedrooms(0);
		setBathroms(0);
		setLocation("All Cities");
		setSquirefeet([]);
		setyearBuild([0, 2050]);
		setCategories([]);
		setCurrentSortingOption("Newest");
		setActiveStatus({ label: "Active", value: "Active", defaultChecked: true })
		document.querySelectorAll(".filterInput").forEach(function (element) {
		element.value = null;
		});

		document.querySelectorAll(".filterSelect").forEach(function (element) {
		element.value = "All Cities";
		});
	};
	const addFilter = (filterString, filterToAdd) => {
		// If filterString is empty, simply add the filter
		if (!filterString) {
			return filterToAdd;
		}
		// If filterString is not empty, append the filter with 'and' keyword
		return `${filterString} and ${filterToAdd}`;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				let apiUrl = "https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property";
				let filterString = `?$top=${itemsPerPage}&$skip=${((pageNumber - 1) * itemsPerPage)}`;
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
				filterArray.push(`ListPrice ge ${priceRange[0]}`);
				filterArray.push(`ListPrice le ${priceRange[1]}`);

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
					filterArray.push(`contains(tolower(UnparsedAddress),tolower('${searchQuery}'))`);
				}

				// Construct the $filter parameter
				if (filterArray.length > 0) {
					filterString += `&$filter=${filterArray.join(' and ')}`;
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

				apiUrl += `${filterString}&$orderby=${orderBy}`;

				console.log(apiUrl);

				const response = await axios.get(apiUrl, {
					headers: {
						Authorization: "Bearer 23c8729a55e9986ae45ca71d18a3742c",
					},
				});

				setTotalPages(Math.ceil(response.data['@odata.count'] / itemsPerPage));
				setPageItems(response.data.value);
				updateUrl(pageNumber); // Update URL with current page number
			} catch (error) {
				// Add proper error handling
				console.error("Error fetching data:", error);
				// Add UI feedback for the user
			}
		};

		fetchData();
	}, [pageNumber, listingStatus, activeStatus, priceRange, bedrooms, bathroms, searchQuery, itemsPerPage, currentSortingOption]); // Ensure correct dependencies are included







  const updateUrl = (page) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    window.history.pushState({ path: url.href }, '', url.href);
  };
	const startItem = (pageNumber - 1) * itemsPerPage + 1;

	const totalResults = totalPages * itemsPerPage;
	const endItem = Math.min(pageNumber * itemsPerPage, totalResults);


	const handlePageClick = (selectedPage) => {
		setPageNumber(selectedPage.selected + 1); // Add 1 to account for 0-based indexing
	};
	const handlelistingStatus = (elm) => {
		setListingStatus((pre) => (pre == elm ? "All" : elm));
	};

	const handlepropertyTypes = (elm) => {
		console.log(elm)
		if (elm == "All") {
		setPropertyTypes([]);
		} else {
		setPropertyTypes((pre) =>
			pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm],
		);
		}
	};
	const handlepriceRange = (elm) => {
		setPriceRange(elm);
	};
	const handlebedrooms = (elm) => {
		setBedrooms(elm);
	};
	const handlebathroms = (elm) => {
		setBathroms(elm);
	};
	const handlelocation = (elm) => {
		setLocation(elm);
	};
	const handlesquirefeet = (elm) => {
		setSquirefeet(elm);
	};
	const handleyearBuild = (elm) => {
		setyearBuild(elm);
	};
	const handlecategories = (elm) => {
		if (elm == "All") {
		setCategories([]);
		} else {
		setCategories((pre) =>
			pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm],
		);
		}
	};
	const handleActiveStatus = (status) => {
		setActiveStatus(status);
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
	};

//   useEffect(() => {
//     const refItems = pageItems.filter((elm) => {
//       if (listingStatus === "All") {
//         return true;
//       } else if (listingStatus === "Buy") {
//         return !elm.forRent;
//       } else if (listingStatus === "Rent") {
//         return elm.forRent;
//       }
//     });

//     let filteredArrays = [];

//     if (propertyTypes.length > 0) {
//       const filtered = refItems.filter((elm) =>
//         propertyTypes.includes(elm.propertyType)
//       );
//       filteredArrays = [...filteredArrays, filtered];
//     }

//     filteredArrays = [
//       ...filteredArrays,
//       refItems.filter((el) => el.bed >= bedrooms),
//     ];

//     filteredArrays = [
//       ...filteredArrays,
//       refItems.filter((el) => el.bath >= bathroms),
//     ];

//     // filteredArrays = [
//     //   ...filteredArrays,
//     //   refItems.filter(
//     //     (el) =>
//     //       (el.city?.toLocaleLowerCase().includes(searchQuery?.toLocaleLowerCase()) ||
//     //         el.location?.toLocaleLowerCase().includes(searchQuery?.toLocaleLowerCase()) ||
//     //         el.title?.toLocaleLowerCase().includes(searchQuery?.toLocaleLowerCase()) ||
//     //         (el.features && el.features.join(" ").toLocaleLowerCase().includes(searchQuery?.toLocaleLowerCase())))
//     //   ),
//     // ];

//     filteredArrays = [
//       ...filteredArrays,
//       !categories.length ? [...refItems] : refItems.filter((elm) =>
//         categories.every((elem) => elm.features.includes(elem))
//       ),
//     ];

//     if (location !== "All Cities") {
//       filteredArrays = [
//         ...filteredArrays,
//         refItems.filter((el) => el.city === location),
//       ];
//     }

// 	if (priceRange.length > 0) {
// 	const filtered = refItems.filter(
// 		(elm) => {
// 		const priceValue = elm.price ? Number(elm.price.split("$")[1].split(",").join("")) : 0;
// 		return priceValue >= priceRange[0] && priceValue <= priceRange[1];
// 		}
// 	);
// 	filteredArrays = [...filteredArrays, filtered];
// 	}

//     if (squirefeet.length > 0 && squirefeet[1]) {
//       const filtered = refItems.filter(
//         (elm) => elm.sqft >= squirefeet[0] && elm.sqft <= squirefeet[1]
//       );
//       filteredArrays = [...filteredArrays, filtered];
//     }

//     if (yearBuild.length > 0) {
//       const filtered = refItems.filter(
//         (elm) =>
//           elm.yearBuilding >= yearBuild[0] && elm.yearBuilding <= yearBuild[1]
//       );
//       filteredArrays = [...filteredArrays, filtered];
//     }

//     const commonItems = refItems.filter((item) =>
//       filteredArrays.every((array) => array.includes(item))
//     );

//     setFilteredData(commonItems);
//   }, [
//     listingStatus,
//     propertyTypes,
//     priceRange,
//     bedrooms,
//     bathroms,
//     location,
//     squirefeet,
//     yearBuild,
//     categories,
//     searchQuery,
//   ]);

	useEffect(() => {
		setPageNumber(1);
		if (currentSortingOption == "Newest") {
		const sorted = [...filteredData].sort(
			(a, b) => a.yearBuilding - b.yearBuilding,
		);
		setSortedFilteredData(sorted);
		} else if (currentSortingOption.trim() == "Price Low") {
		const sorted = [...filteredData].sort(
			(a, b) =>
			a.price.split("$")[1].split(",").join("") -
			b.price.split("$")[1].split(",").join(""),
		);
		setSortedFilteredData(sorted);
		} else if (currentSortingOption.trim() == "Price High") {
		const sorted = [...filteredData].sort(
			(a, b) =>
			b.price.split("$")[1].split(",").join("") -
			a.price.split("$")[1].split(",").join(""),
		);
		setSortedFilteredData(sorted);
		} else {
		setSortedFilteredData(filteredData);
		}
	}, [filteredData, currentSortingOption]);

	useEffect(() => {
		const activeTab = searchParams.get('activeTab');
		const listingStatusMap = {
			buy: { value: 'Residential', label: 'Buy' },
			rent: { value: 'Residential Lease', label: 'Rent' },
		};
		if (activeTab && listingStatusMap.hasOwnProperty(activeTab)) {
			setListingStatus(listingStatusMap[activeTab]);
		} else {
			setListingStatus({ value: 'All', label: 'All' });
		}
	}, [searchParams]);



	return (
		<>
		<section className="advance-search-menu bg-white position-relative default-box-shadow2 pt15 pb5 bb1 dn-992">
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
					<div className="advance-search-list no-box-shadow d-flex justify-content-center">
						<div className="dropdown-lists">
						<ul className="p-0 mb-0">
							<TopFilterBar2 filterFunctions={filterFunctions} />
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
				<div className="col-xl-6 overflow-hidden position-relative">
					<div className="half_map_area map-canvas half_style">
					{pageItems && (
						<ListingMap1 listings={pageItems ?? []} />
					)}
					</div>
				</div>
				{/* End col-7 */}

				<div className="col-xl-6">
					<div className="half_map_area_content mt30">
						<h4 className="mb-1 text-md-start text-center">
							{listingStatus.value !== 'All' ? `Homes for ${listingStatus.label}` : 'You are viewing all properties'}
						</h4>
					<div className="row align-items-center mb10">
					<TopFilterBar
						pageContentTrac={pageContentTrac}
						colstyle={colstyle}
						setColstyle={setColstyle}
						startItem={startItem}
						endItem={endItem}
						totalResults={totalResults}
						setCurrentSortingOption={setCurrentSortingOption}
					/>
					</div>
					<div className="row">
					<FeaturedListings colstyle={colstyle} listings={pageItems} />
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