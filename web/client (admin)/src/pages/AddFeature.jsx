import { Input } from "@mantine/core";
import React from "react";

const AddFeature = () => {
  return (
    <>
      <div className="add-feature-wrapper">
        <h1>Add New Feature</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="feature">Feature</label>
            <Input placeholder="Feature" size="md" id="feature" />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25">Add Feature</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFeature;
