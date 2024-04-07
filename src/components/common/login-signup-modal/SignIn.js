"use client";
import React, { useState } from "react";
import Link from "next/link";
import { login_user } from "@/DAL/user";
import { enqueueSnackbar } from "notistack";
import GoogleLoginButton from "@/components/social-login/GoogleLoginButton";
import { useAppContext } from "@/custom-hooks/AppContext";

const SignIn = ({ handleCloseLoginModal = () => { } }) => {
  const { setisLoggedIn, setOpenResetPasswordModal } = useAppContext();
  const [inputs, setInputs] = useState({ email: "", password: "", type: 1 });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let messageVariant = "error";
    const response = await login_user(inputs);
    if (response.code == 200) {
      if (response.user.status) {
        localStorage.setItem("user", JSON.stringify(response?.user));
        localStorage.setItem("token", response?.token);
        setisLoggedIn(true);
      }
      handleCloseLoginModal();
      messageVariant = "success";
    }
    if (response.message == "un_valid_account") {
      handleCloseLoginModal(inputs);
      enqueueSnackbar(
        "Please activate your account by entering 6-digit code sent to your email address",
        { variant: "info", autoHideDuration: 5000 }
      );
      return;
    }

    enqueueSnackbar(response.message, { variant: messageVariant });
  };

  return (
    <>
      <form className="form-style1" onSubmit={handleSubmit}>
        <div className="mb25">
          <label className="form-label fw600 dark-color">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            className="form-control"
            placeholder="Enter Email"
            required
          />
        </div>
        {/* End email */}

        <div className="mb15">
          <label className="form-label fw600 dark-color">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={inputs.password}
            className="form-control"
            placeholder="Enter Password"
            required
          />
        </div>
        {/* End Password */}

        <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
          <label className="custom_checkbox fz14 ff-heading">
            Remember me
            <input type="checkbox" defaultChecked="checked" />
            <span className="checkmark" />
          </label>
          <span onClick={() => setOpenResetPasswordModal(true)} className="fz14 ff-heading" role="button">
            Lost your password?
          </span>
        </div>
        {/* End  Lost your password? */}

        <div className="d-grid mb20">
          <button className="ud-btn btn-thm" type="submit">
            Sign in <i className="fal fa-arrow-right-long" />
          </button>
        </div>
        {/* End submit */}

        <div className="hr_content mb20">
          <hr />
          <span className="hr_top_text">OR</span>
        </div>

        <div className="d-grid mb10">
          <GoogleLoginButton handleCloseLoginModal={handleCloseLoginModal} />
        </div>
        <div className="d-grid mb10">
          <button className="ud-btn btn-fb" type="button">
            <i className="fab fa-facebook-f" /> Continue Facebook
          </button>
        </div>
        <div className="d-grid mb20">
          <button className="ud-btn btn-apple" type="button">
            <i className="fab fa-apple" /> Continue Apple
          </button>
        </div>
        <p className="dark-color text-center mb0 mt10">
          Not signed up?{" "}
          <Link className="dark-color fw600" href="/register">
            Create an account.
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignIn;
