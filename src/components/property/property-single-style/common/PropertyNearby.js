"use client"
import React, { useState, useEffect } from "react";

const PropertyNearby = ({ page_data }) => {
  const [educationData, setEducationData] = useState([]);
  const [healthMedicalData, setHealthMedicalData] = useState([]);
  const [transportationData, setTransportationData] = useState([]);
  console.log(educationData, healthMedicalData, transportationData)
  const tabsData = [
    {
      title: "Education",
      data: educationData.slice(0, 5),
    },
    {
      title: "Health & Medical",
      data: healthMedicalData.slice(0, 5),
    },
    {
      title: "Transportation",
      data: transportationData.slice(0, 5),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Google Places API for Education
        const educationResponse = await fetchPlacesData(`education`);
        setEducationData(educationResponse);

        // Fetch data from Google Places API for Health & Medical
        const healthMedicalResponse = await fetchPlacesData(`health medical`);
        setHealthMedicalData(healthMedicalResponse);

        // Fetch data from Google Places API for Transportation
        const transportationResponse = await fetchPlacesData(`transportation`);
        setTransportationData(transportationResponse);
      } catch (error) {
        console.error('Error fetching nearby places data:', error);
      }
    };

    fetchData();
  }, [page_data?.UnparsedAddress]);

  const fetchPlacesData = async (value) => {
    try {
      // Create a new PlacesService object
      const placesService = new google.maps.places.PlacesService(document.createElement('div'));

      // User's location
      const userLocation = {
        lat: parseFloat(page_data?.Latitude),
        lng: parseFloat(page_data?.Longitude)
      };

      // Perform a nearby search
      return new Promise((resolve, reject) => {
        placesService.nearbySearch(
          {
            location: userLocation,
            radius: 5000, // Set the search radius
            keyword: value, // Use the provided value as the keyword for the search
            type: ['establishment'], // Adjust types as needed
          },
          (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              // Map results to desired format
              const placesData = results.map((result) => {
                // Calculate distance using Haversine formula
                const distance = haversineDistance(
                  userLocation.lat,
                  userLocation.lng,
                  result.geometry.location.lat(),
                  result.geometry.location.lng()
                );

                const placeData = {
                  name: result.name,
                  rating: result.rating, // Rating of the place
                  distance: distance.toFixed(2) // Round to 2 decimal places
                  // Add more details if needed
                };
                return placeData;
              });
              resolve(placesData);
            } else {
              reject(status);
            }
          }
        );
      });
    } catch (error) {
      console.error('Error fetching places data:', error);
      throw error;
    }
  };

  // Function to calculate distance using Haversine formula
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  // Function to convert degrees to radians
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  return (
    <div className="col-md-12">
      <div className="navtab-style1">
        <nav>
          <div className="nav nav-tabs mb20" id="nav-tab2" role="tablist">
            {tabsData.map((tab, index) => (
              <button
                key={index}
                className={`nav-link fw600 ${index === 0 ? "active" : ""}`}
                id={`nav-item${index + 1}-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#nav-item${index + 1}`}
                type="button"
                role="tab"
                aria-controls={`nav-item${index + 1}`}
                aria-selected={index === 0 ? "true" : "false"}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </nav>

        <div className="tab-content" id="nav-tabContent">
          {tabsData.map((tab, index) => (
            <div
              key={index}
              className={`tab-pane fade fz15 ${index === 0 ? "active show" : ""}`}
              id={`nav-item${index + 1}`}
              role="tabpanel"
              aria-labelledby={`nav-item${index + 1}-tab`}
            >
              {tab.data && tab.data.map((detail, detailIndex) => (
                <div
                  key={detailIndex}
                  className="nearby d-sm-flex align-items-center mb20"
                >
                  <div className="rating dark-color mr15 ms-1 mt10-xs mb10-xs">
                    <span className="fw600 fz14">{detail.rating}</span>
                    <span className="text fz14">/10</span>
                  </div>
                  <div className="details">
                    <p className="dark-color fw600 mb-0">
                      {tab.title === "Education"
                        ? detail.name
                        : detail.name || detail.name}
                    </p>
                    <p className="text mb-0">
                      {tab.title === "Education"
                        ? `Distance: ${detail.distance}`
                        : `Distance: ${detail.distance}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyNearby;
