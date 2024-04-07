import React from "react";
import dynamic from 'next/dynamic';

const Explore = dynamic(() => import('@/components/home/home-v2/Explore'));
const About = dynamic(() => import('@/components/home/home-v2/about'));
const Hero = dynamic(() => import('@/components/home/home-v2/hero'));
const Cta = dynamic(() => import('@/components/home/home-v2/Cta'));

const DynamicContent = () => {
  return (
    <>
      <section className="home-banner-style2 p0">
        <div className="home-style2">
          <div className="container maxw1600">
            <div className="row">
              <div className="col-xl-10 mx-auto">
                <Hero />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-5">
        <div className="how-we-help position-relative mx-auto bgc-thm-light maxw1600 pt120 pt60-md pb90 pb30-md bdrs12 mx20-lg">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 m-auto wow fadeInUp"
                data-wow-delay="300ms"
              >
                <div className="main-title text-center">
                  <h2 className="title">See How MLS Assistant Can Help</h2>
                  <p className="paragraph">
                    Unlock the full potential of your real estate journey with
                    Loretta, our advanced AI MLS assistant. Loretta is designed
                    to revolutionize the way you navigate the market, offering
                    unparalleled efficiency and insight every step of the way.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <Explore />
            </div>
          </div>
        </div>
      </section>
      <section className="about-us">
        <div className="container">
          <About />
        </div>
      </section>
      <Cta />
    </>
  );
};

export default DynamicContent;
