import React from "react";
import { elements } from "../utils/data";
import { Table, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";

const Users = () => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>
        <button className="btn btn-danger">Block User</button>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <div className="users-wrapper">
        <h1>User</h1>
        <div className="row">
          <div className="my-4 d-flex gap-2 align-items-center">
            <label htmlFor="filters">Filters:</label>
            <TextInput leftSectionPointerEvents="none" leftSection={<FaSearch />} placeholder="Keywords" id="filters" />
          </div>
          <div className="col-12">
            <Table verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Element position</Table.Th>
                  <Table.Th>Element name</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                  <Table.Th>Atomic mass</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
