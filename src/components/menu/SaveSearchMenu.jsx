import React, { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { Box, Popover } from "@mui/material";

export default function SaveSearchMenu({
  handleSaveSearch,
  getFilterString,
  filterFunctions,
}) {
  console.log(filterFunctions);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [inputs, setInputs] = React.useState({ name: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSaveSearch(inputs, setInputs, handleClose);
  };
  const handleCopy = () => {
    const { host, pathname } = window.location;
    navigator.clipboard.writeText(`${host}${pathname}${getFilterString(true)}`);
    enqueueSnackbar("Search Copied!", { variant: "success" });
  };
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    setInputs({
      name: `Homes for ${filterFunctions?.listingStatus.label} in ${filterFunctions?.searchQuery}`,
    });
  }, [filterFunctions]);

  return (
    <div>
      {isMobile ? (
        <>
          <button
            className="btn-save-search mt-1"
            id="demo-positioned-button"
            aria-controls={open ? "" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            type="button"
          >
            <i className="fa-solid fa-file-export mr5"></i>Save Search
          </button>
        </>
      ) : (
        <>
          <li className="list-inline-item">
            <button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              type="button"
              className="open-btn mb15"
            >
              Save
            </button>
          </li>
        </>
      )}

      {/* <Button>Dashboard</Button> */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
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
          horizontal: "right",
        }}
      >
        <Box style={{ minWidth: 250, width:'100%',maxWidth:350 }}>
          <div className="d-flex mb15 align-items-center justify-content-between">
            <h5 className="mt10">Save Search</h5>
            <span onClick={handleCopy} style={{ cursor: "pointer" }}>
              <span className="icon mr1">
                <span className="fa-regular fa-copy" />
              </span>{" "}
              Copy
            </span>
          </div>
          <form className="form-style1" onSubmit={handleSubmitForm}>
            <div className="mb10">
              <label className="form-label dark-color ">Name your search</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={inputs.name}
                className="form-control"
                placeholder="Enter Name"
                required
              />
            </div>

            <div className="d-grid mb20">
              <button className="ud-btn btn-thm btn btn-sm" type="submit">
                Save Search
              </button>
            </div>
          </form>
        </Box>
      </Popover>
    </div>
  );
}
