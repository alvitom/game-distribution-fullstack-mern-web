import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import { List, Pagination, Table } from "@mantine/core";
import { MdClose } from "react-icons/md";
import { TransactionContext } from "../context/TransactionContext";
import { modals } from "@mantine/modals";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem("user"));

const Transaction = () => {
  const navigate = useNavigate();
  const { getAllTransactions, transactions, loading, updateTransaction, page, setPage, totalPages } = useContext(TransactionContext);
  const limit = 10;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    getAllTransactions(page, limit);
  }, [page]);

  const handleContinueToPayment = (orderId) => {
    const token = JSON.parse(localStorage.getItem(orderId));

    window.snap.pay(token, {
      onSuccess: async function (result) {
        const response = await updateTransaction(result);
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
        }
        localStorage.removeItem(orderId);
        await getAllTransactions();
      },
      onPending: async function (result) {
        const response = await updateTransaction(result);
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
        }
        await getAllTransactions();
      },
      onError: async function (result) {
        const response = await updateTransaction(result);
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
        }
        localStorage.removeItem(orderId);
        await getAllTransactions();
      },
    });
  };

  const handleViewDetails = (orderId, transaction) => {
    modals.open({
      radius: "md",
      centered: true,
      withCloseButton: false,
      children: (
        <>
          {/* <div className="d-flex justify-content-center mb-2">
                <MdClose style={{ width: 100 + "px", height: 100 + "px", color: "rgb(220, 53, 69)" }} />
              </div> */}
          <div className="transaction-details p-3">
            <p>{orderId}</p>
            <p>{new Date(transaction.createdAt).toLocaleString()}</p>
            {transaction.items.map((item, index) => (
              <div className="d-flex gap-3 align-items-center my-4" key={index}>
                <div className="game-image">
                  <img src={item.coverImage.url} alt={item.title} style={{ width: 80 + "px" }} />
                </div>
                <div className="game-detail">
                  <h6>{item.title}</h6>
                  <p>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(item.price)}
                  </p>
                  <div className="d-flex align-items-center gap-2 platform-support">
                    {item.platform?.map((item, index) => (item === "Windows" ? <FaWindows key={index} /> : item === "Mac OS" ? <FaApple key={index} /> : item === "Linux" ? <FaLinux key={index} /> : null))}
                  </div>
                </div>
              </div>
            ))}
            <p className="mt-4 fw-bold">Total: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(transaction.amountPaid)}</p>
            <p>
              Status:{" "}
              <span style={{ color: transaction.status === "success" ? "green" : transaction.status === "failed" ? "red" : transaction.status === "pending" && "orange", textTransform: "capitalize", fontWeight: "bold" }}>
                {transaction.status}
              </span>
            </p>
          </div>
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
  };

  const rows = transactions.map((transaction, index) => (
    <Table.Tr key={index}>
      <Table.Td>{(page - 1) * limit + index + 1}</Table.Td>
      <Table.Td>{transaction.orderId}</Table.Td>
      <Table.Td>
        <List spacing="xs" size="sm">
          {transaction.items.map((item) => (
            <List.Item key={item._id}>{item.title}</List.Item>
          ))}
        </List>
      </Table.Td>
      <Table.Td>
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(transaction.amountPaid)}
      </Table.Td>
      <Table.Td style={{ color: transaction.status === "success" ? "green" : transaction.status === "failed" ? "red" : transaction.status === "pending" && "orange", textTransform: "capitalize", fontWeight: "bold" }}>
        {transaction.status}
      </Table.Td>
      <Table.Td>{new Date(transaction.createdAt).toLocaleString()}</Table.Td>
      <Table.Td>
        <button
          type="button"
          className={`${transaction.status === "pending" ? "btn btn-success" : "btn btn-primary"} btn-sm`}
          style={{ width: 135 + "px", fontSize: 12 + "px" }}
          onClick={transaction.status === "pending" ? () => handleContinueToPayment(transaction.orderId) : () => handleViewDetails(transaction.orderId, transaction)}
        >
          {transaction.status === "pending" ? "Continue to payment" : "View Details"}
        </button>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Meta title="Transactions" />
      <div className="transactions-wrapper">
        <div className="container">
          <div className="row justify-content-center py-4">
            <div className="col-lg-9 col-md-10 col-12">
              <div className="transactions-container">
                <h1>My Transactions</h1>
                {transactions?.length < 1 ? (
                  <p className="text-center">No transactions yet</p>
                ) : loading ? (
                  <p className="text-center">Loading...</p>
                ) : (
                  <div className="table-responsive">
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>No.</Table.Th>
                          <Table.Th>Order ID</Table.Th>
                          <Table.Th>Description</Table.Th>
                          <Table.Th>Amount</Table.Th>
                          <Table.Th>Status</Table.Th>
                          <Table.Th>Date</Table.Th>
                          <Table.Th>Action</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                  </div>
                )}
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <Pagination total={totalPages} value={page} onChange={setPage} mt="xl" withControls={false} withEdges />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transaction;
