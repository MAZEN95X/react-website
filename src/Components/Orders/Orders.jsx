import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";

function Orders() {
  const [orders, setOrders] = useState([]);

  async function getAllOrders(id) {
    try {
      const { data } = await axios.get(
        `https://route-ecommerce.onrender.com/api/v1/orders/user/` + id
      );
      console.log(data); // Log the data received from the API
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const { id } = jwtDecode(Cookies.get("token"));
    getAllOrders(id);
  }, []);
  return (
    <>
      <Helmet>
        <title>Fresh Cart | Orders</title>
      </Helmet>

      {orders.map((order) => {
        return (
          <div key={order.id} className="row">
            <div className="order shadow rounded p-4 my-5">
              <div className="d-flex align-items-center">
                <h2 className="fw-bolder h1">#{order.id}</h2>
                <h4 className="fw-bold text-primary mx-4">Processing</h4>
              </div>
              <p>You have ordered {order.cartItems.lenght} items.</p>
              <div className="d-flex">
                {order.cartItems.map((item) => {
                  return (
                    <img
                      key={item._id}
                      src={item.product.imageCover}
                      style={{ width: 150 }}
                      alt=""
                    />
                  );
                })}
              </div>
              <hr />
              <p>
                <strong>Total amount</strong>
                {order.totalOrderPrice} EGP
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Orders;
