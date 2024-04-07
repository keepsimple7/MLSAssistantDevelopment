"use client";
import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const LoginSignupModal = ({ handleCloseLoginModal = () => {} }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalToggleLabel">
          Welcome to MLS Assistant
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleCloseLoginModal}
        />
      </div>
      {/* End header */}

      <div className="modal-body">
        <div className="log-reg-form">
          <div className="navtab-style2">
            <nav>
              <div className="nav nav-tabs mb20" id="nav-tab" role="tablist">
                <button
                  className="nav-link active fw600"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                  onClick={() => setSelectedTab(0)}
                >
                  Sign In
                </button>
                <button
                  className="nav-link fw600"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                  onClick={() => setSelectedTab(1)}
                >
                  New Account
                </button>
              </div>
            </nav>
            {/* End nav tab items */}

            {selectedTab === 0 && <SignIn handleCloseLoginModal={handleCloseLoginModal} />}

            {selectedTab === 1 && <SignUp handleCloseLoginModal={handleCloseLoginModal} />}

            {/* End signup content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;
