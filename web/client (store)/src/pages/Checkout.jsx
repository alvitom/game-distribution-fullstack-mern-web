import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import { FaApple, FaWindows, FaInfoCircle } from "react-icons/fa";
import { CheckoutContext } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";

const Checkout = () => {
  const { checkout } = useContext(CheckoutContext);
  const { createTransaction, updateTransaction, loading } = useContext(TransactionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkout) {
      navigate("/");
    }
  }, [checkout]);

  const handlePlaceOrder = async () => {
    const data = {
      items: checkout?.items,
      serviceFee: checkout?.prices.serviceFee,
      total: checkout?.prices.total,
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
      const { token } = response.data.transaction;
      const { orderId } = response.data;
      window.snap.pay(token, {
        onSuccess: async function (result) {
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
          }
          navigate("/transactions");
        },
        onPending: async function (result) {
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
          }
          localStorage.setItem(result.order_id, JSON.stringify(token));
          navigate("/transactions");
        },
        onError: async function (result) {
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
          }
          navigate("/transactions");
        },
        onClose: function () {
          localStorage.setItem(orderId, JSON.stringify(token));
          navigate("/transactions");
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
                        {new Date(item?.releaseDate) > Date.now() && <span className="available text-secondary">Available {new Date(item?.releaseDate).toLocaleDateString("en-US")}</span>}
                        {item?.discount?.isActive ? (
                          <div className="discount d-flex flex-column my-2">
                            <div className="price d-flex align-items-center gap-3">
                              <span className="badge bg-success">-{item?.discount.percentage}%</span>
                              <p className="old-price text-decoration-line-through text-secondary mb-0">
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                }).format(item?.price)}
                              </p>
                              <p className="new-price mb-0">
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                }).format(item?.price - ((item?.discount.percentage / 100) * item?.price).toFixed(0))}
                              </p>
                            </div>
                            <div className="end-date">
                              <span>Sale ends at {new Date(item?.discount.endDate).toLocaleDateString("en-US")}</span>
                            </div>
                          </div>
                        ) : (
                          <p>
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(item?.price)}
                          </p>
                        )}
                        <div className="d-flex align-items-center gap-2 platform-support">{item?.platform?.map((item, index) => (item === "Windows" ? <FaWindows key={index} /> : item === "Mac OS" ? <FaApple key={index} /> : null))}</div>
                        {new Date(item?.releaseDate) > Date.now() && (
                          <span className="available text-warning" style={{ fontSize: "14px" }}>
                            <FaInfoCircle />
                            You won't be able to play this game until it's released.
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="prices my-4">
                  {checkout?.prices?.totalDiscount < 0 ? (
                    <>
                      <div className="subtotal d-flex justify-content-between">
                        <p>Subtotal</p>
                        <p className="value">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(checkout?.prices.totalNetPrice)}</p>
                      </div>
                      <div className="total-discount d-flex justify-content-between">
                        <p>Total Discount</p>
                        <p className="value">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(checkout?.prices.totalDiscount)}</p>
                      </div>
                      <div className="total-after-discount d-flex justify-content-between">
                        <p>Total After Discount</p>
                        <p className="value">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(checkout?.prices.totalPrice)}</p>
                      </div>
                    </>
                  ) : (
                    <div className="subtotal d-flex justify-content-between">
                      <p>Subtotal</p>
                      <p className="value">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(checkout?.prices.totalPrice)}</p>
                    </div>
                  )}
                  <div className="service-fee d-flex justify-content-between">
                    <p>Service Fee</p>
                    <p className="value">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(checkout?.prices.serviceFee)}</p>
                  </div>
                  <div className="total d-flex justify-content-between">
                    <p>Total</p>
                    <p className="value">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(checkout?.prices.total)}</p>
                  </div>
                </div>
                <button className={`${loading && "disabled"} btn btn-success w-100`} onClick={handlePlaceOrder}>
                  {loading ? "Loading..." : "Place Order"}
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
