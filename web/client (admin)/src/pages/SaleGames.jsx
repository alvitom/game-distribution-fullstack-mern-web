import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Pagination, Table, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";
import { GameContext } from "../context/GameContext";

const SaleGames = () => {
  const { saleGames, loading, page, setPage, totalPages, limit, keyword, setKeyword, debouncedKeyword, setDebouncedKeyword, genre, feature, platform, fetchSaleGames } = useContext(GameContext);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchSaleGames(page, limit, debouncedKeyword);
  }, [page, debouncedKeyword]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedKeyword, page, saleGames]);

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

  const rows = saleGames?.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>{(page - 1) * limit + index + 1}</Table.Td>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>{new Intl.NumberFormat("in-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(item.price)}</Table.Td>
      <Table.Td>{item.discount.percentage}%</Table.Td>
      <Table.Td>{new Intl.NumberFormat("in-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(item.price - ((item.discount.percentage / 100) * item.price).toFixed(0))}</Table.Td>
      <Table.Td>{new Date(item.discount.endDate).toLocaleDateString("en-US")}</Table.Td>
      <Table.Td>{item.discount.isActive ? "Active" : "Not Active"}</Table.Td>
      <Table.Td>
        <Link to={`${item.slug}`} className="btn btn-primary">
          Update
        </Link>
      </Table.Td>
    </Table.Tr>
  ));

  const handleSearch = (e) => {
    setPage(1);
    setKeyword(e.target.value);
  };
  return (
    <>
      <div className="sale-games-wrapper">
        <h1>Games on Sale</h1>
        <div className="row">
          <div className="d-flex justify-content-between align-items-center me-3 my-4">
            <Link to="add" className="btn btn-success">
              Add Sale Game
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
                <Table.Th>Old Price</Table.Th>
                <Table.Th>Diskon</Table.Th>
                <Table.Th>New Price</Table.Th>
                <Table.Th>End Date</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
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

export default SaleGames;
