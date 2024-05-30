import React from "react";
import Meta from "../components/Meta";
import { FaApple, FaWindows } from "react-icons/fa";

const Checkout = () => {
  return (
    <>
      <Meta title="Checkout" />
      <div className="checkout-wrapper">
        <div className="container">
          <div className="row">
            <h1>Checkout</h1>
            <div className="col-6 mx-auto">
              <h3 className="text-center">Ringkasan Pembelian</h3>
              <div className="checkout-container my-4">
                <div className="checkout-items d-flex flex-column gap-3">
                  <div className="checkout-item d-flex gap-3 align-items-center">
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
                  <div className="checkout-item d-flex gap-3 align-items-center">
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
                </div>
                <div className="prices my-4">
                  <div className="price d-flex justify-content-between">
                    <p>Harga</p>
                    <p className="value">IDR 759,000</p>
                  </div>
                  <div className="discount d-flex justify-content-between">
                    <p>Diskon</p>
                    <p className="value">80% (-IDR 607,200)</p>
                  </div>
                  <div className="total d-flex justify-content-between">
                    <p>Total</p>
                    <p className="value">IDR 151,800</p>
                  </div>
                </div>
                <button className="btn btn-success w-100">Bayar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
