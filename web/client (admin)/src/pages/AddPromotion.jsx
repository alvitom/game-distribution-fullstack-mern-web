import { Input, NumberInput, Switch } from "@mantine/core";
import React, { useContext, useState } from "react";
import { modals } from "@mantine/modals";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PromotionContext } from "../context/PromotionContext";
import { DatePickerInput } from "@mantine/dates";

const AddPromotion = () => {
  const navigate = useNavigate();
  const { promotions, setPromotions, createPromotion } = useContext(PromotionContext);

  const [promotion, setPromotion] = useState({
    game: "",
    discount: null,
    endDate: null,
    isActive: false,
  });

  const handleCreatePromotion = async () => {
    const data = await createPromotion(promotion);
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
            <p className="text-center">Add promotion success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  navigate("/promotions");
                  setPromotions([...promotions, data]);
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
            <p className="text-center">Add promotion failed</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setPromotion({ game: "", discount: null, endDate: null });
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
      <div className="add-promotion-wrapper">
        <h1>Add New Promotion</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="game">Game</label>
            <Input placeholder="Game" size="md" id="game" value={promotion.game} onChange={(e) => setPromotion((prevPromotion) => ({ ...prevPromotion, game: e.target.value }))} />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="discount">Discount</label>
            <NumberInput placeholder="Discount" size="md" id="discount" allowNegative={false} suffix="%" value={promotion.discount} onChange={(value) => setPromotion((prevPromotion) => ({ ...prevPromotion, discount: value }))} />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="end-date">End Date</label>
            <DatePickerInput valueFormat="MM/DD/YY" placeholder="End Date" value={promotion.endDate} onChange={(date) => setPromotion((prevPromotion) => ({ ...prevPromotion, endDate: date }))} size="md" id="end-date" />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="status">Status</label>
            <Switch checked={promotion.isActive} onChange={(event) => setPromotion((prevPromotion) => ({ ...prevPromotion, isActive: event.target.checked }))} label={promotion.isActive ? "Active" : "Not Active"} size="md" />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25" onClick={handleCreatePromotion}>
              Add Promotion
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPromotion;
