import * as React from "react";
import { enqueueSnackbar } from "notistack";
import ShareButtonWIthText from "../common/ShareButtonWIthText";
import ShareButtonWithoutText from "../common/ShareButtonWithoutText";
import { Popover } from "@mui/material";

export default function SharePropertyModal({
  data = null,
  handleShareProperty,
  shareButtonType = 0,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [inputs, setInputs] = React.useState({
    sender_email: "",
    receiver_email: "",
  });
  const [senderEmailDisabled, setSenderEmailDisabled] = React.useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleShareProperty(inputs, setInputs, handleClose);
  };

  const handleCopy = () => {
    const { host } = window.location;
    navigator.clipboard.writeText(
      `${host}/properties?propertyAddress=${data?.UnparsedAddress?.replaceAll(
        " ",
        "-"
      )}__${data?.ListingKey}`
    );
    enqueueSnackbar("Property Copied!", { variant: "success" });
  };
  React.useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.user_id?.email) {
        setInputs({ ...inputs, sender_email: user.user_id.email });
        setSenderEmailDisabled(true)
        return;
      }
      if (user?.email) {
        setInputs({ ...inputs, sender_email: user.email });
        setSenderEmailDisabled(true)
      }
    } catch (error) {
      console.log("Error Parsing User Data");
    }
  }, []);

  return (
    <div>
        {shareButtonType === 0 && (
          <ShareButtonWIthText open={open} handleClick={handleClick} />
        )}
        {shareButtonType === 1 && (
          <ShareButtonWithoutText open={open} handleClick={handleClick} />
        )}
      {/* <Button>Dashboard</Button> */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          elevation: 10,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            ml: 6,

            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,

              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 10,
            },
          },
        }}
        transformOrigin={{
          vertical: "top",
        }}
      >
        <div className="">
          <div className="d-flex mb15 align-items-center justify-content-between">
            <h5 className="mt10">Share Property</h5>
            
            <span onClick={handleCopy} style={{ cursor: "pointer" }}>
              <span className="icon mr1">
                <span className="fa-regular fa-copy" />
              </span>{" "}
              Copy
            </span>
          </div>
          <h5>{data?.UnparsedAddress}</h5>
          <form className="form-style1" onSubmit={handleSubmitForm}>
            <div className="mb10">
              <label className="form-label dark-color ">Your Email</label>

              <input
                type="email"
                name="sender_email"
                onChange={handleChange}
                value={inputs.sender_email}
                className="form-control"
                placeholder="Enter your email"
                disabled={senderEmailDisabled}
                required

              />

            </div>
            <div className="mb10">
              <label className="form-label dark-color ">recipient Email</label>
              <input
                type="email"
                name="receiver_email"
                onChange={handleChange}
                value={inputs.receiver_email}
                className="form-control"
                placeholder="Enter your email"
                required
              />

            </div>

            <div className="d-grid mb20">
              <button className="ud-btn btn-thm btn btn-sm" type="submit">
                Share Search
              </button>
            </div>
          </form>
        </div>
      </Popover>
    </div>
  );
}

