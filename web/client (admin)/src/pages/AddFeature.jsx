import { Input } from "@mantine/core";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeatureContext } from "../context/FeatureContext";
import { modals } from "@mantine/modals";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const AddFeature = () => {
  const navigate = useNavigate();
  const { features, setFeatures, createFeature } = useContext(FeatureContext);

  const [feature, setFeature] = useState({
    feature: "",
  });

  const handleCreateFeature = async () => {
    const data = await createFeature(feature);
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
            <p className="text-center">Add feature success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  navigate("/features");
                  setFeatures([...features, data]);
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
            <p className="text-center">Add feature failed</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setFeature({ feature: "" });
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
      <div className="add-feature-wrapper">
        <h1>Add New Feature</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="feature">Feature</label>
            <Input placeholder="Feature" size="md" id="feature" value={feature.feature} onChange={(e) => setFeature((prevFeature) => ({ ...prevFeature, feature: e.target.value }))} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25" onClick={handleCreateFeature}>
              Add Feature
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFeature;
