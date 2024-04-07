"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import listings from "@/data/listings";

const images = [
  {
    src: "/images/listings/listing-single-3.jpg",
    alt: "2.jpg",
  },
  {
    src: "/images/listings/listing-single-5.jpg",
    alt: "5.jpg",
  },
];

const PropertyGallery = ({ id, page_data }) => {
  if (!page_data) {
    return null; // or handle loading state
  }
  const data = listings.filter((elm) => elm.id == id)[0] || listings[0];

  const Media = page_data?.Media[0].MediaURL;
  return (
    <>
      <Gallery >
        <div className="col-sm-9">
          <div className="sp-img-content mb15-md">
            <div className="popup-img preview-img-1 sp-img">
              <Item original={Media} thumbnail={Media} width={890} height={520}>
                {({ ref, open }) => (
                  <Image
                    src={Media}
                    width={890}
                    height={520}
                    ref={ref}
                    onClick={open}
                    alt="image"
                    role="button"
                    className="w-100 h-100 cover"
                  />
                )}
              </Item>
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-3">
          <div className="row">
            {page_data?.Media.slice(0, 2).map((image, index) => {
              return (
                <div className="col-sm-12 ps-lg-0" key={index}>
                  <div className="sp-img-content">
                    <div
                      className={`popup-img preview-img-${
                        index + 2
                      } sp-img mb10`}
                    >
                      <Item
                        original={image.MediaURL}
                        thumbnail={image.MediaURL}
                        width={270}
                        height={250}
                      >
                        {({ ref, open }) => (
                          <Image
                            width={270}
                            height={250}
                            className="w-100 h-100 cover"
                            ref={ref}
                            onClick={open}
                            role="button"
                            src={image.MediaURL}
                            // alt={image.alt}
                          />
                        )}
                      </Item>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Gallery>
    </>
  );
};

export default PropertyGallery;
