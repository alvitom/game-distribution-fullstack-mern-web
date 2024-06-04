import React from "react";
import { elements } from "../utils/data";
import { Table, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Promotions = () => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>
        <div className="d-flex gap-2">
          <Link to="/update-promo" className="btn btn-primary">
            Edit
          </Link>
          <Link to="/delete-promo" className="btn btn-danger">
            Delete
          </Link>
        </div>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <div className="promotions-wrapper">
        <h1>Promo</h1>
        <div className="row">
          <div className="d-flex justify-content-between align-items-center me-3 my-4">
            <Link to="add" className="btn btn-success">
              Add Promo
            </Link>
            <div className="d-flex gap-2 align-items-center">
              <label htmlFor="filters">Filters:</label>
              <TextInput leftSectionPointerEvents="none" leftSection={<FaSearch />} placeholder="Keywords" id="filters" />
            </div>
          </div>
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

export default Promotions;
