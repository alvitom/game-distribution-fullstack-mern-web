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
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { ModalsProvider } from "@mantine/modals";
import { PromotionProvider } from "./context/PromotionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <GameProvider>
          <GenreProvider>
            <FeatureProvider>
              <AuthProvider>
                <LanguageProvider>
                  <PromotionProvider>
                    <App />
                  </PromotionProvider>
                </LanguageProvider>
              </AuthProvider>
            </FeatureProvider>
          </GenreProvider>
        </GameProvider>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);
