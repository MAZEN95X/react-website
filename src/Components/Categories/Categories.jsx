import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import "./style.css";
export default function Categories() {
  const [isLoading, setIsLoading] = useState(false);

  function getAllCategoreis() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/categories");
  }
  const { data } = useQuery("categories", getAllCategoreis, {
    cacheTime: 100000,
    refetchInterval: 10000,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isLoading ? (
        <>
          <Helmet>
            <title>Fresh Cart | Categories</title>
          </Helmet>
          <div className="d-flex align-items-center justify-content-center my-5 py-5">
            <i className="fas fa-spin fa-spinner fa-2x"></i>
          </div>
        </>
      ) : (
        <>
          <div className="row g-3 mb-4">
            {data?.data.data.map((category) => {
              return (
                <>
                  <div className="col-md-4" key={category._id}>
                    <div className="card">
                      <div className="image">
                        <img
                          style={{ height: "300px" }}
                          src={category.image}
                          className="w-100"
                          alt=""
                        />
                      </div>
                      <div className="product-text text-center fw-bold">
                        <h3 className="text-success my-3 fw-bold">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
