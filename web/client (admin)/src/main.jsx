import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import { MantineProvider } from "@mantine/core";
import { GameProvider } from "./context/GameContext.jsx";
import { GenreProvider } from "./context/GenreContext.jsx";
import { FeatureProvider } from "./context/FeatureContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <GameProvider>
        <GenreProvider>
          <FeatureProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </FeatureProvider>
        </GenreProvider>
      </GameProvider>
    </MantineProvider>
  </React.StrictMode>
);
