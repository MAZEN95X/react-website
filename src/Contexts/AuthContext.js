import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(!!Cookies.get("token"));

  return (
    <authContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn }}>
      {children}
    </authContext.Provider>
  );
}
