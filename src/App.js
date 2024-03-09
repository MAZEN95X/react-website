import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
// eslint-disable-next-line no-unused-vars
import Footer from "./Components/Footer/Footer";
// eslint-disable-next-line no-unused-vars
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Orders from "./Components/Orders/Orders";
import Address from "./Components/Address/Address";
import NotFound from "./Components/NotFound/NotFound";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthProtectedRoute from "./Components/ProtectedRoute/AuthProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import WishList from "./Components/WishList/WishList";
import { ToastContainer } from "react-toastify";
import CartContextProvider from "./Contexts/CartContext";
import { QueryClient, QueryClientProvider } from "react-query";
import WishListContextProvider from "./Contexts/WishListContext";

function App() {
  const queryclient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Navigate to={"home"} /> },
        {
          path: "register",
          element: (
            <AuthProtectedRoute>
              {" "}
              <Register />{" "}
            </AuthProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtectedRoute>
              {" "}
              <Login />{" "}
            </AuthProtectedRoute>
          ),
        },

        {
          path: "home",
          element: (
            <ProtectedRoute>
              {" "}
              <Home />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              {" "}
              <Products />{" "}
            </ProtectedRoute>
          ),
        },

        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brands />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute>
              <Orders />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "address/:cardId",
          element: (
            <ProtectedRoute>
              {" "}
              <Address />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },

        { path: "*", element: <NotFound /> },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              {" "}
              <WishList />{" "}
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "forget",
      element: (
        <AuthProtectedRoute>
          <ForgetPassword />
        </AuthProtectedRoute>
      ),
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryclient}>
        <AuthContextProvider>
          <WishListContextProvider>
            <CartContextProvider>
              <RouterProvider router={router}></RouterProvider>
            </CartContextProvider>
          </WishListContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
// {
//   wishList.data?.products.length > 0 ? (
//     <div className="my-5">
//       {wishList.data?.products.map((wishListProduct, index) => {
//         return (
//           <WishListProduct
//             removeProductFromWishList={removeProductFromWishList}
//             key={index}
//             WishListProduct={wishListProduct}
//           />
//         );
//       })}

//       <div className="d-flex justify-content-between">
//         <Link to={"/address/" + wishListId} className="btn bg-main text-white">
//           CheckOut
//         </Link>
//       </div>
//     </div>
//   ) : (
//     <h2 className="alert alert-warning text-center my-5">
//       No products in your WishList
//     </h2>
//   );
// }
// <div className="my-5">
//   {wishList.data?.products.map((wishListProduct, index) => {
//     return (
//       <WishListProduct
//         removeProductFromWishList={removeProductFromWishList}
//         key={index}
//         WishListProduct={wishListProduct}
//       />
//     );
//   })}

//   <div className="d-flex justify-content-between">
//     <Link to={"/address/" + wishListId} className="btn bg-main text-white">
//       CheckOut
//     </Link>
//   </div>
// </div>;
