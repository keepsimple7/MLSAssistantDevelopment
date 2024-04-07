import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import PropertyHeader from "../property/property-single-style/single-v11/PropertyHeader";
import PropertyGallery from "../property/property-single-style/single-v11/PropertyGallery";
import OverView from "../property/property-single-style/single-v11/OverView";
import ProperytyDescriptions from "../property/property-single-style/common/ProperytyDescriptions";
import PropertyDetails from "../property/property-single-style/common/PropertyDetails";
import PropertyAddress from "../property/property-single-style/common/PropertyAddress";
import PropertyFeaturesAminites from "../property/property-single-style/common/PropertyFeaturesAminites";
import PropertyNearby from "../property/property-single-style/common/PropertyNearby";
import MortgageCalculator from "../property/property-single-style/common/MortgageCalculator";
import HomeValueChart from "../property/property-single-style/common/HomeValueChart";
import InfoWithForm from "../property/property-single-style/common/more-info";
import ContactWithAgent from "../property/property-single-style/single-v11/ContactWithAgent";
import ScheduleForm from "../property/property-single-style/single-v11/ScheduleForm";
import Footer from "../common/default-footer";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import SharePropertyModal from "../menu/SharePropertyModal";

export default function PropertyDetailModal({
  params,
  setParams,
  handleClickCloseModal,
}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [listingAgentData, setListingAgentData] = useState(null);
  const [agentOfficeData, setAgentOfficeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!params.id) {
          return;
        }
        setIsLoading(true);
        const apiUrl = `https://api.bridgedataoutput.com/api/v2/OData/mlspin/Property('${params.id}')`;
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: "Bearer 23c8729a55e9986ae45ca71d18a3742c",
          },
        });
        setParams({ ...params, data: response.data });
        setData(response.data);

        setOpen(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };
    if (params.data) {
      setData(params.data);
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, [params]);

  useEffect(() => {
    const fetchListingAgentData = async () => {
      if (!data?.ListAgentMlsId) return;

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
      if (!data?.ListOfficeMlsId) return;

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
  console.log(data);
  return (
    <React.Fragment>
      {/* Signup Modal */}

      {/* End Signup Modal */}
      <Dialog
        fullWidth
        maxWidth="lg"
        sx={{
          '.MuiPaper-root': {
            maxHeight: '100vh'
          }
        }}
        open={Boolean(params?.id)}
        onClose={handleClickCloseModal}
      >
        {isLoading ? (
          <Box
            height={"90vh"}
            className="d-flex justify-content-center align-items-center "
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <section id="modalBody" className="p0 bgc-white position-relative">
              <div className="container">
                <div className="row m0">
                  <div className="col-md-6 gallery-images p-md-2 p-0">
                    <PropertyGallery id={params.id} page_data={data} />
                  </div>
                  <div className="col-md-6">
                    <PropertyHeader
                      id={params.id}
                      page_data={data}
                      backButtonClick={handleClickCloseModal}
                    />
                    <section className="p-0 mt-3 property-modal-details">
                      <div className="container p-0">
                        <div className="row wrap">
                          <div className="col-lg-12">
                            <div className="ps-widget pt-0 overflow-hidden position-relative">
                              <h4 className="title fz17 mb5">
                                Property Overview
                              </h4>
                              <ProperytyDescriptions page_data={data} />

                              <h4 className="title fz17 mb10 mt10">
                                Listed By
                              </h4>
                              <ul className="fs-6">
                                <div className="d-flex align-items-center">
                                  <i className="fa-solid fa-clipboard-user mr15 fs-5"></i>
                                  <div>
                                    <li>{listingAgentData?.MemberFullName}</li>
                                    <li>
                                      {listingAgentData?.MemberPreferredPhone}
                                      <a
                                        className="ml15"
                                        href={`tel:${listingAgentData?.MemberPreferredPhone}`}
                                      >
                                        <i className="fa-solid fa-phone-volume"></i>
                                      </a>
                                      <a
                                        className="ml15"
                                        href={`sms:${listingAgentData?.MemberPreferredPhone}`}
                                      >
                                        <i className="fa-regular fa-comments"></i>
                                      </a>
                                    </li>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  <i className="fa-solid fa-building mr15 fs-5"></i>
                                  <div>
                                    <li>{agentOfficeData?.OfficeName}</li>
                                    <li>
                                      {agentOfficeData?.OfficePhone}
                                      <a
                                        className="ml15"
                                        href={`tel:${agentOfficeData?.OfficePhone}`}
                                      >
                                        <i className="fa-solid fa-phone-volume"></i>
                                      </a>
                                      <a
                                        className="ml15"
                                        href={`sms:${agentOfficeData?.OfficePhone}`}
                                      >
                                        <i className="fa-regular fa-comments"></i>
                                      </a>
                                    </li>
                                  </div>
                                </div>
                              </ul>
                              <h4 className="title fz17 mb10 mt10">Source</h4>
                              <ul className="fs-6">
                                <li>
                                  Source: {data?.OriginatingSystemID} #
                                  {data?.ListingId}
                                </li>
                              </ul>

                              <h4 className="title fz17 mb10 mt10">
                                Facts and Features
                              </h4>
                              <h4 className="title fz17 mb10 mt10">Interior</h4>
                              <ul className="fs-6">
                                <li>
                                  <b>Bedrooms and Bathrooms</b>
                                  <ul className="list-style-unset">
                                    <li>Bedrooms: {data?.BedroomsTotal}</li>
                                    <li>
                                      Bathrooms: {data?.BathroomsTotalInteger}
                                    </li>
                                    <li>
                                      Full Bathrooms: {data?.BathroomsFull}
                                    </li>
                                  </ul>
                                </li>
                                <li className="mt-3">
                                  <b>Heating</b>
                                  <ul className="list-style-unset">
                                    {data?.Heating.map((feature, index) => (
                                      <li key={index}>{feature}</li>
                                    ))}
                                  </ul>
                                </li>
                                <li className="mt-3">
                                  <div>
                                    <b>Appliances</b>
                                  </div>
                                  {data?.Appliances.map((feature, index) => (
                                    <span
                                      className="badge text-dark bg-warning bg-opacity-25 p-2 m5"
                                      key={index}
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </li>
                                <li className="mt-3">
                                  <b>Other Interior Features</b>
                                  <ul className="list-style-unset">
                                    <li>
                                      Total Sturucture Area: {data?.LivingArea}{" "}
                                      sqft
                                    </li>
                                    <li>
                                      Total Interior Liviable Area:{" "}
                                      {data?.BuildingAreaTotal} sqft
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                              <h4 className="title fz17 mb10 mt10">Property</h4>
                              <ul className="fs-6">
                                <li>
                                  <b>Parking</b>
                                  <ul className="list-style-unset">
                                    <li>Total Spaces: {data?.ParkingTotal}</li>
                                    <li>
                                      Has Uncovered Spaces:{" "}
                                      {data?.CoveredSpaces ? "Yes" : "No"}
                                    </li>
                                  </ul>
                                </li>
                                <li className="mt-3">
                                  <div>
                                    <b>Exterior Features</b>
                                  </div>
                                  {data?.ExteriorFeatures.map(
                                    (feature, index) => (
                                      <span
                                        className="badge text-dark bg-warning bg-opacity-25 p-2 m5"
                                        key={index}
                                      >
                                        {feature}
                                      </span>
                                    )
                                  )}
                                </li>
                                <li className="mt-3">
                                  <b>Lot</b>
                                  <ul className="list-style-unset">
                                    <li>
                                      Total Sturucture Area:{" "}
                                      {data?.LotSizeSquareFeet} sqft
                                    </li>
                                  </ul>
                                </li>
                                <li className="mt-3">
                                  <b>Accessibillity</b>
                                  <ul className="list-style-unset">
                                    <li>
                                      Accessibillity Features:{" "}
                                      {data?.AccessibilityFeatures.length
                                        ? data?.AccessibilityFeatures
                                        : "No"}
                                    </li>
                                  </ul>
                                </li>
                                <li className="mt-3">
                                  <b>Other Property Information</b>
                                  <ul className="list-style-unset">
                                    <li>
                                      Percel Number:{" "}
                                      {data?.ParcelNumber
                                        ? data?.ParcelNumber
                                        : "No"}
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                              <h4 className="title fz17 mb10 mt10">
                                Constuction
                              </h4>
                              <ul className="fs-6">
                                <li>
                                  <b>Type and Style</b>
                                  <ul className="list-style-unset">
                                    <li>Property Type: {data?.PropertyType}</li>
                                    <li>
                                      Property Sub Type: {data?.PropertySubType}
                                    </li>
                                  </ul>
                                </li>
                                <li className="mt-3">
                                  <b>Condition</b>
                                  <ul className="list-style-unset">
                                    <li>Year built: {data?.YearBuilt}</li>
                                  </ul>
                                </li>
                              </ul>
                              <h4 className="title fz17 mb10 mt10">
                                Community & neighborhoood
                              </h4>
                              <ul className="fs-6">
                                <li>
                                  <b>Community</b>
                                  <ul className="list-style-unset">
                                    <li>
                                      Community Features:
                                      {data?.CommunityFeatures &&
                                        data.CommunityFeatures.length > 0
                                        ? data.CommunityFeatures.join(", ")
                                        : "None"}
                                    </li>
                                  </ul>
                                </li>
                                <li className="mt-3">
                                  <b>Location</b>
                                  <ul className="list-style-unset">
                                    <li>Region: {data?.City}</li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                            {/* <OverView id={params.id} page_data={data} /> */}

                            <div className="ps-widget overflow-hidden position-relative">
                              <h4 className="title fz17 mt30">Map Location</h4>
                              <div className="row">
                                <PropertyAddress page_data={data} />
                              </div>
                            </div>
                            <div className="ps-widget mb30 mt30 overflow-hidden position-relative">
                              <h4 className="title fz17">
                                What&apos;s Nearby?
                              </h4>
                              <div className="row">
                                <PropertyNearby page_data={data} />
                              </div>
                            </div>

                            {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                              <h4 className="title fz17 mb30">
                                Mortgage Calculator
                              </h4>
                              <div className="row">
                                <MortgageCalculator />
                              </div>
                            </div> */}

                            <div className="ps-widget overflow-hidden position-relative pb50 mb50">
                              <h4 className="title fz17 mb5 mt15">
                                Home Value
                              </h4>
                              <div className="row">
                                <HomeValueChart page_data={data} />
                              </div>
                            </div>
                          </div>

                          {/* <div className="col-12">
                            <div className="column">
                              <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                                <h6 className="title fz17 mb30">
                                  Get More Information
                                </h6>
                                <ContactWithAgent
                                  agentData={listingAgentData}
                                  officeData={agentOfficeData}
                                />
                                <ScheduleForm />
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
}
