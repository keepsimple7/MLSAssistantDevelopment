"use client";
import { useState } from "react";
import Link from "next/link";
import { signup_user } from "@/DAL/user";
import { enqueueSnackbar } from "notistack";
import GoogleLoginButton from "@/components/social-login/GoogleLoginButton";

const SignUp = ({ handleCloseLoginModal = () => {} }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup_user(inputs);
    if (response.code == 200) {
      handleCloseLoginModal(inputs);
      enqueueSnackbar(
        "Your Account Created. Please activate your account from the mail sent to your email address.",
        { variant: "success", autoHideDuration: 5000 }
      );
      return;
    }
    enqueueSnackbar(response.message, { variant: "error" });
  };
  return (
    <form className="form-style1" onSubmit={handleSubmit}>
      <div className="mb25">
        <label className="form-label fw600 dark-color">First Name</label>
        <input
          type="text"
          name="first_name"
          onChange={handleChange}
          value={inputs.first_name}
          className="form-control"
          placeholder="First Name"
          required
        />
      </div>
      <div className="mb25">
        <label className="form-label fw600 dark-color">Last Name</label>
        <input
          type="text"
          name="last_name"
          onChange={handleChange}
          value={inputs.last_name}
          className="form-control"
          placeholder="Last Name"
          required
        />
      </div>
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
      {/* End Email */}

      <div className="mb20">
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

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit">
          Create account <i className="fal fa-arrow-right-long" />
        </button>
      </div>
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
        Already Have an Account?{" "}
        <Link className="dark-color fw600" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
