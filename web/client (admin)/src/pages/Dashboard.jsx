import React from "react";
import { MdGames } from "react-icons/md";
import { FaBlogger } from "react-icons/fa";
import { BarChart, DonutChart, LineChart, PieChart } from "@mantine/charts";
import { sales, productSales, elements, salesMonth } from "../utils/data";
import { Table } from "@mantine/core";
import { BiCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";

const Dashboard = () => {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
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
              <h5>35</h5>
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
              <h5>15</h5>
            </div>
          </div>
          <div className="total-feature col-2">
            <div className="header d-flex justify-content-between align-items-start">
              <h6>Total Feature</h6>
              <BiCategory className="fs-4" />
            </div>
            <div className="body d-flex align-items-end justify-content-between">
              <h5>10</h5>
            </div>
          </div>
          <div className="total-user col-2">
            <div className="header d-flex justify-content-between align-items-start">
              <h6>Total User</h6>
              <FaUsers className="fs-4" />
            </div>
            <div className="body d-flex align-items-end justify-content-between">
              <h5>120</h5>
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
              <h4 className="mb-0">Rp38,000,000</h4>
            </div>
            <LineChart
              h={200}
              data={salesMonth}
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
              <h4 className="mb-0">Rp850,000,000</h4>
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
            <h5 className="text-center mb-4">Status Transaksi</h5>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Element position</Table.Th>
                  <Table.Th>Element name</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                  <Table.Th>Atomic mass</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
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
