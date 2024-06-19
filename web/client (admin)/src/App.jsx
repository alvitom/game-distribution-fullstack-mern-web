import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Blogs from "./pages/Blogs";
import Genres from "./pages/Genres";
import Features from "./pages/Features";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import Promotions from "./pages/Promotions";
import AddGame from "./pages/AddGame";
import AddBlog from "./pages/AddBlog";
import AddGenre from "./pages/AddGenre";
import AddFeature from "./pages/AddFeature";
import UpdateGame from "./pages/UpdateGame";
import UpdateGenre from "./pages/UpdateGenre";
import UpdateFeature from "./pages/UpdateFeature";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Languages from "./pages/Languages";
import AddLanguage from "./pages/AddLanguage";
import UpdateLanguage from "./pages/UpdateLanguage";
import UpdatePromotion from "./pages/UpdatePromotion";
import AddPromotion from "./pages/AddPromotion";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="games" element={<Games />} />
            <Route path="games/add" element={<AddGame />} />
            <Route path="games/update/:id" element={<UpdateGame />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/add" element={<AddBlog />} />
            <Route path="genres" element={<Genres />} />
            <Route path="genres/add" element={<AddGenre />} />
            <Route path="genres/update/:id" element={<UpdateGenre />} />
            <Route path="features" element={<Features />} />
            <Route path="features/add" element={<AddFeature />} />
            <Route path="features/update/:id" element={<UpdateFeature />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="promotions/add" element={<AddPromotion />} />
            <Route path="promotions/update/:id" element={<UpdatePromotion />} />
            <Route path="users" element={<Users />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="languages" element={<Languages />} />
            <Route path="languages/add" element={<AddLanguage />} />
            <Route path="languages/update/:id" element={<UpdateLanguage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
