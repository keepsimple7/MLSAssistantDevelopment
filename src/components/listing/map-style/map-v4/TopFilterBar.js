'use client'
import React, {useState, useEffect} from "react";
const TopFilterBar = ({ setCurrentSortingOption, colstyle, setColstyle, pageContentTrac, startItem, endItem, totalResults, filterFunctions }) => {
  const [isMobile, setIsMobile] = useState(false); // State to determine if user is on mobile
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {
        isMobile ? (
          <div>
            <h6 className="mb-1 text-md-start text-start">
              {filterFunctions.listingStatus.value !== "All" ? (
                `${filterFunctions.searchQuery ? `${filterFunctions.searchQuery} Homes for ${filterFunctions.listingStatus.label === "Buy" ? "Sale" : filterFunctions.listingStatus.label}` : ""}`
              ) : ("You are viewing all properties")}
            </h6>
          </div>
        ) : (
            <>
              <h4 className="mb-1 text-md-start text-center">
                {filterFunctions.listingStatus.value !== "All"
                  ? `Homes for ${filterFunctions.listingStatus.label}`
                  : "You are viewing all properties"}
              </h4>
              <div className="col-sm-6">
                <div className="text-center text-sm-start">
                  <p className="pagination_page_count mb-0">
                    <p>Showing {startItem}–{endItem} of {totalResults} results</p>
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
                  <div className="pcs_dropdown pr10 d-flex align-items-center">
                    <span style={{ minWidth: "60px" }}>Sort by</span>
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
        )
      }
    </>
  );
};

export default TopFilterBar;
