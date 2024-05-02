import React from "react";
import { IoLanguage } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <header className="header-top py-3">
        <div className="container-fluid">
          <div className="d-flex justify-content-between mx-3">
            <div className="d-flex align-items-center gap-3">
              <a href="/" className="logo">AGS</a>
              <a href="/distribution">Distribusi Game</a>
            </div>
            <div className="d-flex align-items-center gap-3">
              <a href="">
                <IoLanguage className="fs-3" />
              </a>
              <a href="/login">
                <MdAccountCircle className="fs-3" />
              </a>
              <a href="#">Download AGS</a>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mx-4">
            <div className="d-flex align-items-center gap-3">
              <a href="/">Store</a>
              <a href="/distribution">Blog</a>
            </div>
            <div className="d-flex align-items-center gap-4">
              <div className="wishlist">
                <a href="/cart" className="d-flex align-items-center gap-2">
                  <span>Wishlist</span>
                </a>
              </div>
              <div className="cart">
                <a href="/cart" className="d-flex align-items-center gap-2">
                  <FaShoppingCart />
                  <span>Cart (0)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
