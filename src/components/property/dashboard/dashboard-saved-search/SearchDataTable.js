"use client";
import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { projectBaseUrl } from "../../../../../config/config";

const SearchDataTable = ({
  listingData = [],
  handleDeleteSearch = () => {},
}) => {
  return (
    <table className="table-style3 table at-savesearch">
      <thead className="t-head">
        <tr>
          <th scope="col">Search title</th>
          {/* <th scope="col">Date Created</th> */}
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {listingData.map((listing, index) => (
          <tr key={index}>
            <td className="w-50">
              <button onClick={() => {window.open(`${projectBaseUrl}/properties${listing.data}`);}}>
                {listing.name}
              </button>
            </td>
            {/* <td>{listing.createdAt}</td> */}
            <td>
              <div className="d-flex">
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`full_screen-${listing._id}`}
                  onClick={() => {window.open(`${projectBaseUrl}/properties${listing.data}`);}}
                >
                  <span className="flaticon-fullscreen-1" />
                </button>
                {/* <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`edit-${listing._id}`}
                >
                  <span className="fas fa-pen fa" />
                </button> */}
                <button
                  className="icon"
                  style={{ border: "none" }}
                  data-tooltip-id={`delete-${listing._id}`}
                  onClick={() => {
                    handleDeleteSearch(listing);
                  }}
                >
                  <span className="flaticon-bin" />
                </button>

                <ReactTooltip
                  id={`full_screen-${listing._id}`}
                  place="top"
                  content="Open in new tab"
                />
                <ReactTooltip
                  id={`edit-${listing._id}`}
                  place="top"
                  content="Edit"
                />
                <ReactTooltip
                  id={`delete-${listing._id}`}
                  place="top"
                  content="Delete"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchDataTable;
