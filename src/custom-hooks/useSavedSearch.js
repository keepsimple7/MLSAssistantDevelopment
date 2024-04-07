import React, { useState } from "react";
import {
  delete_customer_search_history,
  get_customer_search_history,
} from "@/DAL/user";
import useConfirmationModal from "@/components/modal/useConfirmationModal";
import { enqueueSnackbar } from "notistack";
import { useAppContext } from "./AppContext";

function useSavedSearch() {
  const { isLoggedIn } = useAppContext();
  const [listingData, setListingData] = useState([]);

  const {
    Modal,
    setModalData,
    handleCloseModal,
    handleOpenModal,
  } = useConfirmationModal();
  const fetchSavedSearch = async () => {
    if (isLoggedIn) {
      const response = await get_customer_search_history();
      if (response.code === 200) {
        setListingData(response.customer_history?.search_data);
      }
    }
  };
  const handleConfirmDeleteSearch = async (search) => {
    const response = await delete_customer_search_history(search._id);
    if (response.code == 200) {
      enqueueSnackbar(response.message, { variant: "success" });
      fetchSavedSearch();
      handleCloseModal();
      return;
    }
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const handleDeleteSearch = (search) => {
    setModalData((prev) => ({
      ...prev,
      title: "Confirmation",
      body: (
        <p>
          Are you sure you want to remove <strong>{search.name}</strong> from
          your saved Search List?
        </p>
      ),
      handleAgree: () => {
        handleConfirmDeleteSearch(search);
      },
    }));
    handleOpenModal();
  };

  return {
    listingData,
    Modal,
    fetchSavedSearch,
    handleConfirmDeleteSearch,
    handleDeleteSearch,
  };
}

export default useSavedSearch;
