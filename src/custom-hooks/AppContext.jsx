import {
  add_customer_property,
  delete_customer_property,
  get_customer_property,
  share_property_via_email,
} from "@/DAL/save-property";
import { change_password } from "@/DAL/user";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { createContext, useState, useEffect, useContext } from "react";

const MyContext = createContext();
export const useAppContext = () => useContext(MyContext);
function AppContext({ children }) {
  // ==========================hooks=========================//

  const router = useRouter();

  // ======================states==============================//
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [likedProperties, setLikedProperties] = useState([]);
  const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);

  // ================================handlers and functions===============//
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setisLoggedIn(false);
  };

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const fetchLikedProperties = async () => {
    const response = await get_customer_property();
    if (response.code === 200) {
      setLikedProperties(response?.customer_property?.property_data);
    }
  };

  const handleGetLikedProperty = (ListingKey) =>
    likedProperties?.find(
      (property) => property?.data?.ListingKey == ListingKey
    );

  const handleLikeProperty = async (property) => {
    try {
      if (!isLoggedIn) {
        handleOpenLoginModal();
        return;
      }
      if (!property) return;
      delete property["@odata.id"];
      console.log(property, "asaasaa");
      const payload = {
        property_data: {
          data: property,
        },
      };
      setLikedProperties([...likedProperties, { data: property }]);
      const response = await add_customer_property(payload);

      if (response.code == 200) {
        enqueueSnackbar("Property added to save list", { variant: "success" });
      }
      fetchLikedProperties();
    } catch (error) {
      console.log("Somthing Went Wrong");
    }
  };
  const handleUnLikeProperty = async (property) => {
    if (!isLoggedIn) {
      handleOpenLoginModal();
      return;
    }
    likedProperties.splice(likedProperties.length - 1, 1);
    setLikedProperties([...likedProperties]);
    const response = await delete_customer_property(property._id);
    if (response.code == 200) {
      enqueueSnackbar("Property removed from saved list", {
        variant: "success",
      });
    }
    fetchLikedProperties();
  };
  const handleShareProperty = async (
    listing,
    inputs,
    setInputs,
    handleClose
  ) => {
    // if (!isLoggedIn) {
    //   handleOpenLoginModal();
    //   return;
    // }
    try {
      const data = { ...listing };
      delete data?.["@odata.id"];
      const payload = {
        ...inputs,
        property_object: data,
      };
      const response = await share_property_via_email(payload);
      if (response.code == 200) {
        enqueueSnackbar(`Property shared to ${payload?.receiver_email}`, {
          variant: "success",
        });
        setInputs({ sender_email: "", receiver_email: "" });
        handleClose();
      }
    } catch (error) {
      console.log("Error while sharing property");
    }
  };
  const getPropertyAddress = ({ UnparsedAddress, ListingKey }) => {
    return `${"/properties"}?propertyAddress=${UnparsedAddress?.replaceAll(
      " ",
      "-"
    )}__${ListingKey}`;
  };
  const handleClickProperty = (listing) => {
    router.push(getPropertyAddress(listing));
  };
  const handleChangePassword = async (inputs, handleClose) => {
    const payload = {
      old_password: inputs.old_password,
      new_password: inputs.new_password,
      confirm_password: inputs.confirm_password,
    };
    const respone = await change_password(payload);
    if (respone.code == 200) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setisLoggedIn(false);
      handleClose();
      enqueueSnackbar(respone.message, { variant: "success" });
      return;
    }
    enqueueSnackbar(respone.message, { variant: "error" });
  };
  const handleCloseResetPasswordModal = (setInputs, defaultInputValues) => {
    if (setInputs) {
      setInputs(defaultInputValues);
    }
    setOpenResetPasswordModal(false);
  };

  // ======================= useeffects==============================//
  useEffect(() => {
    const userExist =
      localStorage.getItem("token") && localStorage.getItem("user");
    if (userExist) {
      setisLoggedIn(true);
      fetchLikedProperties();
    } else {
      setLikedProperties([]);
    }
  }, [isLoggedIn]);

  const collection = {
    // states
    openLoginModal,
    setOpenLoginModal,
    isLoggedIn,
    setisLoggedIn,
    likedProperties,
    setLikedProperties,
    openResetPasswordModal,
    setOpenResetPasswordModal,

    // handlers
    handleLogout,
    getPropertyAddress,
    handleLikeProperty,
    handleOpenLoginModal,
    handleCloseLoginModal,
    handleGetLikedProperty,
    handleUnLikeProperty,
    handleShareProperty,
    handleClickProperty,
    handleChangePassword,
    handleCloseResetPasswordModal,
  };
  return <MyContext.Provider value={collection}>{children}</MyContext.Provider>;
}

export default AppContext;
