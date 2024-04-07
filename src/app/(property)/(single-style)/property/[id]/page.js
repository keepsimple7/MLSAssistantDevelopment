"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import EnergyClass from "@/components/property/property-single-style/common/EnergyClass";
import FloorPlans from "@/components/property/property-single-style/common/FloorPlans";
import HomeValueChart from "@/components/property/property-single-style/common/HomeValueChart";
import InfoWithForm from "@/components/property/property-single-style/common/more-info";
import NearbySimilarProperty from "@/components/property/property-single-style/common/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/single-v2/OverView";
import PropertyAddress from "@/components/property/property-single-style/common/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import PropertyNearby from "@/components/property/property-single-style/common/PropertyNearby";
import PropertyVideo from "@/components/property/property-single-style/common/PropertyVideo";
import PropertyViews from "@/components/property/property-single-style/common/property-view";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import ReviewBoxForm from "@/components/property/property-single-style/common/ReviewBoxForm";
import VirtualTour360 from "@/components/property/property-single-style/common/VirtualTour360";
import AllReviews from "@/components/property/property-single-style/common/reviews";
import ContactWithAgent from "@/components/property/property-single-style/single-v2/ContactWithAgent";
import PropertyGallery from "@/components/property/property-single-style/single-v2/PropertyGallery";
import MortgageCalculator from "@/components/property/property-single-style/common/MortgageCalculator";
import WalkScore from "@/components/property/property-single-style/common/WalkScore";
import PropertyHeader from "@/components/property/property-single-style/single-v2/PropertyHeader";
import ScheduleForm from "@/components/property/property-single-style/single-v2/ScheduleForm";
import { useEffect, useState } from "react";
import axios from "axios";
// export const metadata = {
//   title: "Property Single V2 || Homez - Real Estate NextJS Template",
// };

const SingleV2 = ({ params }) => {
  const [data, setData] = useState(null);
  const [listingAgentData, setListingAgentData] = useState(null);
  const [agentOfficeData, setAgentOfficeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!params.id) {
          return;
        }
        const apiUrl = `https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property('${params.id}')`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: "Bearer 23c8729a55e9986ae45ca71d18a3742c",
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

    useEffect(() => {
    const fetchListingAgentData = async () => {
      if (!data) return;

      try {
        const apiUrl = `https://api.bridgedataoutput.com/api/v2/OData/mlspin/Member('${data.ListAgentMlsId}')?access_token=23c8729a55e9986ae45ca71d18a3742c`;
        const response = await axios.get(apiUrl);
        setListingAgentData(response.data);
      } catch (error) {
        console.error("Error fetching listing agent data:", error);
      }
    };

    fetchListingAgentData();
  }, [data]);

  useEffect(() => {
    const fetchAgentOfficeData = async () => {
      if (!data) return;

      try {
        const apiUrl = `https://api.bridgedataoutput.com/api/v2/OData/mlspin/Office('${data.ListOfficeMlsId}')?access_token=23c8729a55e9986ae45ca71d18a3742c`;
        const response = await axios.get(apiUrl);
        setAgentOfficeData(response.data);
      } catch (error) {
        console.error("Error fetching agent office data:", error);
      }
    };

    fetchAgentOfficeData();
  }, [data]);
    // Retrieve current URL from localStorage

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Property All Single V1 */}
      <section className="pt60 pb0 bgc-white">
        <div className="container">
          
          <div className="row">
            <PropertyHeader id={params.id} page_data={data} />
          </div>
          {/* End .row */}

          <div className="row mb30 mt30">
            <PropertyGallery id={params.id} page_data={data} />
          </div>
          {/* End .row */}

          <div className="row mt30">
            <OverView id={params.id} page_data={data} />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single V1  */}

      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-8">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Property Description</h4>
                <ProperytyDescriptions page_data={data} />
                {/* End property description */}

                <h4 className="title fz17 mb30 mt50">Property Details</h4>
                <div className="row">
                  <PropertyDetails page_data={data} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">Address</h4>
                <div className="row">
                  <PropertyAddress page_data={data} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Features &amp; Amenities</h4>
                <div className="row">
                  <PropertyFeaturesAminites page_data={data} />
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                <h4 className="title fz17 mb30">Video</h4>
                <div className="row">
                  <PropertyVideo />
                </div>
              </div> */}
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                <div className="row">
                  <PropertyNearby />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Mortgage Calculator</h4>
                <div className="row">
                  <MortgageCalculator />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Home Value</h4>
                <div className="row">
                  <HomeValueChart page_data={data} />
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Get More Information</h4>
                <InfoWithForm agentData={listingAgentData} officeData={agentOfficeData} />
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}

            <div className="col-lg-4">
              <div className="column">
                <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h6 className="title fz17 mb30">Get More Information</h6>
                  <ContactWithAgent agentData={listingAgentData} officeData={agentOfficeData} />
                  <ScheduleForm />
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SingleV2;
