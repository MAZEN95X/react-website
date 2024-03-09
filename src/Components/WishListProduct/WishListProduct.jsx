import React from "react";
import Product from "../Product/Product";
import { Link } from "react-router-dom";
export default function WishListProduct({
  wishlistProduct,
  removeProductFromWishList,
  addProductToCart,
}) {
  console.log(wishlistProduct._id);
  return (
    <>
      <div className="cart-product shadow rounded-2 my-3">
        <div className="row align-items-center">
          <div className="col-md-2">
            <Link to={"/productDetails/" + wishlistProduct.id} className="a">
              <img className="w-100" src={wishlistProduct.imageCover} alt="" />
            </Link>
          </div>
          <div className="col-md-8">
            <h2>{wishlistProduct.title}</h2>
            <h5>{wishlistProduct.category?.name}</h5>
            <p className="d-flex justify-content-between">
              <span>{wishlistProduct.price} EGP</span>
              <span>
                <i className=" fas fa-star rating-color me-1"></i>{" "}
                {wishlistProduct.ratingsAverage}
              </span>
            </p>
          </div>
          <div className="col-md-2 d-flex align-items-center flex-column gap-2  ">
            <button
              onClick={() => addProductToCart(wishlistProduct._id)}
              className="btn btn-outline-success flex-grow-0 "
            >
              Add To Cart
            </button>
            <button
              onClick={() => removeProductFromWishList(wishlistProduct._id)}
              className="btn btn-outline-danger flex-grow-0 "
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
