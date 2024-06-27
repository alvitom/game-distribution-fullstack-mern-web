import React, { useContext } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Avatar, UnstyledButton } from "@mantine/core";
import { Menu } from "@mantine/core";
import { MdClose, MdLogout, MdManageAccounts } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { FaTrash, FaCheck, FaExchangeAlt } from "react-icons/fa";

const user = JSON.parse(sessionStorage.getItem("user"));

const UserButton = () => {
  return (
    <div className="account d-flex gap-2 align-items-center">
      <div className="account-image">
        <Avatar size="md" radius="sm" src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png" />
      </div>
      <div className="account-details d-flex flex-column">
        <span className="name">{user.username}</span>
        <span className="email">{user.email}</span>
      </div>
      <IoMdArrowDropdown className="fs-4" />
    </div>
  );
};

const Header = () => {
  const { logout, deleteAccount } = useContext(AuthContext);

  const handleLogout = async () => {
    const response = await logout();
    if (!response.success) {
      return modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <MdClose style={{ width: 100 + "px", height: 100 + "px", color: "rgb(220, 53, 69)" }} />
            </div>
            <p className="text-center">{response.message}</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else {
      sessionStorage.removeItem("user");
      location.href = "/login";
    }
  };

  const openLogoutModal = () =>
    modals.open({
      radius: "md",
      title: "Logout user",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to logout?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ),
    });

  const handleDeleteAccount = async () => {
    const response = await deleteAccount();
    if (!response.success) {
      return modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <MdClose style={{ width: 100 + "px", height: 100 + "px", color: "rgb(220, 53, 69)" }} />
            </div>
            <p className="text-center">{response.message}</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else {
      return modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <FaCheck style={{ width: 100 + "px", height: 100 + "px", color: "rgb(25, 135, 84)" }} />
            </div>
            <p className="text-center">{response.message}</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  sessionStorage.removeItem("user");
                  location.href = "/login";
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    }
  };

  const openDeleteAccountModal = () =>
    modals.open({
      radius: "md",
      title: "Delete account",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to delete your account?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              Delete
            </button>
          </div>
        </>
      ),
    });
  return (
    <>
      <header className="header">
        <div className="container-fluid mx-3">
          <div className="d-flex align-items-center">
            <a href="/" className="brand">
              Alvito Game Store
            </a>
          </div>
          <div className="d-flex gap-3 align-items-center">
            {/* <button className="notification bg-transparent border-0 text-white">
              <Indicator inline processing color="red" size={12}>
                <IoIosNotifications className="fs-2" />
              </Indicator>
            </button> */}
            <Menu shadow="md" width={278}>
              <Menu.Target>
                <UnstyledButton>
                  <UserButton />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<MdManageAccounts />} onClick={() => (location.href = "/profile")}>
                  My Profile
                </Menu.Item>
                {/* <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>Pengaturan</Menu.Item> */}
                <Menu.Item leftSection={<FaExchangeAlt />} onClick={() => (location.href = "/change-password")}>
                  Change Password
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" leftSection={<FaTrash />} onClick={openDeleteAccountModal}>
                  Delete Account
                </Menu.Item>
                <Menu.Item color="red" leftSection={<MdLogout />} onClick={openLogoutModal}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
