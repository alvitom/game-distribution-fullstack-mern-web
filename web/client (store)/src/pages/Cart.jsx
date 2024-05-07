import React from "react";
import Meta from "../components/Meta";
import { FaWindows, FaApple, FaHeart, FaTrash } from "react-icons/fa";

const Cart = () => {
  return (
    <>
      <Meta title="Keranjang" />
      <div className="cart-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Keranjang Saya</h1>
            </div>
            <div className="col-9">
              <div className="cart-item my-4 d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3 align-items-center">
                  <div className="game-image">
                    <img
                      src="https://cdn1.epicgames.com/offer/610a546d4e204215a0b9a1c8a382bacb/EGS_FootballManager2024_SportsInteractive_S2_1200x1600-d59e8b3545615cbc8a51d8acd316dd60?h=480&quality=medium&resize=1&w=360"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="game-detail">
                    <h5>Football Manager 2024</h5>
                    <p>IDR 649,999</p>
                    <div className="d-flex align-items-center gap-2 platform-support">
                      <FaWindows />
                      <FaApple />
                    </div>
                  </div>
                </div>
                <div className="action-btn d-flex gap-3 align-items-center">
                  <button className="btn btn-outline-light d-flex align-items-center gap-1">
                    <FaHeart />
                    <span>Pindah ke Wishlist</span>
                  </button>
                  <button className="btn btn-danger d-flex align-items-center gap-1">
                    <FaTrash />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
              <div className="cart-item my-4 d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3 align-items-center">
                  <div className="game-image">
                    <img
                      src="https://cdn1.epicgames.com/offer/610a546d4e204215a0b9a1c8a382bacb/EGS_FootballManager2024_SportsInteractive_S2_1200x1600-d59e8b3545615cbc8a51d8acd316dd60?h=480&quality=medium&resize=1&w=360"
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                  <div className="game-detail">
                    <h5>Football Manager 2024</h5>
                    <p>IDR 649,999</p>
                    <div className="d-flex align-items-center gap-2 platform-support">
                      <FaWindows />
                      <FaApple />
                    </div>
                  </div>
                </div>
                <div className="action-btn d-flex gap-3 align-items-center">
                  <button className="btn btn-outline-light d-flex align-items-center gap-1">
                    <FaHeart />
                    <span>Pindah ke Wishlist</span>
                  </button>
                  <button className="btn btn-danger d-flex align-items-center gap-1">
                    <FaTrash />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="summary mt-4">
                <div className="d-flex justify-content-between">
                  <p>Total</p>
                  <p>IDR 950,749.00</p>
                </div>
                <p>Sales tax will be calculated during checkout where applicable</p>
                <button className="btn btn-success w-100">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
