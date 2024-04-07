import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function useConfirmationModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const [modalData, setModalData] = React.useState({
    title: "Confirmation",
    body: "Are you sure You want to do this?",
    handleAgree: handleCloseModal,
    handleDisagree: handleCloseModal,
  });

  function MyModal() {
    return (
      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><h4>{modalData.title}</h4></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>{modalData.body}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={modalData.handleDisagree}>No</Button>
          <Button variant="contained" onClick={modalData.handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return {
    Modal: MyModal,
    handleOpenModal,
    handleCloseModal,
    setModalData,
    modalData,
    open,
    setOpen,
  };
}
