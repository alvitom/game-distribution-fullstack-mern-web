import React from "react";
import { IoLanguage } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <header className="header-top py-3">
        <div className="container-fluid">
          <div className="d-flex justify-content-between mx-3">
            <div className="d-flex align-items-center gap-3">
              <a href="/" className="logo">
                AGS
              </a>
              <a href="/help">Dukungan</a>
              <a href="/distribution">Distribusi</a>
            </div>
            <div className="d-flex align-items-center gap-3">
              <a href="">
                <IoLanguage className="fs-3" />
              </a>
              <div className="d-flex align-items-center gap-2">
                <a href="/register" className="btn btn-outline-light">
                  Daftar
                </a>
                <a href="/login" className="btn btn-success">
                  Masuk
                </a>
              </div>
              <a href="#" className="btn btn-primary">Download AGS</a>
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
                <a href="/" className="text-white">
                  Beranda
                </a>
                <a href="/browse">Telusuri</a>
                <a href="/blog">Blog</a>
              </div>
            </div>
            <div className="d-flex align-items-center gap-4">
              <div className="wishlist">
                <a href="/wishlist" className="d-flex align-items-center gap-2">
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
