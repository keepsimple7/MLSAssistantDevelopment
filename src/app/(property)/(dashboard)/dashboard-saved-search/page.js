"use client";

import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Pagination from "@/components/property/Pagination";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import SearchDataTable from "@/components/property/dashboard/dashboard-saved-search/SearchDataTable";
import { useAppContext } from "@/custom-hooks/AppContext";
import useSavedSearch from "@/custom-hooks/useSavedSearch";
import { useEffect } from "react";

const DashboardSavedSearch = () => {
  const {isLoggedIn}=useAppContext()
  const {
    Modal,
    listingData,
    handleDeleteSearch,
    fetchSavedSearch,
  } = useSavedSearch();

  useEffect(() => {
    fetchSavedSearch();
  }, [isLoggedIn]);

  return (
    <>
      <Modal />
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>My Favourites</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="packages_table table-responsive">
                      <SearchDataTable
                        listingData={listingData}
                        handleDeleteSearch={handleDeleteSearch}
                      />
                    </div>
                    {/* <div className="mt30">
                      <Pagination />
                    </div> */}
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardSavedSearch;
