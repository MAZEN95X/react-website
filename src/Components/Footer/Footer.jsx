import React from "react";

function Footer() {
  return (
    <footer className="bg-main-light   py-5">
      <div className="container">
        <h4>Get the Frech Cart App</h4>
        <p>
          We will send you a link, ioen it on your phone to download the app.
        </p>
        <div className="d-flex">
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Email..."
            />
          </div>
          <div className="col-sm-2 ps-3">
            <button className="btn w-100 bg-main text-white">
              Share App Link
            </button>
          </div>
        </div>
        <div className="line border-bottom border-2 my-4"></div>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item d-flex align-items-center">
            <i className="fab mx-2 fa-facebook"></i>
            <i className="fab mx-2 fa-twitter"></i>
            <i className="fab mx-2 fa-instagram"></i>
            <i className="fab mx-2 fa-youtube"></i>
            <i className="fab mx-2 fa-tiktok"></i>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
