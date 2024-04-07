// import Home_V1 from "./(home)/home-v1/page";
import Wrapper from "./layout-wrapper/wrapper";
import Home from "./(home)/home-v2/page";
import React from "react";


export const metadata = {
  title: "MLS Assistant || Your Real Estate Experts",
};

export default function MainRoot() {
  return (
    <React.StrictMode>
      
        <Wrapper>
          <Home />
        </Wrapper>
    </React.StrictMode>
  );
}
