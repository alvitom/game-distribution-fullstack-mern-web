import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="game/:id" element={<GameDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
