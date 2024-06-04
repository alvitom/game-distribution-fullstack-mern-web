import { Input } from "@mantine/core";
import React from "react";

const AddGenre = () => {
  return (
    <>
      <div className="add-genre-wrapper">
        <h1>Add New Genre</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="genre">Genre</label>
            <Input placeholder="Genre" size="md" id="genre" />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25">Add Genre</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGenre;
