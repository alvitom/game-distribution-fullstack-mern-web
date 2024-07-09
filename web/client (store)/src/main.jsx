import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ModalsProvider } from "@mantine/modals";
import { GameProvider } from "./context/GameContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { Notifications } from "@mantine/notifications";
import { CartProvider } from "./context/CartContext.jsx";
import { CheckoutProvider } from "./context/CheckoutContext.jsx";
import { TransactionProvider } from "./context/TransactionContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <MantineProvider>
        <Notifications position="top-center" zIndex={1000} autoClose={3000} className="notifications" />
        <ModalsProvider>
          <AuthProvider>
            <GameProvider>
              <WishlistProvider>
                <CartProvider>
                  <CheckoutProvider>
                    <TransactionProvider>
                      <App />
                    </TransactionProvider>
                  </CheckoutProvider>
                </CartProvider>
              </WishlistProvider>
            </GameProvider>
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </HelmetProvider>
  </React.StrictMode>
);
