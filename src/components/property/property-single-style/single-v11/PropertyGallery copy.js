import { useState, useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import listings from "@/data/listings";

const PropertyGallery = ({ id, page_data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control whether to show the popup or not

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!page_data) {
    return null; // or handle loading state
  }
  const data = listings.find((elm) => elm.id == id) || listings[0];

  const Media = page_data?.Media[0].MediaURL;

  // Function to handle opening the popup
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const imageCount = page_data?.Media.length;
  return (
    <>
      <Gallery>
        <div className="col-sm-12">
          <div className="sp-img-content mb15-md">
            <div className="popup-img border rounded sp-img position-relative">
              <img src={Media} alt="image" role="button" className="cover" />
              <button onClick={handleShowPopup} className="show-more-button">
                Show All {imageCount}
              </button>
            </div>
          </div>
        </div>

        {!isMobile && (
          <div className="col-sm-12 ">
            <div className="row col-gap-2">
              {page_data?.Media.map((image, index) => {
                return (
                  <div className="col-sm-6" key={index}>
                    <div className="sp-img-content">
                      <div
                        className={`h250 popup-img border rounded
                         sp-img mt5`}
                      >
                        <Item
                          original={image.MediaURL}
                          thumbnail={image.MediaURL}
                          // width={'1000'}
                          // height={'1000'}
                        >
                          {({ ref, open }) => (
                            <img className="w-100 h-100 cover" ref={ref} onClick={open} role="button" src={image.MediaURL} alt={image.alt} />
                          )}
                        </Item>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Gallery>

      {/* Popup/modal to display images */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-popup" onClick={handleClosePopup}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <Gallery>
              {page_data?.Media.map((image, index) => (
                <Item key={index} original={image.MediaURL} thumbnail={image.MediaURL} width={"720"} height={'480'}>
                  {({ ref, open }) => (
                    <img className="popup-img" ref={ref} onClick={open} src={image.MediaURL} alt={image.alt} />
                  )}
                </Item>
              ))}
            </Gallery>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
