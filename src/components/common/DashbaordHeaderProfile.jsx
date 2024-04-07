import { Avatar } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { useAppContext } from "@/custom-hooks/AppContext";
import useConfirmationModal from "../modal/useConfirmationModal";
import useChangePassword from "../modal/useChangePasswordModal";
import { Router } from "react-router-dom";

function DashbaordHeaderProfile() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, handleLogout, handleOpenLoginModal } = useAppContext();
  const { Modal, setModalData, handleOpenModal, handleCloseModal } =
    useConfirmationModal();
  const {
    Modal: ChangePasswordModal,
    setModalData: setChangePasswordModal,
    handleOpenModal: handleOpenChangePasswordModal,
    handleCloseModal: handleCloseChangePasswordModal,
  } = useChangePassword();
  const handleLogoutUser = () => {
    setModalData((prev) => ({
      ...prev,
      body: "Are you sure you want to logout?",
      handleAgree: () => {
        handleLogout();
        handleCloseModal();
      },
    }));
    handleOpenModal();
  };
  const handleChangePassword = () => {
    handleOpenChangePasswordModal();
  };
  const menuItems = [
    // {
    //   title: "MAIN",
    // className:'mb30'
    //   items: [
    //     {
    //       icon: "flaticon-discovery",
    //       text: "Dashboard",
    //       href: "/dashboard-home",
    //     },
    //     {
    //       icon: "flaticon-chat-1",
    //       text: "Message",
    //       href: "/dashboard-message",
    //     },
    //   ],
    // },
    {
      title: "MANAGE LISTINGS",
      showSection: isLoggedIn,
      items: [
        // {
        //   icon: "flaticon-new-tab",
        //   text: "Add New Property",
        //   href: "/dashboard-add-property",
        // },
        // {
        //   icon: "flaticon-home",
        //   text: "My Properties",
        //   href: "/dashboard-my-properties",
        // },
        {
          icon: "flaticon-like",
          text: "My Favorites",
          href: "/dashboard-my-favourites",
        },
        {
          icon: "flaticon-search-2",
          text: "Saved Search",
          href: "/dashboard-saved-search",
        },
        // { icon: "flaticon-review", text: "Reviews", href: "/dashboard-review" },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      showSection: isLoggedIn,
      items: [
        // {
        //   icon: "flaticon-protection",
        //   text: "My Package",
        //   href: "/dashboard-my-package",
        // },

        {
          icon: "flaticon-user",
          text: "My Profile",
          href: "/dashboard-my-profile",
        },
        {
          icon: "fa-solid fa-key",
          text: "Change Password",
          onClick: handleChangePassword,
        },
        {
          icon: "fa-solid fa-right-from-bracket",
          text: "Logout",
          onClick: handleLogoutUser,
        },

        // { icon: "flaticon-exit", text: "Logout", href: "/login" },
      ],
    },
    {
      title: "Profile",
      showSection: !isLoggedIn,
      items: [
        {
          icon: "fa-solid fa-right-to-bracket",
          text: "Login",
          onClick: handleOpenLoginModal,
        },
      ],
    },
  ];
  return (
    <>
      <Modal />
      <ChangePasswordModal />
      <li className=" user_setting">
        <div className="dropdown">
          <a className="btn" data-bs-toggle="dropdown">
            <Avatar />
          </a>
          <div className="dropdown-menu">
            <div className="user_setting_content">
              {menuItems.map((section, sectionIndex) =>
                section.showSection ? (
                  <div key={sectionIndex}>
                    <p
                      className={`fz15 fw400 ff-heading ${section.className}"
                        }`}
                    >
                      {section.title}
                    </p>
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        className={`dropdown-item ${
                          pathname == item.href ? "-is-active" : ""
                        } `}
                        // href={item.href}
                        onClick={() => {
                          if (item?.href) {
                            router.push(item?.href);
                            return;
                          }
                          item.onClick();
                        }}
                      >
                        <i className={`${item.icon} mr10`} />
                        {item.text}
                      </button>
                    ))}
                  </div>
                ) : (
                  <></>
                ),
              )}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default DashbaordHeaderProfile;
