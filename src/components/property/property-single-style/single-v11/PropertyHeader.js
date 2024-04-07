import listings from "@/data/listings";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppContext } from "@/custom-hooks/AppContext";
import SharePropertyModal from "@/components/menu/SharePropertyModal";

const PropertyHeader = ({ id, page_data, backButtonClick = null }) => {
  const {
    likedProperties,
    handleLikeProperty,
    handleGetLikedProperty,
    handleUnLikeProperty,
    handleShareProperty,
  } = useAppContext();

  const router = useRouter();
  if (!page_data) {
    return null; // or handle loading state
  }

  const handleBackButtonClick = () => {
    if (backButtonClick) {
      backButtonClick();
      return;
    }
    const currentUrl = localStorage.getItem("currentUrl");
    if (currentUrl) {
      router.push(currentUrl);
    } else {
      // If no URL is found in localStorage, navigate to the homepage
      router.push("/");
    }
  };

  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];
  const isLiked =  handleGetLikedProperty(page_data?.ListingKey) || false;
  return (
    <>
      <div className="col-lg-12">
        <button
          onClick={handleBackButtonClick}
          className="back-button d-flex align-items-center"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className="single-property-content mb30-md">
          <div className="single-property-content my-4">
            <div className="property-action d-flex align-items-center justify-content-between">
              <img
                src="images/mls-assistant.png"
                className="img-fluid logo"
                alt="MLS Assitant"
              />
              <div className="d-flex justify-content-end">
                <button
                  // disabled={isLiked}
                  onClick={() =>
                    isLiked
                      ? handleUnLikeProperty(isLiked)
                      : handleLikeProperty(page_data)
                  }
                  className="icon icon-custom me-3"
                >
                  <span
                    className={`${
                      isLiked ? "fa-solid fa-heart color-red" : "flaticon-like"
                    } me-1 d-flex align-items-center`}
                  />
                  <span>{isLiked ? "Unsave" : "Save"}</span>
                </button>
                <SharePropertyModal
                  data={page_data}
                  handleShareProperty={(inputs, setInputs, handleClose) => {
                    handleShareProperty(
                      page_data,
                      inputs,
                      setInputs,
                      handleClose
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-start flex-md-row flex-column">
            <h2 className="price mb-0">
              {page_data?.PropertyType === "Residential Lease" ||
              page_data?.PropertyType === "Commercial Lease" ? (
                <>
                  $
                  {page_data?.ListPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  <span className="fs-6">/mo</span>
                </>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `$${page_data?.ListPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`,
                  }}
                />
              )}
            </h2>
            <div
              className="d-flex align-items-end fs-6"
              style={{ "margin-bottom": "3px" }}
            >
              <p className="m-0 fw-bold pe-3 px-md-3 bdrr1">
                {page_data?.BedroomsTotal} bd
              </p>
              <p className="m-0 fw-bold px-3 bdrr1">
                {page_data?.BathroomsTotalInteger} ba
              </p>
              <p className="m-0 fw-bold px-3">
                {page_data?.BuildingAreaTotal} sqft
              </p>
            </div>
          </div>
          <p className="sp-lg-title d-flex align-items-center fs-6">
            {page_data?.UnparsedAddress}
          </p>
          <div className="property-meta d-flex align-items-center justify-content-start flex-column flex-md-row">
            <div
              className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm w-100"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              For{" "}
              {page_data?.PropertyType === "Residential Lease" ||
              page_data?.PropertyType === "Commercial Lease"
                ? "rent"
                : "sale"}
            </div>
            <div
              className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm w-100"
              href="#"
            >
              <i className="far fa-clock pe-2" />
              Built &nbsp;
              {/* {page_data?.YearBuilt} */}
              {Number(new Date().getFullYear()) -
                Number(page_data?.YearBuilt)}{" "}
              years ago
            </div>
            <div className="ff-heading ml10 ml0-sm fz15 w-100" href="#">
              <i className="flaticon-fullscreen pe-2 align-text-top" />
              MLS ID {page_data?.ListingId}
            </div>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
