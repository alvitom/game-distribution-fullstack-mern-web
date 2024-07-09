import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import { FaWindows, FaApple, FaShoppingCart, FaTrash } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import { MdClose } from "react-icons/md";
import { modals } from "@mantine/modals";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem("user"));

const Wishlist = () => {
  const { wishlists, loading, getWishlist, removeWishlist } = useContext(WishlistContext);
  const { addCart, carts, setCarts } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    getWishlist();
  }, []);

  const handleRemoveWishlist = async (id) => {
    const response = await removeWishlist(id);
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
      getWishlist();
      modals.closeAll();
    }
  };

  const openRemoveWishlistModal = (id) =>
    modals.open({
      radius: "md",
      title: "Remove from wishlist",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to remove this game from your wishlist?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => handleRemoveWishlist(id)}>
              Remove
            </button>
          </div>
        </>
      ),
    });

  const handleAddToCart = async (id, gameId) => {
    const response = await addCart({ gameId });
    const responseRemove = await removeWishlist(id);

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
      setCarts([response.data, ...carts]);
      getWishlist();
      modals.closeAll();
    }
  };

  const openAddToCartModal = (id, gameId) =>
    modals.open({
      radius: "md",
      title: "Add to cart",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to add this game to your cart?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => handleAddToCart(id, gameId)}>
              Move
            </button>
          </div>
        </>
      ),
    });

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Meta title="Wishlist" />
      <div className="wishlist-wrapper">
        <div className="container">
          <div className="row mx-sm-0 mx-3">
            <div className="col-12 my-2">
              <h1>Wishlist</h1>
            </div>
            {wishlists.length < 1 ? (
              <div className="col-12">
                <h3 className="text-center">Your wishlist is empty</h3>
              </div>
            ) : (
              <div className="col-12">
                {wishlists?.map((wishlist, index) => (
                  <div className="wishlist-item my-4 d-flex justify-content-between align-items-center" key={index}>
                    <div className="d-flex gap-3 align-items-center flex-column flex-sm-row">
                      <div className="game-image">
                        <img src={wishlist.gameId.coverImage?.url} alt={wishlist.gameId.title} className="img-fluid" />
                      </div>
                      <div className="game-detail text-center text-sm-start">
                        <h5>{wishlist.gameId.title}</h5>
                        {new Date(wishlist.gameId.releaseDate) > Date.now() && <span className="available text-secondary">Available {new Date(wishlist.gameId.releaseDate).toLocaleDateString("en-US")}</span>}
                        {wishlist.gameId.discount?.isActive ? (
                          <div className="discount d-flex flex-column my-2">
                            <div className="price d-flex align-items-center justify-content-center gap-3">
                              <span className="badge bg-success">-{wishlist.gameId.discount.percentage}%</span>
                              <p className="old-price text-decoration-line-through text-secondary mb-0">
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                }).format(wishlist.gameId.price)}
                              </p>
                              <p className="new-price mb-0">
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                }).format(wishlist.gameId.price - ((wishlist.gameId.discount.percentage / 100) * wishlist.gameId.price).toFixed(0))}
                              </p>
                            </div>
                            <div className="end-date">
                              <span>Sale ends at {new Date(wishlist.gameId.discount.endDate).toLocaleDateString("en-US")}</span>
                            </div>
                          </div>
                        ) : (
                          <p>
                            {!(wishlist.gameId.releaseDate === null && wishlist.gameId.price === 0) &&
                              new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              }).format(wishlist.gameId.price)}
                            {wishlist.gameId.price === 0 && !(wishlist.gameId.releaseDate === null) && "Free"}
                          </p>
                        )}
                        <div className="d-flex align-items-center gap-2 platform-support justify-content-center justify-content-sm-start">
                          {wishlist.gameId.platform?.map((item, index) => (item === "Windows" ? <FaWindows key={index} /> : item === "Mac OS" ? <FaApple key={index} /> : item === "Linux" ? <FaLinux key={index} /> : null))}
                        </div>
                      </div>
                    </div>
                    <div className="action-btn d-flex flex-column flex-lg-row gap-3 align-items-center">
                      {!(wishlist.gameId.releaseDate === null) ? (
                        <button className="btn btn-outline-light d-flex align-items-center gap-2 w-100" onClick={() => openAddToCartModal(wishlist._id, wishlist.gameId._id)}>
                          <FaShoppingCart />
                          <span>Add to Cart</span>
                        </button>
                      ) : (
                        <button className="btn btn-outline-light d-flex align-items-center gap-2 disabled w-100">
                          <span>Coming Soon</span>
                        </button>
                      )}
                      <button className="btn btn-danger d-flex align-items-center gap-2" onClick={() => openRemoveWishlistModal(wishlist._id)}>
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
