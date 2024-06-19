import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PromotionContext } from "../context/PromotionContext";
import { modals } from "@mantine/modals";
import { Input, NumberInput, Switch } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const UpdatePromotion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { promotions, setPromotions, selectedPromotion, fetchPromotion, updatePromotion } = useContext(PromotionContext);

  const [promotion, setPromotion] = useState({
    game: "",
    discount: null,
    endDate: null,
    isActive: false,
  });

  useEffect(() => {
    fetchPromotion(id);
  }, [id]);

  useEffect(() => {
    if (selectedPromotion) {
      setPromotion({
        game: selectedPromotion.game.title,
        discount: selectedPromotion.discount,
        endDate: selectedPromotion.endDate,
        isActive: selectedPromotion.isActive,
      });
    }
  }, [selectedPromotion]);

  const handleUpdatePromotion = async () => {
    const data = await updatePromotion(id, {
      discount: promotion.discount,
      endDate: promotion.endDate,
      isActive: promotion.isActive,
    });
    if (data) {
      modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <FaCheck style={{ width: 100 + "px", height: 100 + "px", color: "rgb(25, 135, 84)" }} />
            </div>
            <p className="text-center">Update promotion success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  navigate("/promotions");
                  setPromotions(promotions.map((promotion) => (promotion._id === id ? data : promotion)));
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else {
      modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <MdClose style={{ width: 100 + "px", height: 100 + "px", color: "rgb(220, 53, 69)" }} />
            </div>
            <p className="text-center">Update promotion failed</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setPromotion({ game: selectedPromotion.game.title, discount: selectedPromotion.discount, endDate: selectedPromotion.endDate, isActive: selectedPromotion.isActive });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    }
  };
  return (
    <>
      <div className="update-promotion-wrapper">
        <h1>Update Promotion</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="game">Game</label>
            <Input placeholder="Game" size="md" id="game" value={promotion.game} disabled />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="discount">Discount</label>
            <NumberInput placeholder="Discount" size="md" id="discount" allowNegative={false} suffix="%" value={promotion.discount} onChange={(value) => setPromotion((prevPromotion) => ({ ...prevPromotion, discount: value }))} />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="end-date">End Date</label>
            <DatePickerInput valueFormat="MM/DD/YY" placeholder="End Date" value={new Date(promotion.endDate)} onChange={(date) => setPromotion((prevPromotion) => ({ ...prevPromotion, endDate: date }))} size="md" id="end-date" />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="status">Status</label>
            <Switch checked={promotion.isActive} onChange={(event) => setPromotion((prevPromotion) => ({ ...prevPromotion, isActive: event.target.checked }))} label={promotion.isActive ? "Active" : "Not Active"} size="md" />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25" onClick={handleUpdatePromotion}>
              Update Promotion
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePromotion;
