import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import { FaApple, FaWindows } from "react-icons/fa";
import { CheckoutContext } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";

const Checkout = () => {
  const { checkout } = useContext(CheckoutContext);
  const { createTransaction, updateTransaction } = useContext(TransactionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkout) {
      navigate("/");
    }
  }, [checkout]);

  const handlePlaceOrder = async () => {
    const data = {
      items: checkout?.items,
      total: checkout?.subtotal,
    };
    const response = await createTransaction(data);
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
      window.snap.pay(response.data.token, {
        onSuccess: async function (result) {
          console.log("payment success:", result);
          const response = await updateTransaction(result);
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
            location.href = result?.pdf_url;
          }
        },
        onPending: function (result) {
          console.log("payment pending:", result);
          // Lakukan tindakan setelah pembayaran pending
        },
        onError: function (result) {
          console.error("payment error:", result);
          // Lakukan tindakan setelah pembayaran gagal
        },
        onClose: function () {
          console.log("payment popup closed");
          // Lakukan tindakan setelah pengguna menutup popup pembayaran
        },
      });
    }
  };
  return (
    <>
      <Meta title="Checkout" />
      <div className="checkout-wrapper">
        <div className="container">
          <div className="row">
            <h1>Checkout</h1>
            <div className="col-6 mx-auto">
              <h3 className="text-center">Summary</h3>
              <div className="checkout-container my-4">
                <div className="checkout-items d-flex flex-column gap-3">
                  {checkout?.items?.map((item, index) => (
                    <div className="checkout-item d-flex gap-3 align-items-center" key={index}>
                      <div className="game-image">
                        <img src={item?.coverImage?.url} alt={item?.title} className="img-fluid" />
                      </div>
                      <div className="game-detail">
                        <h5>{item?.title}</h5>
                        <p>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(item?.price)}
                        </p>
                        <div className="d-flex align-items-center gap-2 platform-support">{item?.platform?.map((item, index) => (item === "Windows" ? <FaWindows key={index} /> : item === "Mac OS" ? <FaApple key={index} /> : null))}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="prices my-4">
                  <div className="price d-flex justify-content-between">
                    <p>Subtotal</p>
                    <p className="value">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(checkout?.subtotal)}</p>
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
                <button className="btn btn-success w-100" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
