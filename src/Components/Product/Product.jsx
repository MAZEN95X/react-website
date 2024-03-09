import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { cartContext } from "../../Contexts/CartContext";
import Cookies from "js-cookie";
import { wishListContext } from "../../Contexts/WishListContext";

function Product({ product }) {
  const { setCart } = useContext(cartContext);
  const { set } = useContext(wishListContext);
  async function addProductToCart(productId) {
    const { data } = await axios.post(
      "https://route-ecommerce.onrender.com/api/v1/cart",
      {
        productId,
      },
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );
    setCart(data);

    toast.success(data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  async function addToWishList(e, productId) {
    const { data } = await axios.post(
      "https://route-ecommerce.onrender.com/api/v1/wishlist",
      {
        productId,
      },
      {
        headers: {
          token: Cookies.get("token"),
        },
      }
    );

    e.target.classList.replace("fa-regular", "fa-solid");

    toast.success(data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className="product overflow-hidden px-2 py-3 cursor-pointer position-relative">
      <Link to={"/productDetails/" + product.id} className="a">
        <img className="w-100" src={product.imageCover} alt="" />
        <h5 className="font-sm text-main">{product.category.name}</h5>
        <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
        <p className="d-flex justify-content-between">
          <span>{product.price} EGP</span>
          <span>
            <i className="fas fa-star rating-color me-1"></i>
            {product.ratingsAverage}
          </span>
        </p>
      </Link>
      <i
        onClick={(e) => addToWishList(e, product.id)}
        className="fa-regular fa-heart fa-2x position-absolute top-0 end-0 m-3 text-danger"
      ></i>
      <button
        onClick={() => addProductToCart(product.id)}
        className="btn bg-main text-white w-100 "
      >
        +Add To Cart
      </button>
    </div>
  );
}

export default Product;
