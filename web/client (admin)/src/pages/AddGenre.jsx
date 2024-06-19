import { Input } from "@mantine/core";
import React, { useContext, useState } from "react";
import { GenreContext } from "../context/GenreContext";
import { modals } from "@mantine/modals";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AddGenre = () => {
  const navigate = useNavigate();
  const { genres, setGenres, createGenre } = useContext(GenreContext);

  const [genre, setGenre] = useState({
    genre: "",
  });

  const handleCreateGenre = async () => {
    const data = await createGenre(genre);
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
            <p className="text-center">Add genre success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  navigate("/genres");
                  setGenres([...genres, data]);
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
            <p className="text-center">Add genre failed</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setGenre({ genre: "" });
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
      <div className="add-genre-wrapper">
        <h1>Add New Genre</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="genre">Genre</label>
            <Input placeholder="Genre" size="md" id="genre" value={genre.genre} onChange={(e) => setGenre((prevGenre) => ({ ...prevGenre, genre: e.target.value }))} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25" onClick={handleCreateGenre}>
              Add Genre
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGenre;
