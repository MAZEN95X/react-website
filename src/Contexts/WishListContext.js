import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const wishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState({});
  async function getLoggedInWishList() {
    try {
      const { data } = await axios.get(
        "https://route-ecommerce.onrender.com/api/v1/wishlist",
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      setWishList(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getLoggedInWishList();
  }, []);

  return (
    <wishListContext.Provider value={{ wishList, setWishList }}>
      {children}
    </wishListContext.Provider>
  );
}
