import React, { useContext, useEffect, useState } from "react";
import { MdGames } from "react-icons/md";
import { FaBlogger } from "react-icons/fa";
import { BarChart, DonutChart, LineChart, PieChart } from "@mantine/charts";
import { sales, productSales, salesMonth } from "../utils/data";
import { Table } from "@mantine/core";
import { BiCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { GameContext } from "../context/GameContext";
import { GenreContext } from "../context/GenreContext";
import { FeatureContext } from "../context/FeatureContext";
import { AuthContext } from "../context/AuthContext";
import { TransactionContext } from "../context/TransactionContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { games, fetchAllGames } = useContext(GameContext);
  const { genres, fetchAllGenres } = useContext(GenreContext);
  const { features, fetchAllFeatures } = useContext(FeatureContext);
  const { users, fetchAllUsers } = useContext(AuthContext);
  const { transactions, fetchAllTransactionUsers } = useContext(TransactionContext);
  const [totalSales, setTotalSales] = useState(0);
  const [yearlySales, setYearlySales] = useState({});
  const limit = 5;

  useEffect(() => {
    fetchAllGames();
    fetchAllGenres();
    fetchAllFeatures();
    fetchAllUsers();
    fetchAllTransactionUsers(null, limit);
  }, []);

  useEffect(() => {
    const total = transactions.reduce((sum, transaction) => {
      if (transaction.status === "success") {
        return sum + transaction.amountPaid;
      }
      return sum;
    }, 0);
    setTotalSales(total);
  }, [transactions]);

  useEffect(() => {
    const yearlyData = transactions.reduce((acc, transaction) => {
      const year = new Date(transaction.createdAt).getFullYear();
      const amount = transaction.amountPaid;

      if (!acc[year]) {
        acc[year] = 0;
      }

      acc[year] += amount;

      return acc;
    }, {});

    setYearlySales(yearlyData);
  }, [transactions]);

  const rows = transactions.map((transaction, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{transaction.orderId}</Table.Td>
      <Table.Td>{transaction.userId?.fullname}</Table.Td>
      <Table.Td>{new Intl.NumberFormat("in-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(transaction.amountPaid)}</Table.Td>
      <Table.Td>{new Date(transaction.createdAt).toLocaleString()}</Table.Td>
      <Table.Td className={`${transaction.status === "success" ? "text-success" : transaction.status === "failed" ? "text-danger" : transaction.status === "pending" && "text-warning"} text-capitalize fw-bold`}>
        {transaction.status}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <div className="dashboard-wrapper">
        <h1 className="mb-4">Dashboard</h1>
        <div className="row">
          <div className="total-game col-2">
            <div className="header d-flex justify-content-between align-items-start">
              <h6>Total Game</h6>
              <MdGames className="fs-4" />
            </div>
            <div className="body">
              <h5>{games.length}</h5>
            </div>
          </div>
          <div className="total-blog col-2">
            <div className="header d-flex justify-content-between align-items-start">
              <h6>Total Blog</h6>
              <FaBlogger className="fs-4" />
            </div>
            <div className="body d-flex align-items-end justify-content-between">
              <h5>24</h5>
            </div>
          </div>
          <div className="total-genre col-2">
            <div className="header d-flex justify-content-between align-items-start">
              <h6>Total Genre</h6>
              <MdGames className="fs-4" />
            </div>
            <div className="body d-flex align-items-end justify-content-between">
              <h5>{genres.length}</h5>
            </div>
          </div>
          <div className="total-feature col-2">
            <div className="header d-flex justify-content-between align-items-start">
              <h6>Total Feature</h6>
              <BiCategory className="fs-4" />
            </div>
            <div className="body d-flex align-items-end justify-content-between">
              <h5>{features.length}</h5>
            </div>
          </div>
          <div className="total-user col-2">
            <div className="header d-flex justify-content-between align-items-start">
              <h6>Total User</h6>
              <FaUsers className="fs-4" />
            </div>
            <div className="body d-flex align-items-end justify-content-between">
              <h5>{users.length}</h5>
            </div>
          </div>
          {/* <div className="total-transaction col-2">
            <div className="header d-flex justify-content-between align-items-start">
              <h6>Expected Earnings</h6>
            </div>
            <div className="body d-flex align-items-end justify-content-between">
              <h5>$4589.00</h5>
            </div>
          </div>
          <div className="total-promotion col-2">
            <div className="header d-flex justify-content-between align-items-start">
              <h6>Expected Earnings</h6>
            </div>
            <div className="body d-flex align-items-end justify-content-between">
              <h5>$4589.00</h5>
            </div>
          </div>
          <div className="total-language col-2">
            <div className="header d-flex justify-content-between align-items-start">
              <h6>Expected Earnings</h6>
            </div>
            <div className="body d-flex align-items-end justify-content-between">
              <h5>$4589.00</h5>
            </div>
          </div> */}
        </div>
        <div className="row">
          <div className="col-8">
            <div className="mb-5 d-flex justify-content-between">
              <h5 className="mb-0">Total Penjualan Game Bulan Ini</h5>
              <h4 className="mb-0">{new Intl.NumberFormat("in-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(totalSales)}</h4>
            </div>
            <LineChart
              h={200}
              data={transactions.map((transaction) => ({
                date: new Date(transaction.createdAt).toLocaleDateString(),
                items: transaction.items.map((item) => item.price),
              }))}
              dataKey="date"
              series={[
                { name: "Apples", color: "indigo.6" },
                { name: "Oranges", color: "blue.6" },
                { name: "Tomatoes", color: "teal.6" },
              ]}
              curveType="linear"
            />
          </div>
          <div className="col-3 d-flex flex-column justify-content-center">
            <h5 className="mb-4 text-center">Penjualan Game</h5>
            <div className="d-flex justify-content-center align-items-center">
              <PieChart data={productSales} withTooltip withLabelsLine labelsPosition="outside" size={170} labelsType="percent" withLabels tooltipDataSource="segment" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="mb-5 d-flex justify-content-between">
              <h5 className="mb-0">Total Penjualan Game Tahun Ini</h5>
              <h4 className="mb-0">
                {Object.keys(yearlySales).map((year) => (
                  <li key={year}>
                    {new Intl.NumberFormat("in-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(yearlySales[year])}
                  </li>
                ))}
              </h4>
            </div>
            <BarChart h={250} data={sales} dataKey="month" series={[{ name: "Smartphones", color: "violet.6" }]} tickLine="y" />
          </div>
          <div className="col-3 d-flex flex-column justify-content-center">
            <h5 className="mb-4 text-center">Penjualan Game Berdasarkan Genre</h5>
            <div className="d-flex justify-content-center align-items-center">
              <DonutChart data={productSales} tooltipDataSource="segment" withLabelsLine withLabels size={170} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <h5 className="text-center mb-4">Transactions</h5>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>No</Table.Th>
                  <Table.Th>Order ID</Table.Th>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
            <div className="d-flex justify-content-end me-3 mt-4">
              <Link to="/transactions">View All Transactions</Link>
            </div>
          </div>
          <div className="col-3 d-flex flex-column justify-content-center">
            <h5 className="mb-4">Penjualan Game Berdasarkan Feature</h5>
            <div className="d-flex justify-content-center align-items-center">
              <DonutChart data={productSales} tooltipDataSource="segment" withLabelsLine withLabels size={170} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
