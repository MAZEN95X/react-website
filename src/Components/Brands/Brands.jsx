import axios from "axios";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
export default function Brands() {
  function getAllBrand() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/brands");
  }
  const { data } = useQuery("brand", getAllBrand, {
    cacheTime: 100000,
    refetchInterval: 10000,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Helmet>
        <title>Fresh Cart | Brands</title>
      </Helmet>
      <div className="row g-3">
        <h2 className="fw-bolder text-center text-success brands">
          All Brands
        </h2>
        {data?.data.data.map((brand) => {
          return (
            <>
              <div key={brand._id} className="col-md-3">
                <div
                  className="card"
                  data-bs-toggle="modal"
                  data-bs-target={"#" + brand._id}
                >
                  <div className="card-image">
                    <img src={brand.image} className="w-100" alt="Brand" />
                  </div>
                  <div className="card-text text-center">
                    <p>{brand.name}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
        {data?.data.data.map((brand) => {
          return (
            <>
              <div
                className="modal fade"
                id={brand._id}
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div
                      style={{ height: 300 }}
                      className="modal-body d-flex justify-content-center align-items-center"
                    >
                      <h1
                        style={{ fontSize: 56 }}
                        className="text-center fw-bolder text-success  "
                      >
                        {brand.name}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
