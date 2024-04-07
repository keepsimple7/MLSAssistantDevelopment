import React from "react";
import Image from "next/image";

const SingleAgentInfo = ({agentData, officeData}) => {
  // const agentData = {
  //   id: 1,
  //   name: "Arlene McCoy",
  //   phoneNumbers: ["(920) 012-3421", "(920) 012-4390"],
  //   socialMedia: ["facebook", "twitter", "instagram", "linkedin"],
  // };
  const agentName = agentData?.MemberFullName || "";
  const agentPhone = agentData?.MemberPreferredPhone || "";
  const officePhone = officeData?.OfficePhone || "";

  return (
    <div className="agent-single d-sm-flex align-items-center bdrb1 mb30 pb25">
      <div className="single-img mb30-sm">
        <Image
          width={90}
          height={90}
          className="w90"
          src="/images/team/agent-3.jpg"
          alt="agent"
        />
      </div>
      <div className="single-contant ml30 ml0-xs">
        <h6 className="title mb-1">{agentName}</h6>
        <div className="agent-meta mb10 d-md-flex align-items-center">
          <a className="text fz15" href={`tel:${agentPhone || officePhone}`}>
              <i className="flaticon-call pe-1" />
              {agentPhone || officePhone}
            </a>
        </div>
      </div>
    </div>
  );
};

export default SingleAgentInfo;
