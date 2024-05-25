import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BtnSlider = () => {
  return (
    <div className="action-btn d-flex gap-2">
      <button className="btn btn-outline-light rounded-circle prev-btn">
        <FaChevronLeft />
      </button>
      <button className="btn btn-outline-light rounded-circle next-btn">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default BtnSlider;
