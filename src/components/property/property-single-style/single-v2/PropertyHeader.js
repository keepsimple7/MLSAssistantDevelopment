import listings from "@/data/listings";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PropertyHeader = ({ id, page_data, backButtonClick = null }) => {
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

  
  return (
    <>
      <div  className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title d-flex align-items-center">
            <button
              onClick={handleBackButtonClick}
              className="back-button d-flex align-items-center"
            >
              <Image
                width={15}
                height={15}
                src={"/images/back-svg.png"}
                alt="icon"
              />
            </button>
            {page_data?.UnparsedAddress}
          </h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
              {page_data?.City}
            </p>
          </div>
          <div className="property-meta d-flex align-items-center">
            <a
              className="ff-heading text-thm fz15 bdrr1 pr10 bdrrn-sm"
              href="#"
            >
              <i className="fas fa-circle fz10 pe-2" />
              For {data.forRent ? "rent" : "sale"}
            </a>
            <a
              className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"
              href="#"
            >
              <i className="far fa-clock pe-2" />
              Built &nbsp;
              {/* {page_data?.YearBuilt} */}
              {Number(new Date().getFullYear()) -
                Number(page_data?.YearBuilt)}{" "}
              years ago
            </a>
            <a className="ff-heading ml10 ml0-sm fz15" href="#">
              <i className="flaticon-fullscreen pe-2 align-text-top" />
              MLS ID {page_data?.ListingId}
            </a>
          </div>
        </div>
      </div>
      {/* End .col-lg--8 */}

      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="#">
                <span className="flaticon-like" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-new-tab" />
              </a>
              <a className="icon mr10" href="#">
                <span className="flaticon-share-1" />
              </a>
              <a className="icon" href="#">
                <span className="flaticon-printer" />
              </a>
            </div>
            <h3 className="price mb-0">
              $
              {page_data?.ListPrice.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <p className="text space fz15">
              ${(Number(page_data?.ListPrice) / data.sqft).toFixed(2)}
              /sq ft
            </p>
          </div>
        </div>
      </div>
      {/* End .col-lg--4 */}
    </>
  );
};

export default PropertyHeader;
