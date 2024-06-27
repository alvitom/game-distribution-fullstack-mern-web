import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopSellersCollection from "./pages/TopSellersCollection";
import MostPlayedCollection from "./pages/MostPlayedCollection";
import UpcomingCollection from "./pages/UpcomingCollection";
import TrendingCollection from "./pages/TrendingCollection";
import NewReleaseCollection from "./pages/NewReleaseCollection";
import Blog from "./pages/Blog";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import BlogDetail from "./pages/BlogDetail";
import Checkout from "./pages/Checkout";
import Game from "./pages/Game";
import VerifyOTP from "./pages/VerifyOTP";
import AddUserInformation from "./pages/AddUserInformation";
import NotFound from "./pages/NotFound";
import ChangePassword from "./pages/ChangePassword";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="game" element={<Game />} />
            <Route path="blog" element={<Blog />} />
            <Route path="collection/top-sellers" element={<TopSellersCollection />} />
            <Route path="collection/most-played" element={<MostPlayedCollection />} />
            <Route path="collection/upcoming" element={<UpcomingCollection />} />
            <Route path="collection/trending" element={<TrendingCollection />} />
            <Route path="collection/new-release" element={<NewReleaseCollection />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="game/:title" element={<GameDetail />} />
            <Route path="blog/id" element={<BlogDetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp/:id" element={<VerifyOTP />} />
          <Route path="/add-user-information/:id" element={<AddUserInformation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
