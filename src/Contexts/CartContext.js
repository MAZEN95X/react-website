import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState({});
  async function getLoggedInCartProducts() {
    try {
      const { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/cart",
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getLoggedInCartProducts();
  }, []);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
}
