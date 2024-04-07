"use client";
import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import SharePropertyModal from "@/components/menu/SharePropertyModal";
import { useAppContext } from "@/custom-hooks/AppContext";
import PropertyCard from "@/components/common/PropertyCard";

const FeaturedListings = () => {
  const {
    handleClickProperty,
    handleGetLikedProperty,
    handleUnLikeProperty,
    handleLikeProperty,
  } = useAppContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClickLikeButton = (listing) => {
    const isLiked = handleGetLikedProperty(listing?.ListingKey);
    if (isLiked) {
      handleUnLikeProperty(isLiked);
    } else {
      handleLikeProperty(listing);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property?$filter=StandardStatus eq 'Active'",
        {
          headers: {
            Authorization: "Bearer 23c8729a55e9986ae45ca71d18a3742c",
          },
        }
      );

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? ( // Display loading message while data is being fetched
        <div>Loading...</div>
      ) : (
        <Swiper
          spaceBetween={30}
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".featured-next__active",
            prevEl: ".featured-prev__active",
          }}
          pagination={{
            el: ".featured-pagination__active",
            clickable: true,
          }}
          slidesPerView={1}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {data?.value?.map((listing) => {
            return (
              <SwiperSlide key={listing.id}>
                <div className="item">
                  <PropertyCard listing={listing} handleClickProperty={handleClickProperty} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <div className="rounded-arrow arrowY-center-position">
        <button className="featured-prev__active swiper_button _prev">
          <i className="far fa-chevron-left" />
        </button>
        {/* End prev */}

        <button className="featured-next__active swiper_button _next">
          <i className="far fa-chevron-right" />
        </button>
        {/* End Next */}
      </div>
      {/* End .col for navigation  */}
    </>
  );
};

export default FeaturedListings;
