import { verify_code } from "@/DAL/user";
import { useAppContext } from "@/custom-hooks/AppContext";
import { Dialog } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function VerificationCodeModal({
  openModal,
  emailAddress = "",
  handleCloseVerificationModal = () => {},
}) {
  const { setisLoggedIn } = useAppContext();
  const [inputs, setInputs] = useState({
    verification_code: "",
    email: emailAddress,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await verify_code(inputs);
    if (response.code == 200) {
      localStorage.setItem("user", JSON.stringify(response?.data?.customer));
      localStorage.setItem("token", response?.data?.token);
      setisLoggedIn(true);
      enqueueSnackbar("Account is Activated now please login to continue", {
        variant: "success",
        autoHideDuration: 3000,
      });

      handleCloseVerificationModal();
      return;
    }
    enqueueSnackbar(response.message, { variant: "error" });
  };
  useEffect(() => {
    setInputs({ verification_code: "", email: emailAddress });
    return () => {
      setInputs({
        verification_code: "",
        email: "",
      });
    };
  }, [emailAddress]);

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={openModal}>
        <div className="modal-header">
          <h5 className="modal-title">Activate Account</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseVerificationModal}
          />
        </div>
        {/* <div style={{ width: 300 }}> */}
        <form className="form-style1 p20" onSubmit={handleSubmit}>
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

          <div className="d-grid mb20">
            <button className="ud-btn btn-thm" type="submit">
              Activate Account
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
          {/* End submit */}
        </form>
        {/* </div> */}
      </Dialog>
    </>
  );
}

export default VerificationCodeModal;
