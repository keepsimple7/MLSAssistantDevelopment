import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import SharePropertyModal from "../menu/SharePropertyModal";
import { useAppContext } from "@/custom-hooks/AppContext";
import { useState } from "react";

function PropertyCard({ listing, handleClickProperty = () => {} }) {
  const {
    handleUnLikeProperty,
    handleLikeProperty,
    handleShareProperty,
    handleGetLikedProperty,
    likedProperties
  } = useAppContext();
  const handleClickLikeButton = (listing) => {
    const isLiked = handleGetLikedProperty(listing?.ListingKey);
    if (isLiked) {
      handleUnLikeProperty(isLiked);
    } else {
      handleLikeProperty(listing);
    }
  };

  const isLiked=useMemo(() => handleGetLikedProperty(listing.ListingKey)||false, [likedProperties])

  return (
    <div className="listing-style1 mb-0">
      <div className="list-thumb">
        <Image
          width={382}
          height={248}
          className="w-100 h-100 cover"
          src={listing.Media[0].MediaURL}
          alt="listings"
          onClick={() => handleClickProperty(listing)}
        />
        <div className="sale-sticker-wrap">
          <div className="list-tag fz12">
            <span className="flaticon-electricity me-2" />
            {listing.StandardStatus}
          </div>
        </div>
        <div className="list-price">
          $
          {listing.ListPrice.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
      <div className="list-content">
        <h6 onClick={() => handleClickProperty(listing)} className="list-title">
          {listing.UnparsedAddress}
        </h6>
        <p className="list-text">{listing.location}</p>
        <div className="list-meta d-flex align-items-center">
          <a href="#">
            <span className="flaticon-bed" /> {listing.BedroomsTotal} bed
          </a>
          <a href="#">
            <span className="flaticon-shower" /> {listing.BathroomsFull} bath
          </a>
          <a href="#">
            <span className="flaticon-expand" /> {listing.LivingArea} sqft
          </a>
        </div>
        <hr className="mt-2 mb-2" />
        <div className="row list-meta2 d-flex justify-content-between align-items-center">
          <span className="col for-what">{listing.MlsStatus}</span>

          <div className="col row justify-content-end">
            <div className="col-8 col-lg-10 col-xl-8 icons d-flex align-items-center justify-content-around">
              <SharePropertyModal
                data={listing}
                shareButtonType={1}
                handleShareProperty={(inputs, setInputs, handleClose) => {
                  handleShareProperty(listing, inputs, setInputs, handleClose);
                }}
              />

              <span
                onClick={() => handleClickLikeButton(listing)}
                role="button"
              >
                <span
                  className={
                    isLiked ? "fa-solid fa-heart color-red" : "flaticon-like"
                  }
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
