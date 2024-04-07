import React from "react";

const PropertyDetails = ({ page_data }) => {
  if (!page_data) {
    return null; // or handle loading state
  }
  const columns = [
    [
      // {
      //   label: "Property ID",
      //   value: page_data?.ListingId,
      // },
      {
        label: "Price",
        value: page_data?.ListPrice,
      },
      {
        label: "Property Size",
        value: page_data?.BuildingAreaTotal,
      },
      {
        label: "Bathrooms",
        value: page_data?.BathroomsFull,
      },
      {
        label: "Bedrooms",
        value: page_data?.BedroomsTotal,
      },
    ],
    [
      {
        label: "Garage",
        value: page_data?.ParkingTotal,
      },
      // {
      //   label: "Garage Size",
      //   value: "200 SqFt",
      // },
      {
        label: "Year Built",
        value: page_data?.YearBuilt,
      },
      {
        label: "Property Type",
        value: page_data?.PropertySubType,
      },
      {
        label: "Property Status",
        value: page_data?.StandardStatus,
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6`}
        >
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
