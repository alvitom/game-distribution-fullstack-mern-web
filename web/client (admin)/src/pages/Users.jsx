import React, { useContext, useEffect, useRef } from "react";
import { Pagination, Table, TextInput } from "@mantine/core";
import { FaSearch, FaCheck } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";

const Users = () => {
  const { users, loading, page, setPage, totalPages, limit, keyword, setKeyword, debouncedKeyword, setDebouncedKeyword, fetchAllUsers, blockUser, unblockUser } = useContext(AuthContext);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchAllUsers(page, limit, debouncedKeyword);
  }, [page, debouncedKeyword]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedKeyword, page, users]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleBlockUser = async (id) => {
    const data = await blockUser(id);
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
            <p className="text-center">Block user success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  fetchAllUsers(page, limit, debouncedKeyword);
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
            <p className="text-center">Block user failed</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
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

  const handleUnblockUser = async (id) => {
    const data = await unblockUser(id);
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
            <p className="text-center">Unblock user success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  fetchAllUsers(page, limit, debouncedKeyword);
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
            <p className="text-center">Unblock user failed</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
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

  const openBlockStatusModal = (id, user, blockStatus) =>
    modals.open({
      radius: "md",
      title: `${blockStatus ? "Unblock user" : "Block user"}`,
      centered: true,
      children: (
        <>
          <p>Are you sure you want to {blockStatus ? `unblock user ${user}` : `block user ${user}`}?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button
              className={blockStatus ? "btn btn-success" : "btn btn-danger"}
              onClick={
                blockStatus
                  ? () => {
                      handleUnblockUser(id);
                    }
                  : () => {
                      handleBlockUser(id);
                    }
              }
            >
              {blockStatus ? "Unblock" : "Block"}
            </button>
          </div>
        </>
      ),
    });

  const rows = users.map((user, index) => (
    <Table.Tr key={user._id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td></Table.Td>
      <Table.Td>{user.fullname}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.role}</Table.Td>
      <Table.Td>
        <div className="d-flex gap-2">
          <button className="btn btn-primary">Change Role</button>
          <button className={user.isBlocked ? "btn btn-success" : "btn btn-danger"} onClick={() => openBlockStatusModal(user._id, user.fullname, user.isBlocked)}>
            {user.isBlocked ? "Unblock User" : "Block User"}
          </button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  const handleSearch = (e) => {
    setPage(1);
    setKeyword(e.target.value);
  };
  return (
    <>
      <div className="users-wrapper">
        <h1>User</h1>
        <div className="row">
          <div className="my-4 d-flex gap-2 align-items-center">
            <label htmlFor="filters">Filters:</label>
            <TextInput leftSectionPointerEvents="none" leftSection={<FaSearch />} placeholder="Keywords" id="filters" ref={inputRef} value={keyword} onChange={handleSearch} />
          </div>
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
          <div className="d-flex justify-content-center align-items-center">
            <Pagination total={totalPages} value={page} onChange={setPage} mt="xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
