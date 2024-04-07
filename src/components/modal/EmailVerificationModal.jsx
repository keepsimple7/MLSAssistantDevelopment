import {
  code_verification,
  email_verificatin,
  reset_password,
} from "@/DAL/user";
import { useAppContext } from "@/custom-hooks/AppContext";
import { Dialog } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

const defaultInputValues = {
  email: "",
  verification_code: "",
  step: 1,
  password: "",
  confirm_password: "",
  show_password: false,
  show_confirm_password: false,
};
function EmailVerificationModal() {
  const {
    openResetPasswordModal,
    handleCloseResetPasswordModal,
  } = useAppContext();
  const [inputs, setInputs] = useState(defaultInputValues);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSendCodeToEmail = async () => {
    const response = await email_verificatin({ email: inputs.email });
    if (response.code == 200) {
      enqueueSnackbar("Verification code sent to your email", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setInputs({ ...inputs, verification_code: "", step: 2 });
      return;
    }
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const handleVerifyCode = async () => {
    const response = await code_verification({
      email: inputs.email,
      verification_code: inputs.verification_code,
    });
    if (response.code == 200) {
      enqueueSnackbar("Code Verified", {
        variant: "success",
        autoHideDuration: 3000,
      });
      setInputs({ ...inputs, verification_code: "", step: 3 });
      return;
    }
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const handleResetPassword = async () => {
    const response = await reset_password({
      email: inputs.email,
      password: inputs.password,
      confirm_password: inputs.confirm_password,
    });
    if (response.code == 200) {
      enqueueSnackbar("Password Changed Successfully", {
        variant: "success",
        autoHideDuration: 3000,
      });
      handleCloseResetPasswordModal(setInputs, defaultInputValues);
      return;
    }
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (inputs.step == 1) {
      await handleSendCodeToEmail();
    } else if (inputs.step == 2) {
      await handleVerifyCode();
    } else if (inputs.step == 3) {
      await handleResetPassword();
    }
    setIsLoading(false);
  };

  const toggleView = (e) => {
    const { id } = e.target;
    setInputs({ ...inputs, [id]: !inputs[id] });
  };
  const EyeView = ({ name }) => {
    return (
      <i
        style={{
          position: "absolute",
          top: "57%",
          right: 15,
          cursor: "pointer",
        }}
        id={name}
        onClick={toggleView}
        className={inputs[name] ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}
      />
    );
  };
  useEffect(() => {
    setInputs(defaultInputValues);
    return () => {
      setInputs(defaultInputValues);
    };
  }, []);
  return (
    <Dialog fullWidth maxWidth="sm" open={openResetPasswordModal}>
      <div className="modal-header">
        <h5 className="modal-title">
          {inputs?.step === 1 && "Email Verification"}
          {inputs?.step === 2 && "Verify OTP"}
          {inputs?.step === 3 && "Change Password"}
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={() =>
            handleCloseResetPasswordModal(setInputs, defaultInputValues)
          }
        />
      </div>
      {/* <div style={{ width: 300 }}> */}
      <form className="form-style1 p20" onSubmit={handleSubmit}>
        <div className="mb25">
          <label className="form-label fw600 dark-color">Email</label>
          <input
            type="email"
            disabled={inputs?.step > 1}
            name="email"
            onChange={handleChange}
            value={inputs.email}
            className="form-control"
            placeholder="Enter Email"
            required
          />
        </div>
        {inputs?.step === 2 && (
          <div className="mb25">
            <label className="form-label fw600 dark-color">
              Activation code (6-digit)
            </label>
            <input
              type="number"
              name="verification_code"
              onChange={handleChange}
              value={inputs.verification_code}
              className="form-control"
              placeholder="Enter Activation Code"
              required
            />
          </div>
        )}
        {inputs?.step === 3 && (
          <>
            <div className="mb25" style={{ position: "relative" }}>
              <label className="form-label fw600 dark-color">Password</label>
              <input
                type={inputs?.show_password ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={inputs.password}
                className="form-control"
                placeholder="Enter Password"
                required
              />
              <EyeView name="show_password" />
            </div>

            <div className="mb25" style={{ position: "relative" }}>
              <label className="form-label fw600 dark-color">
                Confirm Password
              </label>
              <input
                type={inputs?.show_confirm_password ? "text" : "password"}
                name="confirm_password"
                onChange={handleChange}
                value={inputs.confirm_password}
                className="form-control"
                placeholder="Confirm Password"
                required
              />
              <EyeView name="show_confirm_password" />
            </div>
          </>
        )}

        <div className="d-grid mb20">
          <button disabled={isLoading} className="ud-btn btn-thm" type="submit">
            {inputs?.step === 1 && "Send Code"}
            {inputs?.step === 2 && "Verify Code"}
            {inputs?.step === 3 && "Reset Password"}
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
        {/* End submit */}
      </form>
    </Dialog>
  );
}

export default EmailVerificationModal;
