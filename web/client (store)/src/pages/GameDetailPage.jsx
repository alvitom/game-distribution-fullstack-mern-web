import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

const GameDetailPage = () => {
  const [game, setGame] = useState([]);
  const { gameId } = useParams();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`${baseUrl}/game/${gameId}`);
        const data = await response.data;
        setGame(data);
      } catch (error) {
        console.error("Error fetching game detail:", error);
      }
    };

    fetchGame();
  }, [gameId]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container mt-5">
        
      </div>
    </>
  );
};

export default GameDetailPage;
