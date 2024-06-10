import React, { useContext, useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { useParams } from "react-router-dom";
import { FeatureContext } from "../context/FeatureContext";

const UpdateFeature = () => {
  const { id } = useParams();
  const { selectedFeature, fetchFeature } = useContext(FeatureContext);

  const [feature, setFeature] = useState({
    feature: "",
  });

  useEffect(() => {
    fetchFeature(id);
  }, [id]);

  useEffect(() => {
    if (selectedFeature) {
      setFeature({
        feature: selectedFeature.feature,
      });
    }
  }, [selectedFeature]);
  return (
    <>
      <div className="update-feature-wrapper">
        <h1>Update Feature</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="feature">Feature</label>
            <Input placeholder="feature" size="md" id="feature" defaultValue={feature.feature} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25">Update Feature</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateFeature;
