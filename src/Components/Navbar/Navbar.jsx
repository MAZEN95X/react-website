import React, { useContext, useState } from "react";
import logo from "../../Assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Contexts/AuthContext";
import { cartContext } from "../../Contexts/CartContext";
import "./Navbar.css";
import Cookies from "js-cookie";
export default function Navbar() {
  const { setUserIsLoggedIn, userIsLoggedIn } = useContext(authContext);
  const { cart } = useContext(cartContext);
  const [pathname, setPathName] = useState(window.location.pathname);
  console.log(window.location.pathname);
  const navigate = useNavigate();

  function logOut() {
    setUserIsLoggedIn(false);
    Cookies.remove("token");
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed  w-100 top-0 z-3     ">
        <div className="container">
          <Link to={"home"} className="navbar-brand">
            <img src={logo} alt="fresh cart logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userIsLoggedIn && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to={"home"}
                    onClick={() => {
                      setPathName("home");
                    }}
                    className={
                      pathname === "home" || pathname === "/"
                        ? "active nav-link "
                        : "nav-link "
                    }
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"wishlist"}
                    onClick={() => {
                      setPathName("wishlist");
                    }}
                    className={
                      pathname === "wishlist" ? "active nav-link " : "nav-link "
                    }
                  >
                    WishList
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"products"}
                    onClick={() => {
                      setPathName("products");
                    }}
                    className={
                      pathname === "products" ? "active nav-link " : "nav-link "
                    }
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"categories"}
                    onClick={() => {
                      setPathName("categories");
                    }}
                    className={
                      pathname === "categories"
                        ? "active nav-link "
                        : "nav-link "
                    }
                  >
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"brands"}
                    onClick={() => {
                      setPathName("brands");
                    }}
                    className={
                      pathname === "brands" ? "active nav-link " : "nav-link "
                    }
                  >
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={"orders"}
                    onClick={() => {
                      setPathName("orders");
                    }}
                    className={
                      pathname === "orders" ? "active nav-link " : "nav-link "
                    }
                  >
                    Orders
                  </Link>
                </li>
              </ul>
            )}

            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <Link
                  style={{ marginRight: 10 }}
                  to={"cart"}
                  onClick={() => {
                    setPathName("cart");
                  }}
                  className={pathname === "cart" ? " " : " "}
                >
                  <i className="fa-solid fa-cart-shopping fa-xl position-relative">
                    <span
                      style={{ top: -12, width: 23, height: 23 }}
                      className=" text-white position-absolute d-flex justify-content-center align-items-center span-bg  start-100 translate-middle  rounded-circle font-sm"
                    >
                      {cart.numOfCartItems || 0}
                    </span>
                  </i>
                </Link>
              </li>
              {userIsLoggedIn ? (
                <li className="nav-item">
                  <span onClick={logOut} className="nav-link cursor-pointer">
                    Logout
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"register"} className="nav-link">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
