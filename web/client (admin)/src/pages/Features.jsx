import React, { useContext, useEffect } from "react";
import { Table } from "@mantine/core";
import { Link } from "react-router-dom";
import { FeatureContext } from "../context/FeatureContext";

const Features = () => {
  const { features, loading, fetchAllFeatures } = useContext(FeatureContext);

  useEffect(() => {
    fetchAllFeatures();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const rows = features.map((item, index) => (
    <Table.Tr key={item._id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{item.feature}</Table.Td>
      <Table.Td>
        <div className="d-flex gap-2">
          <Link to={`update/${item._id}`} className="btn btn-primary">
            Edit
          </Link>
          <Link to={`delete/`} className="btn btn-danger">
            Delete
          </Link>
        </div>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <div className="features-wrapper">
        <h1>Feature</h1>
        <Link to="add" className="btn btn-success my-4">
          Add Feature
        </Link>
        <div className="row">
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
        </div>
      </div>
    </>
  );
};

export default Features;
