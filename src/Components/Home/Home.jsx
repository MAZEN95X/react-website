import axios from "axios";
import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import img1 from "../../Assets/images/grocery-banner.png";
import img2 from "../../Assets/images/grocery-banner-2.jpeg";
import img3 from "../../Assets/images/1.jpg";
import img4 from "../../Assets/images/2.jpg";
import { Helmet } from "react-helmet";
import Pagination from "react-js-pagination";

import { useQuery } from "react-query";

export default function Home() {
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // const [results, setResult] = useState(1);
  // const [metadata, setMetadata] = useState({});
  // const [products, setProducts] = useState([]);

  function getAllProducts(pageNumber) {
    return axios.get(
      "https://route-ecommerce.onrender.com/api/v1/products?page=" + pageNumber
    );
    // setProducts(data.data);
    // setMetadata(data.metadata);
    // setResult(data.results);
  }
  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
    getAllProducts(pageNumber);
  }
  const { data } = useQuery("home", getAllProducts, {
    cacheTime: 100000,
    refetchInterval: 10000,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
  console.log(data?.data);
  return (
    <>
      {isLoading ? (
        <>
          <div className="loading position-fixed top-0 end-0 start-0 bottom-0 d-flex justify-content-center align-items-center bg-white ">
            <span className="loader"></span>
          </div>
        </>
      ) : (
        <>
          <Helmet>
            <title>Fresh Cart | Home</title>
          </Helmet>
          <div className="home">
            <div className="row g-0">
              <div className="col-md-10">
                <div id="carouselExampleIndicators" className="carousel slide">
                  <div className="carousel-indicators">
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="0"
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to="1"
                      aria-label="Slide 2"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={img1} className=" w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src={img2} className=" w-100" alt="..." />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <img src={img3} className="w-100" alt="" />
                <img src={img4} className="w-100" alt="" />
              </div>
            </div>
          </div>
          <CategoriesSlider />
          <div className="row">
            {data?.data.data.map((product) => {
              return (
                <div key={product.id} className="col-md-3">
                  <Product product={product} />
                </div>
              );
            })}
          </div>
          <div>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={40}
              totalItemsCount={56}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}
