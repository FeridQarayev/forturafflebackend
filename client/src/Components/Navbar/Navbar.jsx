import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [activeLink, setActiveLink] = useState("");

  const handleClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="p-5">
      <header className="header">
        <div className="loqo">
          <Link to="/" onClick={() => setActiveLink("")}>
            <img src="Assets/navbar/Logo.png" alt="Logo" />
          </Link>
          <h1>
            <Link to="/" onClick={() => setActiveLink("")}>
              Forturaffle
            </Link>
          </h1>
        </div>
        <nav className="nav">
          <NavLink
            exact
            to="/"
            className={`navLink ${activeLink === "" ? "activeLink" : ""}`}
            onClick={() => handleClick("")}
          >
            Ana səhifə
          </NavLink>
          <NavLink
            to="/categories"
            className={`navLink ${
              activeLink === "categories" ? "activeLink" : ""
            }`}
            onClick={() => handleClick("categories")}
          >
            Məhsullar
          </NavLink>
          <NavLink
            to="/win"
            className={`navLink ${activeLink === "win" ? "activeLink" : ""}`}
            onClick={() => handleClick("win")}
          >
            Son qazananlar
          </NavLink>
          <NavLink
            to="/about"
            className={`navLink ${activeLink === "about" ? "activeLink" : ""}`}
            onClick={() => handleClick("about")}
          >
            Haqqımızda
          </NavLink>
          <NavLink
            to="/faq"
            className={`navLink ${activeLink === "faq" ? "activeLink" : ""}`}
            onClick={() => handleClick("faq")}
          >
            FAQ
          </NavLink>
          <NavLink
            to="/contact"
            className={`navLink ${
              activeLink === "contact" ? "activeLink" : ""
            }`}
            onClick={() => handleClick("contact")}
          >
            Əlaqə
          </NavLink>
        </nav>
        <div className="navbar__loqo">
          <div>
            <BsSearch className="text-2xl" />
          </div>
          <div>
            <AiOutlineHeart className="text-2xl" />
          </div>
          <div>
            <AiOutlineShoppingCart className="text-2xl" />
          </div>
          <div className="text-2xl">
            <FaRegUserCircle />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
