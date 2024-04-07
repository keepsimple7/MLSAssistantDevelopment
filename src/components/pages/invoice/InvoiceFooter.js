import React from "react";

const InvoiceFooter = () => {
  const footerData = [
    {
      text: "www.MLS Assistant.com",
      link: "https://www.MLS Assistant.com",
    },
    {
      text: "invoice@MLS Assistant.com",
      link: "mailto:invoice@MLS Assistant.com",
    },
    {
      text: "(123) 123-456",
      link: "tel:+1123123456",
    },
  ];

  return (
    <>
      {footerData.map((data, index) => (
        <div className="col-auto" key={index}>
          <div className="invoice_footer_content text-center">
            <a className="ff-heading" href={data.link}>
              {data.text}
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default InvoiceFooter;
