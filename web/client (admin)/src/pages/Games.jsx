import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Pagination, Table, TextInput } from "@mantine/core";
import { FaSearch, FaCheck } from "react-icons/fa";
import { GameContext } from "../context/GameContext";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";

const Games = () => {
  const { games, setGames, loading, page, setPage, totalPages, limit, keyword, setKeyword, debouncedKeyword, setDebouncedKeyword, genre, feature, platform, fetchAllGames, deleteGame } = useContext(GameContext);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchAllGames(page, limit, debouncedKeyword, genre, feature, platform);
  }, [page, debouncedKeyword]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedKeyword, page, games]);

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

  const handleDeleteGame = async (id) => {
    const response = await deleteGame(id);
    if (!response.success) {
      return modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <MdClose style={{ width: 100 + "px", height: 100 + "px", color: "rgb(220, 53, 69)" }} />
            </div>
            <p className="text-center">{response.message}</p>
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
    } else {
      return modals.open({
        radius: "md",
        size: "xs",
        centered: true,
        withCloseButton: false,
        children: (
          <>
            <div className="d-flex justify-content-center mb-2">
              <FaCheck style={{ width: 100 + "px", height: 100 + "px", color: "rgb(25, 135, 84)" }} />
            </div>
            <p className="text-center">{response.message}</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setGames(games.filter((game) => game._id !== id));
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

  const openDeleteModal = (id, title) =>
    modals.open({
      radius: "md",
      title: "Delete game",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to delete {title}?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDeleteGame(id);
              }}
            >
              Delete
            </button>
          </div>
        </>
      ),
    });

  const rows = games.map((game, index) => (
    <Table.Tr key={index}>
      <Table.Td>{(page - 1) * limit + index + 1}</Table.Td>
      <Table.Td>
        <img src={game.coverImage?.url} className="img-fluid" />
      </Table.Td>
      <Table.Td>{game.title}</Table.Td>
      <Table.Td>
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(game.price)}
      </Table.Td>
      <Table.Td>
        <div className="d-flex gap-2">
          <Link to={`update/${game._id}`} className="btn btn-primary">
            Update
          </Link>
          <button className="btn btn-danger" onClick={() => openDeleteModal(game._id, game.title)}>
            Delete
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
      <div className="games-wrapper">
        <h1>Game</h1>
        <div className="row">
          <div className="d-flex justify-content-between align-items-center me-3 my-4">
            <Link to="add" className="btn btn-success">
              Add Game
            </Link>
            <div className="d-flex gap-2 align-items-center">
              <label htmlFor="filters">Filters:</label>
              <TextInput leftSectionPointerEvents="none" leftSection={<FaSearch />} placeholder="Keywords" id="filters" ref={inputRef} value={keyword} onChange={handleSearch} />
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
          <div className="d-flex justify-content-center align-items-center">
            <Pagination total={totalPages} value={page} onChange={setPage} mt="xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Games;
