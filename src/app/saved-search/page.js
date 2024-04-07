"use client";

import React, { useEffect } from "react";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Pagination from "@/components/listing/Pagination";
import SearchDataTable from "@/components/property/dashboard/dashboard-saved-search/SearchDataTable";
import useSavedSearch from "@/custom-hooks/useSavedSearch";

function SavedSearch() {
  const {
    Modal,
    listingData,
    handleDeleteSearch,
    fetchSavedSearch,
  } = useSavedSearch();

  useEffect(() => {
    fetchSavedSearch();
  }, []);

  return (
    <>
      <Modal />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      <div>
        <div className="row justify-conetent-center align-items-center my20 ">
          <div className="col-12">
            <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <SearchDataTable
                  listingData={listingData}
                  handleDeleteSearch={handleDeleteSearch}
                />
              </div>
              <div className="mt30">
                {" "}
                <Pagination totalCount={listingData?.length} />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
}

export default SavedSearch;
