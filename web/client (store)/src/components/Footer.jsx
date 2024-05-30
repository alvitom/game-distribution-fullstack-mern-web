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
                <a href="/collection/top-sellers">Penjualan Teratas</a>
                <a href="/collection/most-played">Paling Banyak Dimainkan</a>
                <a href="/collection/upcoming">Segera Hadir</a>
                <a href="/collection/trending">Sedang Tren</a>
                <a href="/collection/new-release">Keluaran Terbaru</a>
              </div>
            </div>
            <div className="col-4">
              <h4>Ikuti</h4>
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
            <p className="mb-0 text-light">&copy; {new Date().getFullYear()}, Alvito Game Store. Seluruh hak cipta</p>
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
