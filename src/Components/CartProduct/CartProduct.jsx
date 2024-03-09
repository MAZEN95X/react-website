import React, { useState } from "react";
import { Link } from "react-router-dom/dist";

export default function CartProduct({
  cartProduct,
  removeProductFromCart,
  updateCartProductCount,
}) {
  const [count, setCount] = useState(cartProduct.count);
  console.log(cartProduct._id);
  return (
    <div className="cart-product shadow rounded-2 my-3">
      <div className="row align-items-center">
        <div className="col-md-2">
          <Link to={"/productDetails/" + cartProduct.product._id} className="a">
            <img
              className="w-100"
              src={cartProduct.product.imageCover}
              alt=""
            />
          </Link>
        </div>
        <div className="col-md-8">
          <h2>{cartProduct.product.title}</h2>
          <h5>{cartProduct.product.category.name}</h5>
          <p className="d-flex justify-content-between">
            <span>{cartProduct.price} EGP</span>
            <span>
              <i className=" fas fa-star rating-color me-1"></i>{" "}
              {cartProduct.product.ratingsAverage}
            </span>
          </p>
          <p>
            <span className="fw-bolder">Total Price:</span>{" "}
            {cartProduct.price * cartProduct.count} EGP
          </p>
        </div>

        <div className="col-md-2 d-flex align-items-center flex-column gap-1  ">
          <button
            onClick={() => removeProductFromCart(cartProduct.product._id)}
            className="btn btn-outline-danger flex-grow-0 "
          >
            Remove
          </button>
          <div className="d-flex align-items-center justify-content-end   ">
            <button
              onClick={() => {
                updateCartProductCount(cartProduct.product._id, count - 1);
                setCount(count - 1);
              }}
              className="btn bg-main text-white mx-2"
            >
              -
            </button>
            <span>{count}</span>
            <button
              onClick={() => {
                updateCartProductCount(cartProduct.product._id, count + 1);
                setCount(count + 1);
              }}
              className="btn bg-main text-white mx-2"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
