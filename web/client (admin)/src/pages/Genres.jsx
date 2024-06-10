import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "@mantine/core";
import { GenreContext } from "../context/GenreContext";

const Genres = () => {
  const { genres, loading, fetchAllGenres } = useContext(GenreContext);

  useEffect(() => {
    fetchAllGenres();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const rows = genres.map((item, index) => (
    <Table.Tr key={item._id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{item.genre}</Table.Td>
      <Table.Td>
        <div className="d-flex gap-2">
          <Link to={`update/${item._id}`} className="btn btn-primary">
            Edit
          </Link>
          <Link to={`delete/`} className="btn btn-danger">
            Delete
          </Link>
        </div>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <div className="genres-wrapper">
        <h1>Genre</h1>
        <Link to="add" className="btn btn-success my-4">
          Add Genre
        </Link>
        <div className="row">
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>No.</Table.Th>
                <Table.Th>Genre</Table.Th>
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

export default Genres;
