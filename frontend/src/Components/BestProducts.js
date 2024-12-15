import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const BestProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/shop`);
      // Filter only products where bestseller is true
      const bestSellerProducts = response.data.product.filter(product => product.bestseller === true);
      setProducts(bestSellerProducts);
    } catch (error) {
      console.error("Error fetching products:", error.response ? error.response.data : error.message);
    }
  };
  

  useEffect(() => {
    getProducts();
  }, []);


  return (
    <>
      <h1 className="text-center md:mb-10 text-lg md:text-xl lg:text-3xl font-bold">Best Seller</h1>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-center px-6 py-4 gap-8 w-full">
        {products?.map((item) => {
  const base64Image = Buffer.from(item.image).toString('base64');
  return (
    <div className="flex flex-col items-center w-[18.7rem]" key={item._id}>
      <div className="bg-white flex justify-center items-center">
        <img
          className="w-56 h-56 object-contain" // Adjusted size
          src={`data:image/jpeg;base64,${base64Image}`}
          alt={item.name}
        />
      </div>
      <Link to={`/items/${item._id}`}>
        <p className="mt-4 w-56 text-sm text-start">{item.name}</p>
        <p className="mt-1 w-56 text-sm text-start text-gray-500">{item.brand}</p>
        <p className="mt-2 flex text-start text-lg text-red-600">Rs. {item.price}</p>
        <p className="mt-1 w-56 text-sm text-start text-gray-500">Buy it Now</p>
        <p className="mt-1 w-56 text-sm text-start text-gray-500">Free Returns</p>
      </Link>
    </div>
  );
})}

        </div>
      </div>
    </>
  );
};

export default BestProducts;
