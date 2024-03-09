import { Splide, SplideSlide } from "@splidejs/react-splide";
import axios from "axios";
import "@splidejs/react-splide/css/sea-green";
import React, { useEffect, useState } from "react";
export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  async function getAllCategories() {
    const { data } = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/categories"
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Splide
        options={{
          rewind: true,
          gap: "10px",
          perMove: 5,
          perPage: 5,
        }}
      >
        {categories.map((category) => (
          <SplideSlide
            className="d-flex justify-content-center align-items-center"
            key={category._id}
          >
            <img src={category.image} className="w-100 h-50" alt="" />
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
}
