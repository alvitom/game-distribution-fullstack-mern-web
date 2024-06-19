import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Pagination, Table, TextInput } from "@mantine/core";
import { FaCheck, FaSearch } from "react-icons/fa";
import { modals } from "@mantine/modals";
import { MdClose } from "react-icons/md";
import { LanguageContext } from "../context/LanguageContext";

const Languages = () => {
  const { languages, setLanguages, loading, page, setPage, totalPages, limit, keyword, setKeyword, debouncedKeyword, setDebouncedKeyword, fetchAllLanguages, deleteLanguage } = useContext(LanguageContext);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchAllLanguages(page, limit, debouncedKeyword);
  }, [page, debouncedKeyword]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedKeyword, page, languages]);

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

  const handleDeleteLanguage = async (id) => {
    const data = await deleteLanguage(id);
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
            <p className="text-center">Delete language success</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-light"
                onClick={() => {
                  modals.closeAll();
                  setLanguages(languages.filter((language) => language._id !== id));
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
            <p className="text-center">Delete language failed</p>
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

  const openDeleteModal = (id, language) =>
    modals.open({
      radius: "md",
      title: "Delete language",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to delete {language}?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDeleteLanguage(id);
              }}
            >
              Delete
            </button>
          </div>
        </>
      ),
    });

  const rows = languages.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>{(page - 1) * limit + index + 1}</Table.Td>
      <Table.Td>{item.language}</Table.Td>
      <Table.Td>
        <div className="d-flex gap-2">
          <Link to={`update/${item._id}`} className="btn btn-primary">
            Update
          </Link>
          <button className="btn btn-danger" onClick={() => openDeleteModal(item._id, item.language)}>
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
      <div className="languages-wrapper">
        <h1>Language</h1>
        <div className="row">
          <div className="d-flex justify-content-between align-items-center me-3 my-4">
            <Link to="add" className="btn btn-success">
              Add Language
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
                <Table.Th>Language</Table.Th>
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

export default Languages;
