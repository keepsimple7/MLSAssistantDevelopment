"use client";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";


const FeaturedListings = ({ data, colstyle, listings }) => {
  const router = useRouter();
  return (
    <>
        {listings?.value
          .filter((listing) => listing.Media && listing.Media.length > 0)
          .map((listing) => (
            <div
              className={` ${
                colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
              }`}
              key={listing.id} // Unique key prop added here
            >
            <div
              className={
                colstyle
                  ? "listing-style1 listCustom listing-type"
                  : "listing-style1"
              }
            >
              <div className="list-thumb">
                <Image
                  width={382}
                  height={248}
                  className="w-100 cover"
                  style={{ height: "230px" }}
                  src={listing.Media[0].MediaURL} // Since we've filtered out empty Media arrays, we can safely access the first element
                  alt="listings"
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
                <h6 className="list-title">
                  <Link href={`/property/${listing.ListingKey}`}>
                    {listing.UnparsedAddress}
                  </Link>
                </h6>
                <p className="list-text">{listing.location}</p>
                <div className="list-meta d-flex align-items-center">
                  <a href="#">
                    <span className="flaticon-bed" /> {listing.BedroomsTotal}{" "}
                    bed
                  </a>
                  <a href="#">
                    <span className="flaticon-shower" /> {listing.BathroomsFull}{" "}
                    bath
                  </a>
                  <a href="#">
                    <span className="flaticon-expand" /> {listing.LivingArea}{" "}
                    sqft
                  </a>
                </div>
                <hr className="mt-2 mb-2" />
                <div className="list-meta2 d-flex justify-content-between align-items-center">
                  <span className="for-what">{listing.MlsStatus}</span>
                  <div className="icons d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-fullscreen" />
                    </a>
                    <a href="#">
                      <span className="flaticon-new-tab" />
                    </a>
                    <a href="#">
                      <span className="flaticon-like" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default FeaturedListings;
