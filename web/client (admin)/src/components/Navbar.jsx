import { useContext, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { MdGames, MdCategory, MdLogout } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { BiCategory, BiSolidDiscount } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { FaBlogger } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IoLanguage } from "react-icons/io5";
import { modals } from "@mantine/modals";

const data = [
  { link: "/", label: "Dashboard", icon: <RxDashboard className="fs-5" /> },
  { link: "/games", label: "Games", icon: <MdGames className="fs-5" /> },
  { link: "/blogs", label: "Blogs", icon: <FaBlogger className="fs-5" /> },
  { link: "/genres", label: "Genres", icon: <MdCategory className="fs-5" /> },
  { link: "/features", label: "Features", icon: <BiCategory className="fs-5" /> },
  { link: "/promotions", label: "Promotions", icon: <BiSolidDiscount className="fs-5" /> },
  { link: "/transactions", label: "Transactions", icon: <GrTransaction className="fs-5" /> },
  { link: "/users", label: "Users", icon: <FaUsers className="fs-5" /> },
  { link: "/languages", label: "Languages", icon: <IoLanguage className="fs-5" /> },
];

export const Navbar = () => {
  const [active, setActive] = useState("Dashboard");
  const { logout } = useContext(AuthContext);

  const links = data.map((item) => (
    <Link
      className="link gap-2"
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <span>{item.icon}</span>
      <span>{item.label}</span>
    </Link>
  ));

  const handleLogout = async () => {
    await logout();
    sessionStorage.removeItem("user");
    location.reload();
  };

  const openLogoutModal = () =>
    modals.open({
      radius: "md",
      title: "Logout user",
      centered: true,
      children: (
        <>
          <p>Are you sure you want to logout?</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-light" onClick={() => modals.closeAll()}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ),
    });

  return (
    <nav className="navbar col-2">
      <h5 className="mb-3">Menu</h5>
      <div className="navbarMain">{links}</div>

      <div className="footer">
        <button className="btn link gap-2" onClick={openLogoutModal}>
          <MdLogout className="fs-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};
