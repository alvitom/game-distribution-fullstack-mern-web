import React from "react";
import { elements } from "../utils/data";
import { Link } from "react-router-dom";
import { Table } from "@mantine/core";

const Genres = () => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>
        <div className="d-flex gap-2">
          <Link to="/update-genre" className="btn btn-primary">
            Edit
          </Link>
          <Link to="/delete-genre" className="btn btn-danger">
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
                <Table.Th>Element position</Table.Th>
                <Table.Th>Element name</Table.Th>
                <Table.Th>Symbol</Table.Th>
                <Table.Th>Atomic mass</Table.Th>
                <Table.Th>Atomic mass</Table.Th>
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
