import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { login_with_google } from "@/DAL/user";
import { GoogleLogin } from "@react-oauth/google";
import { useAppContext } from "@/custom-hooks/AppContext";

function GoogleLoginButton({ handleCloseLoginModal = () => {} }) {

  const {setisLoggedIn}=useAppContext()
  // succes login with google
  const handleSuccessGoogleLogin = async (googleCredential) => {
    try {
      const credentialResponse = jwtDecode(googleCredential?.credential);
      const paylod = {
        first_name: credentialResponse.given_name,
        last_name: credentialResponse.family_name,
        email: credentialResponse.email,
      };

      let messageVariant = "error";
      const response = await login_with_google(paylod);
      if (response.code == 200) {
        messageVariant = "success";
        if (response.message == "Please Validate Your account") {
          handleCloseLoginModal(paylod);
          enqueueSnackbar(
            "Please activate your account by entering 6-digit code sent to your email address",
            { variant: "info", autoHideDuration: 5000 }
          );
          return;
        } else {
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(paylod));
          setisLoggedIn(true)
          handleCloseLoginModal();
        }
      }
      if (response.message == "un_valid_account") {
        handleCloseLoginModal(paylod);
        enqueueSnackbar(
          "Please activate your account by entering 6-digit code sent to your email address",
          { variant: "info", autoHideDuration: 5000 }
        );

        return;
      }
      enqueueSnackbar(response.message, { variant: messageVariant });
    } catch (error) {
      enqueueSnackbar("Somthing Went Wrong", { variant: "error" });
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleSuccessGoogleLogin}
        onError={() => {
          console.log("Login Failed");
        }}
        type="standard"
        size="large"
      />

      {/* <button
        onClick={loginWithGoogle}
        className="ud-btn btn-white"
        type="button"
      >
        <i className="fab fa-google" /> Continue Google
      </button> */}
    </>
  );
}

export default GoogleLoginButton;
