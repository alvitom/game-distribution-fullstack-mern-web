import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { modals } from "@mantine/modals";
import { Input, NumberInput, Switch } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { GameContext } from "../context/GameContext";

const UpdateSaleGame = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedGame, fetchGame, updateSaleGame, loading } = useContext(GameContext);

  const [saleGame, setSaleGame] = useState({
    title: "",
    percentage: "",
    endDate: null,
    isActive: false,
  });

  useEffect(() => {
    fetchGame(id);
  }, [id]);

  useEffect(() => {
    if (selectedGame) {
      setSaleGame({
        title: selectedGame.title,
        percentage: selectedGame.discount.percentage,
        endDate: selectedGame.discount.endDate,
        isActive: selectedGame.discount.isActive,
      });
    }
  }, [selectedGame]);

  const handleUpdateSaleGame = async () => {
    const response = await updateSaleGame(id, {
      percentage: saleGame.percentage,
      endDate: saleGame.endDate,
      isActive: saleGame.isActive,
    });
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
                  setSaleGame({ percentage: selectedGame.discount.percentage, endDate: selectedGame.discount.endDate, isActive: selectedGame.discount.isActive });
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
      <div className="update-sale-game-wrapper">
        <h1>Update Sale Game</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="title">Title</label>
            <Input placeholder="Title" size="md" id="title" value={saleGame.title} disabled />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="discount-percentage">Discount Percentage</label>
            <NumberInput placeholder="Discount Percentage" size="md" id="discount-percentage" allowNegative={false} suffix="%" value={saleGame.percentage} onChange={(value) => setSaleGame((prevSaleGame) => ({ ...prevSaleGame, percentage: value }))} />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="end-date">End Date</label>
            <DatePickerInput valueFormat="MM/DD/YY" placeholder="End Date" value={new Date(saleGame.endDate)} onChange={(date) => setSaleGame((prevSaleGame) => ({ ...prevSaleGame, endDate: date }))} size="md" id="end-date" />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="status">Status</label>
            <Switch checked={saleGame.isActive} onChange={(event) => setSaleGame((prevSaleGame) => ({ ...prevSaleGame, isActive: event.target.checked }))} label={saleGame.isActive ? "Active" : "Not Active"} size="md" />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className={`${loading && "disabled"} btn btn-success w-25`} onClick={handleUpdateSaleGame}>
              {loading ? "Updating..." : "Update Sale Game"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSaleGame;
