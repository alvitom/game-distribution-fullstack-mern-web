import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ModalsProvider } from "@mantine/modals";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <MantineProvider>
        <ModalsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </HelmetProvider>
  </React.StrictMode>
);
