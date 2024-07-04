import React, { useContext, useEffect } from "react";
import { Pagination, Table, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";
import { TransactionContext } from "../context/TransactionContext";

const Transactions = () => {
  const { transactions, loading, page, setPage, totalPages, fetchAllTransactionUsers } = useContext(TransactionContext);
  const limit = 10;

  useEffect(() => {
    fetchAllTransactionUsers(page, limit);
  }, [page]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const rows = transactions.map((transaction, index) => (
    <Table.Tr key={index}>
      <Table.Td>{(page - 1) * 10 + index + 1}</Table.Td>
      <Table.Td>{transaction.orderId}</Table.Td>
      <Table.Td>{transaction.userId.fullname}</Table.Td>
      <Table.Td>{new Intl.NumberFormat("in-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(transaction.amountPaid)}</Table.Td>
      <Table.Td>{new Date(transaction.createdAt).toLocaleString()}</Table.Td>
      <Table.Td className={`${transaction.status === "success" ? "text-success" : transaction.status === "failed" ? "text-danger" : transaction.status === "pending" && "text-warning"} text-capitalize fw-bold`}>
        {transaction.status}
      </Table.Td>
      <Table.Td>
        <button className="btn btn-primary btn-sm">View Details</button>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <div className="transactions-wrapper">
        <h1>Transactions</h1>
        <div className="row">
          <div className="my-4 d-flex gap-2 align-items-center">
            <label htmlFor="filters">Filters:</label>
            <TextInput leftSectionPointerEvents="none" leftSection={<FaSearch />} placeholder="Keywords" id="filters" />
          </div>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>No</Table.Th>
                <Table.Th>Order ID</Table.Th>
                <Table.Th>User</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Date</Table.Th>
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

export default Transactions;
