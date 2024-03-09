import axios from "axios";
import "@splidejs/react-splide/css/sea-green";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Helmet } from "react-helmet";

function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function getProductDetails() {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <Helmet>
        <link
          rel="shortcut icon"
          href="../../../public/logo.png"
          type="image/x-icon"
        />
      </Helmet>
      {isLoading ? (
        <div className="loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center bg-white ">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="row align-items-center py-5">
          <div className="col-md-3">
            <Splide options={{ rewind: true, gap: "10px" }}>
              {productDetails.images?.map((img, index) => (
                <SplideSlide key={index}>
                  <img src={img} className="w-100" alt="" />
                </SplideSlide>
              ))}
            </Splide>
          </div>
          <div className="col-md-9">
            <h2 className="mt-2">{productDetails?.title}</h2>
            <h5 className="font-sm text-main mt-2">
              {productDetails?.category?.name}
            </h5>
            <p className="mt-2">{productDetails?.description}</p>
            <p className="d-flex justify-content-between mt-2">
              <span>{productDetails?.price} EGP</span>
              <span>
                <i className="fas fa-star rating-color me-1"></i>
                <span>{productDetails?.ratingsAverage}</span>
              </span>
            </p>
            <button className="btn bg-main text-white w-100 mt-2">
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
