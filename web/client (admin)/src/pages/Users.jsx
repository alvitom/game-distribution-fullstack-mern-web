import React, { useContext, useEffect } from "react";
import { Table, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Users = () => {
  const { users, loading, fetchAllUsers } = useContext(AuthContext);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const rows = users.map((user, index) => (
    <Table.Tr key={user._id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>{user.fullname}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.role}</Table.Td>
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
                  <Table.Th>No.</Table.Th>
                  <Table.Th>Image</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Actions</Table.Th>
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
