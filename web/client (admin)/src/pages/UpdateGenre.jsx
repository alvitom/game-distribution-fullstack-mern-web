import { Input } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GenreContext } from "../context/GenreContext";

const UpdateGenre = () => {
  const { id } = useParams();
  const { selectedGenre, fetchGenre } = useContext(GenreContext);

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

  return (
    <>
      <div className="update-genre-wrapper">
        <h1>Update Genre</h1>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="genre">Genre</label>
            <Input placeholder="Genre" size="md" id="genre" defaultValue={genre.genre} />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button className="btn btn-success w-25">Update Genre</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateGenre;
