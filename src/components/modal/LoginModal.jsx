import React, { useState } from "react";
import { Dialog } from "@mui/material";
import LoginSignupModal from "../common/login-signup-modal";
import VerificationCodeModal from "./VerificationCodeModal";
import { useAppContext } from "@/custom-hooks/AppContext";

function LoginModal({ ...props }) {
  const {
    openLoginModal,
    handleCloseLoginModal,
  } = useAppContext();
  const [openVerificationModal, setOpenVerificationModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

  const handleLoginModal = (inputs = {}) => {
    handleCloseLoginModal();
    if (inputs?.email) {
      setOpenVerificationModal(true);
      setSelectedEmail(inputs.email);
    }
  };
  const handleVerificationModal = () => {
    setOpenVerificationModal(false);
    setSelectedEmail("");
  };

  return (
    <>
      <VerificationCodeModal
        openModal={openVerificationModal}
        handleCloseVerificationModal={handleVerificationModal}
        emailAddress={selectedEmail}
      />
      <Dialog
        fullWidth
        maxWidth="sm"
        open={openLoginModal}
        onClose={handleLoginModal}
      >
        <LoginSignupModal handleCloseLoginModal={handleLoginModal} />
      </Dialog>
    </>
  );
}

export default LoginModal;
