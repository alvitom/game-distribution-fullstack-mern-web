import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Pagination, Table, TextInput } from "@mantine/core";
import { FaCheck, FaSearch } from "react-icons/fa";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";
import { PromotionContext } from "../context/PromotionContext";

const Promotions = () => {
  const { promotions, setPromotions, loading, page, setPage, totalPages, limit, keyword, setKeyword, debouncedKeyword, setDebouncedKeyword, fetchAllPromotions, deletePromotion } = useContext(PromotionContext);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchAllPromotions(page, limit, debouncedKeyword);
  }, [page, debouncedKeyword]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedKeyword, page, promotions]);

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

  const handleDeletePromotion = async (id) => {
    const response = await deletePromotion(id);
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
                  setPromotions(promotions.filter((promotion) => promotion._id !== id));
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

  const openDeleteModal = (id, game) =>
    modals.open({
      radius: "md",
      title: "Delete promotion",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to delete promo {game}?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDeletePromotion(id);
              }}
            >
              Delete
            </button>
          </div>
        </>
      ),
    });

  const rows = promotions?.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>{(page - 1) * limit + index + 1}</Table.Td>
      <Table.Td>{item.game.title}</Table.Td>
      <Table.Td>{item.discount}%</Table.Td>
      <Table.Td>{new Date(item.endDate).toLocaleDateString("en-US")}</Table.Td>
      <Table.Td>{item.isActive ? "Active" : "Not Active"}</Table.Td>
      <Table.Td>
        <div className="d-flex gap-2">
          <Link to={`update/${item._id}`} className="btn btn-primary">
            Update
          </Link>
          <button className="btn btn-danger" onClick={() => openDeleteModal(item._id, item.game.title)}>
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
      <div className="promotions-wrapper">
        <h1>Promotion</h1>
        <div className="row">
          <div className="d-flex justify-content-between align-items-center me-3 my-4">
            <Link to="add" className="btn btn-success">
              Add Promotion
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
                <Table.Th>Game</Table.Th>
                <Table.Th>Diskon</Table.Th>
                <Table.Th>End Date</Table.Th>
                <Table.Th>Status</Table.Th>
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

export default Promotions;
