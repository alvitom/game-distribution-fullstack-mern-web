import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";
import { GameContext } from "../context/GameContext";

const Games = () => {
  const { games, loading, fetchAllGames } = useContext(GameContext);

  useEffect(() => {
    fetchAllGames();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const rows = games.map((game, index) => (
    <Table.Tr key={game._id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>
        <img src={game.images[0]?.url} className="img-fluid" />
      </Table.Td>
      <Table.Td>{game.title}</Table.Td>
      <Table.Td>{game.price}</Table.Td>
      <Table.Td>
        <div className="d-flex gap-2">
          <Link to={`update/${game._id}`} className="btn btn-primary">
            Update
          </Link>
          <Link to={`delete/${game._id}`} className="btn btn-danger">
            Delete
          </Link>
        </div>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <div className="games-wrapper">
        <h1>Game</h1>
        <div className="row">
          <div className="d-flex justify-content-between align-items-center me-3 my-4">
            <Link to="add" className="btn btn-success">
              Add Game
            </Link>
            <div className="d-flex gap-2 align-items-center">
              <label htmlFor="filters">Filters:</label>
              <TextInput leftSectionPointerEvents="none" leftSection={<FaSearch />} placeholder="Keywords" id="filters" />
            </div>
          </div>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>No.</Table.Th>
                <Table.Th>Image</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Games;
