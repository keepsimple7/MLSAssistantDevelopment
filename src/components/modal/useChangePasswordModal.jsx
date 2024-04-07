import React from "react";
import ChangePasswordForm from "../property/dashboard/dashboard-profile/ChangePasswordForm";
import { Dialog } from "@mui/material";
import { useAppContext } from "@/custom-hooks/AppContext";

function useChangePassword() {
  const { handleChangePassword } = useAppContext();

  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  function MyModal() {
    return (
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
          <h4 className="title fz17 mb30">Change password</h4>
          <ChangePasswordForm
            handleChangePassword={(inputs) =>
              handleChangePassword(inputs, handleCloseModal)
            }
          />
        </div>
      </Dialog>
    );
  }
  return {
    Modal: MyModal,
    handleOpenModal,
    handleCloseModal,

    open,
    setOpen,
  };
}

export default useChangePassword;
