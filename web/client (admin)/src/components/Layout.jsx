import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { ScrollArea } from "@mantine/core";

const Layout = () => {
  const data = JSON.parse(sessionStorage.getItem("user"));
  if (!data) {
    location.href = "/login";
    return;
  }
  return (
    <>
      <div className="row">
        <Header />
        <Navbar />
        <div className="col-10 outlet">
          <ScrollArea h="90vh" scrollbars="y" scrollbarSize={16} scrollHideDelay={2000}>
            <Outlet />
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Layout;
