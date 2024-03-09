import React from "react";
import notFoundImg from "../../Assets/images/error.svg";

function NotFound() {
  return (
    <div>
      <img className="w-50 m-auto d-block py-5" src={notFoundImg} alt="" />
      <h1 className="fw-bolder text-center mb-5">Page Not Found</h1>
    </div>
  );
}

export default NotFound;
