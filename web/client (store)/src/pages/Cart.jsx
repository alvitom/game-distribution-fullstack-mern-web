import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import { FaWindows, FaApple, FaHeart, FaTrash } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { modals } from "@mantine/modals";
import { WishlistContext } from "../context/WishlistContext";
import { MdClose } from "react-icons/md";
import { CheckoutContext } from "../context/CheckoutContext";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem("user"));

const Cart = () => {
  const { carts, setCarts, loading, totalPrice, setTotalPrice, fetchCart, removeCart } = useContext(CartContext);
  const { addWishlist, wishlists, setWishlists } = useContext(WishlistContext);
  const { setCheckout } = useContext(CheckoutContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveCart = async (id) => {
    const response = await removeCart(id);
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
      setCarts(carts.filter((item) => item._id !== id));
      setTotalPrice(response.data.totalPrice);
      modals.closeAll();
    }
  };

  const openRemoveCartModal = (id) =>
    modals.open({
      radius: "md",
      title: "Remove from cart",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to remove this game from your cart?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => handleRemoveCart(id)}>
              Remove
            </button>
          </div>
        </>
      ),
    });

  const handleMoveToWishlist = async (id, gameId) => {
    const response = await addWishlist({ gameId });
    const responseRemove = await removeCart(id);

    if (!response.success || !responseRemove.success) {
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
      setCarts(carts.filter((item) => item._id !== id));
      setTotalPrice(responseRemove.data.totalPrice);
      setWishlists([response.data, ...wishlists]);
      modals.closeAll();
    }
  };

  const openMoveToWishlistModal = (id, gameId) =>
    modals.open({
      radius: "md",
      title: "Move to wishlist",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to move this game to your wishlist?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => handleMoveToWishlist(id, gameId)}>
              Move
            </button>
          </div>
        </>
      ),
    });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (carts.length === 0) {
    return (
      <div className="wishlist-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 my-2">
              <h1>My Cart</h1>
            </div>
            <div className="col-12">
              <h3 className="text-center">Cart is empty</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    const summary = {
      items: carts.map((cart) => cart.gameId),
      subtotal: totalPrice,
    };
    setCheckout(summary);
    navigate("/checkout");
  };
  return (
    <>
      <Meta title="Cart" />
      <div className="cart-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 my-2">
              <h1>My Cart</h1>
            </div>
            <div className="col-9">
              {carts.map((cart, index) => (
                <div className="cart-item my-4 d-flex justify-content-between align-items-center" key={index}>
                  <div className="d-flex gap-3 align-items-center">
                    <div className="game-image">
                      <img src={cart.gameId.coverImage?.url} alt={cart.gameId.title} className="img-fluid" />
                    </div>
                    <div className="game-detail">
                      <h5>{cart.gameId.title}</h5>
                      <p>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(cart.gameId.price)}
                      </p>
                      <div className="d-flex align-items-center gap-2 platform-support">
                        {cart.gameId.platform?.map((item, index) => (item === "Windows" ? <FaWindows key={index} /> : item === "Mac OS" ? <FaApple key={index} /> : item === "Linux" ? <FaLinux key={index} /> : null))}
                      </div>
                    </div>
                  </div>
                  <div className="action-btn d-flex gap-3 align-items-center">
                    <button className="btn btn-outline-light d-flex align-items-center gap-1" onClick={() => openMoveToWishlistModal(cart._id, cart.gameId._id)}>
                      <FaHeart />
                      <span>Move to Wishlist</span>
                    </button>
                    <button className="btn btn-danger d-flex align-items-center gap-1" onClick={() => openRemoveCartModal(cart._id)}>
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-3">
              <div className="summary mt-4">
                <div className="d-flex justify-content-between">
                  <p>Total</p>
                  <p>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(totalPrice)}</p>
                </div>
                <button className="btn btn-success w-100" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
