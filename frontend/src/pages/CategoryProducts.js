import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const addtoCart = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:8080/addtoCart/${productId}`);
      console.log("Product added to cart:", response);
      setCartProducts(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error.response ? error.response.data : error.message);
      if (error.response.data === "You need to login first") {
        alert("You need to login first");
      }
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/category/${category}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, [category]);

  const getDynamicStyles = (category) => {
    switch (category) {
      case "mens-fashion":
        return "w-72 h-80";
      case "kitchen":
        return "w-64 h-64";
      default:
        return "w-64 h-64"; 
    }
  };

  return (
    <>
      <Header />
      <h1 className="text-center md:text-2xl font-bold md:my-4">{category}</h1>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-center px-6 py-4 gap-8 w-full">
          {products?.map((item) => {
            const base64Image = Buffer.from(item.image).toString('base64');
            return (
              <div className="flex flex-col items-center w-[18.7rem]" key={item._id}>
                <div className={`${getDynamicStyles(category)} bg-white mb-2 md:mb-0 flex justify-center items-center`}>
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={`data:image/jpeg;base64,${base64Image}`}
                    alt={item.name}
                  />
                </div>
                <Link to={`/items/${item._id}`}>
                  <p className="mt-1 md:mt-4 w-64 text-sm text-start">{item.name}</p>
                  <p className="mt-1 w-64 text-sm text-start text-gray-500">{item.brand}</p>
                  <p className="mt-2 flex text-start text-lg text-red-600">Rs. {item.price}</p>
                  <p className="mt-1 w-64 text-sm text-start text-gray-500">Buy it Now</p>
                  <p className="mt-1 w-64 text-sm text-start text-gray-500">Free Returns</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryProducts;
