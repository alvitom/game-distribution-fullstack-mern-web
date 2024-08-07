import { Input } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GenreContext } from "../context/GenreContext";
import { modals } from "@mantine/modals";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const UpdateGenre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { genres, setGenres, selectedGenre, fetchGenre, updateGenre } = useContext(GenreContext);

  const [genre, setGenre] = useState({
    genre: "",
  });

  useEffect(() => {
    fetchGenre(id);
  }, [id]);

  useEffect(() => {
    if (selectedGenre) {
      setGenre({
        genre: selectedGenre.genre,
      });
    }
  }, [selectedGenre]);

  const handleUpdateGenre = async () => {
    const data = await updateGenre(id, genre);
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
            <p className="text-center">Update genre success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  navigate("/genres");
                  setGenres(genres.map((genre) => (genre._id === id ? data : genre)));
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
            <p className="text-center">Update genre failed</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setGenre({ genre: selectedGenre.genre });
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
      <div className="update-genre-wrapper">
        <h1>Update Genre</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="genre">Genre</label>
            <Input placeholder="Genre" size="md" id="genre" value={genre.genre} onChange={(e) => setGenre((prevGenre) => ({ ...prevGenre, genre: e.target.value }))} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25" onClick={handleUpdateGenre}>
              Update Genre
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateGenre;
