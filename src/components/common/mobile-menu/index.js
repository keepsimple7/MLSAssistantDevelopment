"use client";
import Link from "next/link";
import Image from "next/image";
import ContactInfo from "./ContactInfo";
import Social from "./Social";
import ProSidebarContent from "./ProSidebarContent";
import { Avatar } from "@mui/material";
import DashbaordHeaderProfile from "../DashbaordHeaderProfile";
const MobileMenu = () => {
  return (
    <div className="mobilie_header_nav stylehome1">
      <div className="mobile-menu">
        <div className="header innerpage-style">
          <div className="menu_and_widgets">
            <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
              <a
                className="menubar"
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                <Image
                  width={25}
                  height={9}
                  src="/images/mobile-dark-nav-icon.svg"
                  alt="mobile icon"
                />
              </a>
              <Link className="mobile_logo" href="/">
                <Image
                  width={70}
                  height={44}
                  src="/images/mls-assistant.png"
                  alt="logo"
                />
              </Link>
              <DashbaordHeaderProfile/>
            </div>
          </div>
        </div>
      </div>
      {/* /.mobile-menu meta */}

      <div
        className="offcanvas offcanvas-start mobile_menu-canvas"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true"
      >
        <div className="rightside-hidden-bar">
          <div className="hsidebar-header">
            <div
              className="sidebar-close-icon"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <span className="far fa-times"></span>
            </div>
            <h4 className="title">Welcome to MLS Assistant</h4>
          </div>
          {/* End header */}

          <div className="hsidebar-content ">
            <div className="hiddenbar_navbar_content">

              {/* <ProSidebarContent /> */}
              <div className="p-3">
                <Link href="/" className="d-block">
                  Home
                </Link>
                <Link href="/properties" className="d-block mt-2 mb-2">
                  properties
                </Link>

              </div>
              {/* End .hiddenbar_navbar_menu */}

              <div className="hiddenbar_footer position-relative bdrt1">
                <div className="row pt45 pb30 pl30">
                  <ContactInfo />
                </div>
              </div>
              {/* hiddenbar_footer */}
            </div>
          </div>
          {/* End hsidebar-content */}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
