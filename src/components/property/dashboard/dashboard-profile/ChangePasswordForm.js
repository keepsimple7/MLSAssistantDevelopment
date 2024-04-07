"use client";
import React, { useState } from "react";

const ChangePasswordForm = ({ handleChangePassword }) => {
  const [inputs, setInputs] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",

    show_old_password: false,
    show_new_password: false,
    show_confirm_password: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
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
  return (
    <form
      className="form-style1"
      onSubmit={(e) => {
        e.preventDefault();
        handleChangePassword(inputs);
      }}
    >
      <div className="row">
        <div className="col-sm-6">
          <div className="mb20" style={{ position: "relative" }}>
            <label className="heading-color ff-heading fw600 mb10">
              Old Password
            </label>
            <input
              type={inputs?.show_old_password ? "text" : "password"}
              className="form-control"
              placeholder="Old Password"
              name="old_password"
              value={inputs.old_password}
              onChange={handleChange}
              required
            />
            <EyeView name="show_old_password" />
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="row">
        <div className="col-sm-6">
          <div className="mb20" style={{ position: "relative" }}>
            <label className="heading-color ff-heading fw600 mb10">
              New Password
            </label>
            <input
              type={inputs?.show_new_password ? "text" : "password"}
              className="form-control"
              placeholder="New Password"
              name="new_password"
              value={inputs.new_password}
              onChange={handleChange}
              required
            />
            <EyeView name="show_new_password" />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6">
          <div className="mb20" style={{ position: "relative" }}>
            <label className="heading-color ff-heading fw600 mb10">
              Confirm New Password
            </label>
            <input
              type={inputs?.show_confirm_password ? "text" : "password"}
              className="form-control"
              placeholder="Confirm New Password"
              name="confirm_password"
              value={inputs.confirm_password}
              onChange={handleChange}
              required
            />
            <EyeView name="show_confirm_password" />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark">
              Change Password
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
