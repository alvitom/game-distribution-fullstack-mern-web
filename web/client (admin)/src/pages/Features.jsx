import React, { useContext, useEffect, useRef } from "react";
import { Pagination, Table, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { FeatureContext } from "../context/FeatureContext";
import { modals } from "@mantine/modals";
import { FaCheck, FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const Features = () => {
  const { features, setFeatures, loading, page, setPage, totalPages, limit, keyword, setKeyword, debouncedKeyword, setDebouncedKeyword, fetchAllFeatures, deleteFeature } = useContext(FeatureContext);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchAllFeatures(page, limit, debouncedKeyword);
  }, [page, debouncedKeyword]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedKeyword, page, features]);

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

  const handleDeleteFeature = async (id) => {
    const data = await deleteFeature(id);
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
            <p className="text-center">Delete feature success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setFeatures(features.filter((feature) => feature._id !== id));
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
            <p className="text-center">Delete feature failed</p>
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

  const openDeleteModal = (id, feature) =>
    modals.open({
      radius: "md",
      title: "Delete feature",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to delete {feature}?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDeleteFeature(id);
              }}
            >
              Delete
            </button>
          </div>
        </>
      ),
    });

  const rows = features.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>{(page - 1) * limit + index + 1}</Table.Td>
      <Table.Td>{item.feature}</Table.Td>
      <Table.Td>
        <div className="d-flex gap-2">
          <Link to={`update/${item._id}`} className="btn btn-primary">
            Update
          </Link>
          <button className="btn btn-danger" onClick={() => openDeleteModal(item._id, item.feature)}>
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
      <div className="features-wrapper">
        <h1>Feature</h1>
        <div className="row">
          <div className="d-flex justify-content-between align-items-center me-3 my-4">
            <Link to="add" className="btn btn-success">
              Add Feature
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
                <Table.Th>Feature</Table.Th>
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

export default Features;
