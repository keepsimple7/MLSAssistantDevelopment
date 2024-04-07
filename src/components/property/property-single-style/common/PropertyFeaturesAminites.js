import React from "react";

const PropertyFeaturesAminites = ({ page_data }) => {
  if (!page_data) {
    return null; // or handle loading state
  }

  console.log(page_data, "---page_datapage_data");

  const featuresAmenitiesData = [
    ["Air Conditioning", "Barbeque", "Dryer", "Gym"],
    ["Lawn", "Microwave", "Outdoor Shower", "Refrigerator"],
    ["Swimming Pool", "TV Cable", "Washer", "WiFi6"],
  ];

  return (
    <>
      {page_data?.Appliances.map((item, rowIndex) => (
        <div key={rowIndex} className="col-sm-6 col-md-4">
          <div className="pd-list">
            <p className="text mb10">
              <i className="fas fa-circle fz6 align-middle pe-2" />
              {item}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default PropertyFeaturesAminites;
