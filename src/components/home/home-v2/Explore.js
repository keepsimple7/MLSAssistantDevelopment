import Image from "next/image";

const Explore = () => {
  // Array of iconbox data
  const iconboxData = [
    {
      icon: "/images/icon/property-buy-2.svg",
      title: "Effortless Property Management",
      text: "Say goodbye to manual listing sorting. Loretta intelligently matches properties to your specifications, saving you valuable time and energy.",
      linkText: "Find a home",
    },
    {
      icon: "/images/icon/property-sell-2.svg",
      title: "Instant Market Analysis",
      text: "Stay ahead of the curve with real-time market insights delivered directly to your fingertips. Loretta ensures you're always informed, empowering you to make informed decisions swiftly.",
      linkText: "Place an ad",
    },
    {
      icon: "/images/icon/property-rent-2.svg",
      title: "Tailored Recommendations",
      text: "Benefit from personalized recommendations that align perfectly with your preferences and objectives. Loretta learns from your interactions to provide bespoke solutions tailored to your needs.",
      linkText: "Find a rental",
    },
  ];

  return (
    <>
      {iconboxData.map((item, index) => (
        <div
          className="col-sm-6 col-lg-4"
          key={index}
          data-aos="fade-up"
          data-aos-delay={(index + 1) * 100} // Increase delay for each item
        >
          <div className="iconbox-style3 text-center">
            <div className="icon">
              <Image width={316} height={150} src={item.icon} alt="icon" loading="lazy"/>
            </div>
            <div className="iconbox-content">
              <h4 className="title">{item.title}</h4>
              <p className="text">{item.text}</p>
              <a href="#" className="ud-btn btn-thm3">
                {item.linkText}
                <i className="fal fa-arrow-right-long" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Explore;
