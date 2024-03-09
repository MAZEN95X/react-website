import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CartProduct from "../CartProduct/CartProduct";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { cartContext } from "../../Contexts/CartContext";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";

export default function Cart() {
  const [cart, setCart] = useState({});
  const [timeOutId, setTimeOutId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState("");
  const { setCart: contextSetCart } = useContext(cartContext);

  async function getLoggedInCartProducts() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      setIsLoading(false);
      setCartId(data.data._id);
      console.log(data.data);
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  }

  function removeProductFromCart(productId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(
            "https://route-ecommerce.onrender.com/api/v1/cart/" + productId,
            {
              headers: {
                token: Cookies.get("token"),
              },
            }
          );
          contextSetCart(data);
          setCart(data);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  }
  function clearCart() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await axios.delete(
            "https://route-ecommerce.onrender.com/api/v1/cart",
            {
              headers: {
                token: Cookies.get("token"),
              },
            }
          );
          contextSetCart(data);
          setCart(data);
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  }

  useEffect(() => {
    getLoggedInCartProducts();
  }, []);

  function updateCartProductCount(productId, count) {
    clearTimeout(timeOutId);

    setTimeOutId(
      setTimeout(async () => {
        if (count === 0) {
          removeProductFromCart(productId);
        } else {
          const { data } = await axios.put(
            "https://route-ecommerce.onrender.com/api/v1/cart/" + productId,
            {
              count,
            },
            {
              headers: {
                token: Cookies.get("token"),
              },
            }
          );

          setCart(data);
        }
      }, 500)
    );
  }

  return (
    <>
      <Helmet>
        <title>Fresh Cart | Cart</title>
      </Helmet>
      {isLoading ? (
        <>
          <div className="loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center bg-white ">
            <span className="loader"></span>
          </div>
        </>
      ) : (
        <>
          {cart.data?.products.length < 0 ? (
            <h2 className="alert alert-warning text-center  my-5">
              No products in your cart
            </h2>
          ) : (
            <div className="my-5">
              <button
                onClick={clearCart}
                className="btn btn-outline-danger d-block ms-auto"
              >
                Clear Cart
              </button>

              {cart.data?.products.map((cartProduct, index) => {
                return (
                  <CartProduct
                    updateCartProductCount={updateCartProductCount}
                    removeProductFromCart={removeProductFromCart}
                    key={index}
                    cartProduct={cartProduct}
                  />
                );
              })}

              <div className="d-flex justify-content-between">
                <Link
                  to={"/address/" + cartId}
                  className="btn bg-main text-white"
                >
                  CheckOut
                </Link>
                <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
