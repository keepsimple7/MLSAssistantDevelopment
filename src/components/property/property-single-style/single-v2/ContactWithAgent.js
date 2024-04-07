import Image from "next/image";
import React from "react";

const ContactWithAgent = ({ agentData, officeData }) => {
  // Extracting agent name and contact info
  const agentName = agentData?.MemberFullName || "";
  const agentPhone = agentData?.MemberPreferredPhone || "";
  const officePhone = officeData?.OfficePhone || "";

  return (
    <>
      <div className="agent-single d-sm-flex align-items-center pb25">
        <div className="single-img mb30-sm">
          {/* Use a default agent avatar or the actual agent image if available */}
          <Image
            width={90}
            height={90}
            className="w90"
            src="/images/team/agent-3.jpg" // Replace with actual agent image source if available
            alt="avatar"
          />
        </div>
        <div className="single-contant ml20 ml0-xs">
          <h6 className="title mb-1">{agentName}</h6>
          <div className="agent-meta mb10 d-md-flex align-items-center">
            {/* Display agent phone if available, otherwise display office phone */}
            <a className="text fz15" href={`tel:${agentPhone || officePhone}`}>
              <i className="flaticon-call pe-1" />
              {agentPhone || officePhone}
            </a>
          </div>
          {/* You can add additional agent details or actions here */}
          {/* <a href="#" className="text-decoration-underline fw600">
            View Listings
          </a> */}
        </div>
      </div>
      {/* End agent-single */}
    </>
  );
};

export default ContactWithAgent;
