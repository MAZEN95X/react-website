import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
function Address() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { cardId } = useParams();

  const validationSchema = Yup.object({
    details: Yup.string().required("details is required"),
    city: Yup.string().required("city is required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter valid Egyptian phone number"),
  });
  async function onSubmit() {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const { data } = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cardId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: Cookies.get("token"),
          },
          params: {
            url: "http://localhost:3000",
          },
        }
      );
      console.log(data);
      window.open(data.session.url, "_self");
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
    setIsLoading(false);
  }
  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <Helmet>
        <title>Fresh Cart | Address</title>
      </Helmet>
      <div className="m-auto w-75 my-5 ">
        <h1>Addrees :</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="details" className="my-1">
            Details:
          </label>
          <input
            value={values.details}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            className="form-control mb-3"
            id="details"
            name="details"
          />
          {errors.details && touched.details && (
            <p className="alert alert-danger ">{errors.details}</p>
          )}
          <label htmlFor="phone" className="my-1">
            Phone:
          </label>
          <input
            value={values.phone}
            onBlur={handleBlur}
            onChange={handleChange}
            type="tel"
            className="form-control mb-3"
            id="phone"
            name="phone"
          />
          {errors.phone && touched.phone && (
            <p className="alert alert-danger ">{errors.phone}</p>
          )}
          <label htmlFor="city" className="my-1">
            City:
          </label>
          <input
            value={values.city}
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            className="form-control mb-3"
            id="city"
            name="city"
          />
          {errors.city && touched.city && (
            <p className="alert alert-danger ">{errors.city}</p>
          )}
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {isLoading ? (
            <button
              disabled
              type="button"
              className="btn bg-main px-4 text-white ms-auto d-block "
            >
              {" "}
              <i className="fas fa-spin fa-spinner px-3"></i>{" "}
            </button>
          ) : (
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="btn bg-main px-3 text-white ms-auto d-block"
            >
              CheckOut
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Address;
