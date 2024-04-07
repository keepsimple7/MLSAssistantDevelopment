import React, { useState, useCallback, useEffect } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

function PropertyGallery({ id, page_data }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control whether to show the popup or not

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
    // Function to handle opening the popup
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  // Function to handle closing the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const Media = page_data?.Media[0].MediaURL;
  const imageCount = page_data?.Media.length;

  // Transform media data to match desired format with specific width and height for each image
  const formattedMedia = page_data?.Media.map((media, index) => {
    let width, height;
    if ((index % 6) < 2) {
      width = 4;
      height = 3;
    } else {
      width = 1;
      height = 1;
    }
    return {
      src: media.MediaURL,
      width: width,
      height: height
    };
  });

  return (
    <>
      <div>
        {isMobile ? 
          (
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
          )
        : (
          <div>
            <Gallery photos={formattedMedia} onClick={openLightbox} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={formattedMedia.map(media => ({
                      ...media,
                      srcset: media.srcSet,
                      caption: media.title
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
          )}
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-popup" onClick={handleClosePopup}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <Gallery photos={formattedMedia} onClick={openLightbox} />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={formattedMedia.map(media => ({
                      ...media,
                      srcset: media.srcSet,
                      caption: media.title
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        </div>
      )}
    </>
  );
}

export default PropertyGallery;
