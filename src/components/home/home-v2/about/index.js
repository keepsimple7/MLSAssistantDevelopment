import React from "react";
import Funfact from "./Funfact";
import ProductSingle from "./ProductSingle";
import Image from "next/image";
import VideoBox from "./VideoBox";

const About = () => {
  return (
    <div className="row mt80 mt0-md">
      <div className="col-md-6 col-xl-6 d-none d-md-block">
        <div className="position-relative">
          <div className="img-box-7">
            <Image
              width={591}
              height={768}
              className="w-100 h-100 cover img-1"
              src="/images/about/about-2.png"
              alt="about"
            />
          </div>
          <div className="img-box-8 position-relative">
            <Image
              width={193}
              height={193}
              className="img-1 spin-right"
              src="/images/about/element-1.png"
              alt="about"
            />
          </div>
        </div>
      </div>
      {/* End col */}

      <div className="col-md-6 col-xl-4 offset-xl-2">
        <div className="about-box-1">
          <h2 className="title mb30">Let Us Help You With Finding Your Dream Home</h2>
          <p className="text mb20 fz15">
            &quot;Let Us Help You With Finding Your Dream Home&quot; is more than just a tagline – it&apos;s our commitment to you. With a passion for real estate and a dedication to exceptional service.
            <br />
            <br />
            At the heart of our approach is Loretta AI, our innovative assistant powered by cutting-edge technology. Whether youre seeking a cozy starter home or a luxurious retreat, we&apos;re equipped to assist you every step of the way.
            <br />
            <br />
            Navigating the real estate market can be daunting, but with our expertise and Loretta&apos;s assistance, you&apos;ll have a trusted partner by your side. Let us take the stress out of your search and help you find the home you&apos;ve always wanted. Reach out to us today and let&apos;s embark on this journey together.
          </p>
          {/* <Funfact /> */}
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default About;
