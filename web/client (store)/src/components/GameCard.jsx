import React, { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

const user = JSON.parse(sessionStorage.getItem("user"));

const GameCard = ({ collection, page, data }) => {
  const { addWishlist, wishlists, setWishlists } = useContext(WishlistContext);

  const handleAddToWishlist = async (gameId) => {
    if (!user) {
      location.href = "/login";
      return;
    }
    const response = await addWishlist({ gameId });
    if (!response.success) {
      return notifications.show({
        message: response.message,
        color: "blue",
        withCloseButton: false,
        icon: <MdClose />,
      });
    } else {
      setWishlists([response.data, ...wishlists]);
      return notifications.show({
        message: response.message,
        color: "green",
        withCloseButton: false,
        icon: <FaCheck />,
      });
    }
  };
  return (
    <div className={collection || page === "game" ? "col-lg-3 col-md-4 col-sm-6 col-12 my-4" : "col-lg-2 col-md-3 col-sm-4 col-6"}>
      {data?.discount.isActive ? (
        <>
          <a href={`/game/${data?.slug}`} className="game-card position-relative">
            <div className="game-image">
              <img src={data?.coverImage.url} alt={data?.title} className="img-fluid" />
            </div>
            <div className="game-detail p-2 text-white">
              <span className="title">{data?.title}</span>
              {new Date(data?.releaseDate) > Date.now() && <p className="available mb-1 text-secondary">Available {new Date(data?.releaseDate).toLocaleDateString("en-US")}</p>}
              <div className="d-flex justify-content-between align-items-center">
                <div className="dicount-percentage">
                  <span className="badge bg-success p-2 fs-6">-{data?.discount.percentage}%</span>
                </div>
                <div className="d-flex flex-column price">
                  <div className="old-price">
                    <span className="text-decoration-line-through">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(data?.price)}</span>
                  </div>
                  <div className="new-price">
                    <span>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(data?.price - ((data?.discount.percentage / 100) * data?.price).toFixed(0))}</span>
                  </div>
                </div>
              </div>
              <div className="action-btn position-absolute">
                <button className="border-white text-white btn btn-dark">+</button>
              </div>
            </div>
          </a>
        </>
      ) : new Date(data?.releaseDate) > Date.now() ? (
        <>
          <a href={`/game/${data?.slug}`} className="game-card position-relative">
            <div className="game-image">
              <img src={data?.coverImage.url} alt={data?.title} className="img-fluid" />
            </div>
            <div className="game-detail p-2 text-white">
              <p className="title mb-1">{data?.title}</p>
              <p className="available mb-1 text-secondary">Available {new Date(data?.releaseDate).toLocaleDateString("en-US")}</p>
              {data?.price && (
                <p className="price mb-0">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(data?.price)}
                </p>
              )}
            </div>
            <div className="action-btn position-absolute">
              <button className="border-white text-white btn btn-dark">+</button>
            </div>
          </a>
        </>
      ) : !data?.releaseDate ? (
        <>
          <a href={`/game/${data?.slug}`} className="game-card position-relative">
            <div className="game-image">
              <img src={data?.coverImage.url} alt={data?.title} className="img-fluid" />
            </div>
            <div className="game-detail p-2 text-white">
              <p className="title mb-1">{data?.title}</p>
              <p className="available mb-0 text-secondary">Coming Soon</p>
            </div>
            <div className="action-btn position-absolute">
              <button className="border-white text-white btn btn-dark">+</button>
            </div>
          </a>
        </>
      ) : (
        <>
          <a href={`/game/${data?.slug}`} className="game-card position-relative">
            <div className="game-image">
              <img src={data?.coverImage.url} alt={data?.title} className="img-fluid" />
            </div>
            <div className="game-detail p-2 text-white">
              <p className="title mb-1">{data?.title}</p>
              <p className="price mb-0">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(data?.price)}
              </p>
            </div>
            <div className="action-btn position-absolute">
              <button className="border-white text-white btn btn-dark" onClick={() => handleAddToWishlist(data?._id)}>
                +
              </button>
            </div>
          </a>
        </>
      )}
    </div>
  );
};

export default GameCard;
