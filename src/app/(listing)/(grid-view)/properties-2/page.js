"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ProperteyFiltering from "@/components/listing/grid-view/listings/ProperteyFiltering";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Changed import

const GridFull3Col = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("address");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    const handleInputChange = async (address) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCbULP7ohg0MYQSZIUm4m_TdiAjHhjN3Ds`
      );
      const data = await response.json();
      console.log(data);
      if (data.status === "OK") {
        const cityNames = data.results.map((result) => {
          let city = "";
          let zipCode = "";
          result.address_components.forEach((component) => {
            if (component.types.includes("locality")) {
              city = component.long_name;
            } else if (component.types.includes("postal_code")) {
              zipCode = component.long_name;
            }
          });
          setCity(city);
          setPostalCode(zipCode);
          return `${city}, ${zipCode}`;
        });
      } else {
        console.log("Zero results or error occurred");
      }
    };
    handleInputChange(search);
  }, [search]);

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">
                  Houses in {city}, {postalCode} for Sale
                </h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">For Rent</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Property Filtering */}
      <ProperteyFiltering city={city} postalCode={postalCode} />
      {/* {(city || postalCode) && (
      )} */}
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default GridFull3Col;
