import { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { MdGames, MdCategory, MdLogout } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { BiCategory, BiSolidDiscount } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { FaBlogger, FaExchangeAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const data = [
  { link: "/", label: "Dashboard", icon: <RxDashboard className="fs-5" /> },
  { link: "/games", label: "Games", icon: <MdGames className="fs-5" /> },
  { link: "/blogs", label: "Blogs", icon: <FaBlogger className="fs-5" /> },
  { link: "/genres", label: "Genres", icon: <MdCategory className="fs-5" /> },
  { link: "/features", label: "Features", icon: <BiCategory className="fs-5" /> },
  { link: "/promotions", label: "Promotions", icon: <BiSolidDiscount className="fs-5" /> },
  { link: "/transactions", label: "Transactions", icon: <GrTransaction className="fs-5" /> },
  { link: "/users", label: "Users", icon: <FaUsers className="fs-5" /> },
  // { link: "/languages", label: "Languages", icon: <IoLanguage className="fs-5" />},
];

export const Navbar = () => {
  const [active, setActive] = useState("Dashboard");

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

  return (
    <nav className="navbar col-2">
      <h5 className="mb-3">Menu</h5>
      <div className="navbarMain">{links}</div>

      <div className="footer">
        <a href="#" className="link gap-2" onClick={(event) => event.preventDefault()}>
          <FaExchangeAlt className="fs-5" />
          <span>Ganti Akun</span>
        </a>
        <a href="#" className="link gap-2" onClick={(event) => event.preventDefault()}>
          <MdLogout className="fs-5" />
          <span>Keluar</span>
        </a>
      </div>
    </nav>
  );
};
