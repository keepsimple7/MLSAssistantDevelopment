import React from "react";

const PropertyAddress = ({ page_data }) => {
  if (!page_data) {
    return null; // or handle loading state
  }

  const addresses = [
    {
      address: page_data?.UnparsedAddress,
      city: page_data?.City,
      state: page_data?.StateOrProvince,
      zipCode: page_data?.PostalCode,
      country: page_data?.Country,
    },
  ];

  return (
    <>
      {/* {addresses.map((address, index) => (
        <div
          key={index}
          className={`col-md-12 col-xl-12 ${index === 1 ? "offset-xl-2" : ""}`}
        >
          <div className="d-flex justify-content-between">
            <div className="pd-list">
              <p className="fw600 mb10 ff-heading dark-color">Address: {address.address}</p>
              <p className="fw600 mb10 ff-heading dark-color">State: {address.state}</p>
              <p className="fw600 mb10 ff-heading dark-color">City: {address.city}</p>
              <p className="fw600 mb10 ff-heading dark-color">ZipCode: {address.zipCode}</p>
              <p className="fw600 mb-10 ff-heading dark-color">County: {address.country}</p>
            </div>
          </div>
        </div>
      ))} */}
      {/* End col */}

      <div className="col-md-12">
        <iframe
    className="position-relative bdrs12 mt30 h250"
    loading="lazy"
    src={`https://maps.google.com/maps?q=${encodeURIComponent(addresses[0].address)}&t=m&z=14&output=embed&iwloc=near`}
    title={addresses[0].address}
    aria-label={addresses[0].address}
></iframe>

      </div>
      {/* End col */}
    </>
  );
};

export default PropertyAddress;
