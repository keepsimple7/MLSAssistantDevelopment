"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/custom-hooks/AppContext";
import DashbaordHeaderProfile from "@/components/common/DashbaordHeaderProfile";

const Header = () => {
  const { isLoggedIn, handleOpenLoginModal } = useAppContext();
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style at-home2  main-menu ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
      >
        <nav className="posr">
          <div className="container posr">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <img
                        src="/images/mls-assistant-white.png"
                        alt="MLS Assistant"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <img
                        src="/images/mls-assistant.png"
                        alt="MLS Assistant"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  <MainMenu />
                  {!isLoggedIn ? (
                    <a
                      href="#"
                      className="login-info d-flex align-items-center"
                      role="button"
                      onClick={handleOpenLoginModal}
                    >
                      <i className="far fa-user-circle fs-5 me-2" />
                      Login
                    </a>
                  ) : null}

                  {isLoggedIn && <DashbaordHeaderProfile />}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default Header;
