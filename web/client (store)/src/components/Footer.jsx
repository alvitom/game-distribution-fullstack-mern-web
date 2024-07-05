import React from "react";
import { FaInstagram, FaGithub, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className="footer-top py-3">
        <div className="container">
          <div className="row mx-3">
            <div className="col-4">
              <h1>Alvito Game Store</h1>
            </div>
            {/* <div className="col-3">
              <h4>Genre</h4>
              <div className="footer-links d-flex flex-column gap-3">
                <a href="">About Us</a>
                <a href="">Support</a>
                <a href="">Contact</a>
                <a href="">FAQ</a>
              </div>
            </div> */}
            <div className="col-4">
              <h4>Games</h4>
              <div className="footer-links d-flex flex-column gap-3 mt-4">
                <a href="/collection/sale">Games On Sale</a>
                <a href="/collection/top-sellers">Top Sellers</a>
                <a href="/collection/most-played">Most Played</a>
                <a href="/collection/upcoming">Upcoming</a>
                <a href="/collection/trending">Trending</a>
                <a href="/collection/new-release">New Release</a>
              </div>
            </div>
            <div className="col-4">
              <h4>Follow Us</h4>
              <div className="footer-links d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-4 fs-3">
                  <a href="https://www.instagram.com/alvitom_" target="_blank">
                    <FaInstagram />
                  </a>
                  <a href="https://github.com/alvitom" target="_blank">
                    <FaGithub />
                  </a>
                  <a href="mailto:muhammadalvito2@gmail.com" target="_blank">
                    <MdEmail />
                  </a>
                  <a href="https://wa.me/6281381547895" target="_blank">
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="footer-bottom py-3">
        <div className="container mt-3">
          <div className="d-flex justify-content-center align-items-center">
            <p className="mb-0 text-light">&copy; {new Date().getFullYear()}, Alvito Game Store. All rights reserved.</p>
            <div className="d-flex align-items-center gap-3">
              {/* <a href="">Privacy Policy</a>
              <a href="">Terms of Service</a>
              <a href="">Store Refund Policy</a> */}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
