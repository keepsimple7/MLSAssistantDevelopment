"use client";
import React, { useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import listings from "@/data/listings";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/custom-hooks/AppContext";
import SharePropertyModal from "@/components/menu/SharePropertyModal";
import PropertyCard from "@/components/common/PropertyCard";

const ListingsFavourites = () => {
  const { likedProperties } = useAppContext();

  
  return (
    <>
      {likedProperties.length === 0 ? (
        <h3>No items available.</h3>
      ) : (
        likedProperties.map((property) => (
          <div className="col-12 col-md-6 col-lg-4 mb-3" key={property._id}>
            <div className="item">
              <PropertyCard listing={property?.data} />
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ListingsFavourites;
