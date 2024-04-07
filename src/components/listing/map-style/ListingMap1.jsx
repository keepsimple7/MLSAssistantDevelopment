"use client";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/components/common/PropertyCard";
import { useRouter } from "next/navigation";

const option = {
  zoomControl: true,
  disableDefaultUI: true,
  styles: [
    {
      featureType: "all",
      elementType: "geometry.fill",
      stylers: [
        {
          weight: "2.00",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#9c9c9c",
        },
      ],
    },
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          color: "#f2f2f2",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [
        {
          saturation: 0,
        },
        {
          lightness: 0,
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#7b7b7b",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#46bcec",
        },
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#c8d7d4",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#070707",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
  ],
  scrollwheel: true,
};
const containerStyle = {
  width: "100%",
  height: "100%",
};
export default function ListingMap1({ listings, handleClickProperty }) {
  const router = useRouter();
  const handleClickPropertyButton = (listing) => {
    router.replace(
      `/properties?propertyAddress=${listing.UnparsedAddress?.replaceAll(
        " ",
        "-"
      )}__${listing.ListingKey}`
    );
    handleClickProperty(listing);
  };
  
  const [getLocation, setLocation] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCbULP7ohg0MYQSZIUm4m_TdiAjHhjN3Ds",
  });
  const center = useMemo(
    () => ({ lat: 42.4072, lng: -71.3824 }),
    []
  );

  // add long & lat
  const locationHandler = (location) => {
    console.log("location"+location);
    setLocation(location);
    if (map) {
      map.panTo({
        lat: location.Latitude,
        lng: location.Longitude,
      });
      map.setZoom(10); // Set your desired zoom level here
    }
  };

  // close handler
  const closeCardHandler = () => {
    setLocation(null);
  };
  if (!listings) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        {!isLoaded ? (
          <p>Loading...</p>
        ) : (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            options={option}
          >
            <MarkerClusterer>
              {(clusterer) =>
                  listings?.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={{
                      lat: marker.Latitude,
                      lng: marker.Longitude,
                    }}
                    clusterer={clusterer}
                    onClick={() => locationHandler(marker)}
                  ></Marker>
                ))
              }
            </MarkerClusterer>
            {getLocation !== null && (
              <InfoWindow position={{ lat: getLocation.Latitude, lng: getLocation.Longitude}} onCloseClick={closeCardHandler}>
                <PropertyCard
                  handleClickProperty={handleClickPropertyButton}
                  listing={getLocation}
                />
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </>
    );
  }
}
