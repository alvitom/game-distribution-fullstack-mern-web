import { Input, NumberInput } from "@mantine/core";
import React, { useContext, useState } from "react";
import { modals } from "@mantine/modals";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DatePickerInput } from "@mantine/dates";
import { GameContext } from "../context/GameContext";

const AddSaleGame = () => {
  const navigate = useNavigate();
  const { createSaleGame, loading } = useContext(GameContext);

  const [saleGame, setSaleGame] = useState({
    title: "",
    percentage: "",
    endDate: null,
  });

  const handleCreateSaleGame = async () => {
    const response = await createSaleGame(saleGame);
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
                  setSaleGame({ title: "", percentage: "", endDate: null });
                }}
              >
                Close
              </button>
            </div>
          </>
        ),
      });
    } else {
      return modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <FaCheck style={{ width: 100 + "px", height: 100 + "px", color: "rgb(25, 135, 84)" }} />
            </div>
            <p className="text-center">{response.message}</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  navigate("/sale-games");
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
      <div className="add-sale-game-wrapper">
        <h1>Add Sale Game</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="title">Title</label>
            <Input placeholder="Title" size="md" id="title" value={saleGame.title} onChange={(e) => setSaleGame((prevSaleGame) => ({ ...prevSaleGame, title: e.target.value }))} />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="discount-percentage">Discount Percentage</label>
            <NumberInput placeholder="Discount Percentage" size="md" id="discount-percentage" allowNegative={false} suffix="%" value={saleGame.percentage} onChange={(value) => setSaleGame((prevSaleGame) => ({ ...prevSaleGame, percentage: value }))} />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="end-date">End Date</label>
            <DatePickerInput valueFormat="MM/DD/YY" placeholder="End Date" value={saleGame.endDate} onChange={(date) => setSaleGame((prevSaleGame) => ({ ...prevSaleGame, endDate: date }))} size="md" id="end-date" />
          </div>
          <div className="d-flex justify-content-center align-items-center mt-4">
            <button className={`${loading && "disabled"} btn btn-success w-25`} onClick={handleCreateSaleGame}>
              {loading ? "Loading..." : "Add Sale Game"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSaleGame;
