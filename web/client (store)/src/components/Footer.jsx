import React from "react";
import { FaFacebook, FaGooglePlusG, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer-top py-3">
        <div className="container">
          <div className="row mx-3">
            <div className="col-3">
              <h1>AGS</h1>
            </div>
            <div className="col-3">
              <h4>Alvito Game Store</h4>
              <div className="footer-links d-flex flex-column gap-3">
                <a href="">About Us</a>
                <a href="">Support</a>
                <a href="">Contact</a>
                <a href="">FAQ</a>
              </div>
            </div>
            <div className="col-3">
              <h4>Our Prducts</h4>
              <div className="footer-links d-flex flex-column gap-3">
                <a href="">Games</a>
                <a href="">Cards and Points</a>
                <a href="">Subscriptions</a>
                <a href="">DLC</a>
                <a href="">Software</a>
              </div>
            </div>
            <div className="col-3">
              <h4>Follow Us</h4>
              <div className="footer-links d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-4 fs-3">
                  <a href="">
                    <FaFacebook />
                  </a>
                  <a href="">
                    <FaGooglePlusG />
                  </a>
                  <a href="">
                    <FaLinkedin />
                  </a>
                  <a href="">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer-bottom py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 text-light">&copy; {new Date().getFullYear()}, Alvito Games,Inc. All rights reserved</p>
            <div className="d-flex align-items-center gap-3">
              <a href="">Privacy Policy</a>
              <a href="">Terms of Service</a>
              <a href="">Store Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
