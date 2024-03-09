import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import WishListProduct from "../WishListProduct/WishListProduct";
import { wishListContext } from "../../Contexts/WishListContext";
import { cartContext } from "../../Contexts/CartContext";
export default function WishList() {
  const [wishList, setWishList] = useState({});
  const [wishListId, setWishListId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCart: contextSetCart } = useContext(cartContext);
  const { setWishList: contextSetWishList } = useContext(wishListContext);
  async function getLoggedInWishList() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/wishlist",
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      setIsLoading(false);
      setWishListId(data.data._id);

      setWishList(data);
    } catch (error) {
      console.log(error);
    }
  }
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
    contextSetCart(data);

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
  function removeProductFromWishList(productId) {
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
            "https://route-ecommerce.onrender.com/api/v1/wishlist/" + productId,
            {
              headers: {
                token: Cookies.get("token"),
              },
            }
          );

          contextSetWishList(data);
          setWishList(data);
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
    getLoggedInWishList();
  }, []);
  return (
    <>
      <Helmet>
        <title>Fresh Cart | WishList</title>
      </Helmet>
      {isLoading ? (
        <>
          <div className="loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center bg-white ">
            <span className="loader"></span>
          </div>
        </>
      ) : (
        <>
          {wishList.data?.length > 0 ? (
            <div className="container">
              <div className="my-5">
                {wishList.data?.map((wishlistProduct, index) => {
                  return (
                    <WishListProduct
                      removeProductFromWishList={removeProductFromWishList}
                      key={index}
                      wishlistProduct={wishlistProduct}
                      addProductToCart={addProductToCart}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="container">
              <h2 className="alert alert-warning text-center my-5">
                No items in your WishList
              </h2>
            </div>
          )}
        </>
      )}
    </>
  );
}
