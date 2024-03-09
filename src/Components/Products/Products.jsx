import axios from "axios";
import Product from "../Product/Product";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
export default function Products() {
  function getAllProducts() {
    return axios.get("https://route-ecommerce.onrender.com/api/v1/products");
  }
  const { data } = useQuery("products", getAllProducts, {
    cacheTime: 100000,
    refetchInterval: 10000,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Helmet>
        <title>Fresh Cart | Products</title>
      </Helmet>

      <div className="row">
        {data?.data.data.map((product) => {
          return (
            <div key={product.id} className="col-md-3">
              <Product product={product} />
            </div>
          );
        })}
      </div>
    </>
  );
}
