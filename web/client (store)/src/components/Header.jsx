import { Avatar, Menu, UnstyledButton } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaSearch, FaHeart, FaTrash } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

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
  const [active, setActive] = useState("Home");
  const { logout, deleteAccount, error } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
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
            <p className="text-center">{error}</p>
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
    }
  }, [error]);

  const handleLogout = async () => {
    await logout();
    sessionStorage.removeItem("user");
    location.href = "/";
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
    await deleteAccount(user._id);
    sessionStorage.removeItem("user");
    location.href = "/";
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
      <header className="header-top py-3">
        <div className="container-fluid">
          <div className="d-flex justify-content-between mx-3">
            <div className="d-flex align-items-center gap-3">
              <a href="/" className="logo">
                Alvito Game Store
              </a>
              {/* <a href="/help">Dukungan</a>
              <a href="/distribution">Distribusi</a> */}
            </div>
            <div className="d-flex align-items-center gap-3">
              {/* <a href="">
                <IoLanguage className="fs-3" />
              </a> */}
              {!user ? (
                <div className="d-flex align-items-center gap-2">
                  <a href="/register" className="btn btn-outline-light">
                    Daftar
                  </a>
                  <a href="/login" className="btn btn-success">
                    Masuk
                  </a>
                </div>
              ) : (
                <Menu shadow="md" width={278}>
                  <Menu.Target>
                    <UnstyledButton>
                      <UserButton />
                    </UnstyledButton>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item /* leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} */>Akun Saya</Menu.Item>
                    <Menu.Item /* leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />} */>Pengaturan</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item color="red" leftSection={<FaTrash />} onClick={openDeleteAccountModal}>
                      Hapus Akun
                    </Menu.Item>
                    <Menu.Item color="red" leftSection={<MdLogout />} onClick={openLogoutModal}>
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
              {/* <a href="#" className="d-flex gap-2 align-items-center btn btn-primary">
                <FaDownload />
                <span>Download AGS</span>
              </a> */}
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mx-4">
            <div className="d-flex align-items-center gap-4">
              <div className="search-wrapper">
                <div className="d-flex align-items-center gap-3">
                  <button className="btn-search-action">
                    <FaSearch />
                  </button>
                  <input type="text" className="search-input" placeholder="Cari" />
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <Link
                  to="/"
                  className="link"
                  data-active={"Home" === active || undefined}
                  onClick={() => {
                    setActive("Home");
                  }}
                >
                  Beranda
                </Link>
                <Link
                  to="/game"
                  className="link"
                  data-active={"Game" === active || undefined}
                  onClick={() => {
                    setActive("Game");
                  }}
                >
                  Game
                </Link>
                <Link
                  to="/blog"
                  className="link"
                  data-active={"Blog" === active || undefined}
                  onClick={() => {
                    setActive("Blog");
                  }}
                >
                  Blog
                </Link>
              </div>
            </div>
            <div className="d-flex align-items-center gap-4">
              <div className="wishlist">
                <Link
                  to={!user ? "/login" : "/wishlist"}
                  className="d-flex align-items-center gap-2 position-relative link"
                  data-active={"Wishlist" === active || undefined}
                  onClick={() => {
                    setActive("Wishlist");
                  }}
                >
                  <FaHeart className="fs-3" />
                  {user && <span className="wishlist-badge position-absolute bg-danger">0</span>}
                </Link>
              </div>
              <div className="cart">
                <Link
                  to={!user ? "/login" : "/cart"}
                  className="d-flex align-items-center gap-2 position-relative link"
                  data-active={"Cart" === active || undefined}
                  onClick={() => {
                    setActive("Cart");
                  }}
                >
                  <FaShoppingCart className="fs-3" />
                  {user && <span className="cart-badge position-absolute bg-danger">0</span>}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
