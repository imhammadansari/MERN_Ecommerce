import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';

const BestProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const getProducts = async () => {
    try {
      const response = await axios.get(`https://mern-ecommerce-rnup.onrender.com/shop`);
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
      <div className="w-full bg-slate-200 px-4 lg:px-20 py-2 lg:py-4">
      <h1 className="text-start md:mb-4 text-base md:text-xl lg:text-xl font-bold">Recommended Items</h1>
        <div className="flex flex-wrap gap-2 lg:gap-8 w-full">
        {products?.map((item) => {
  const base64Image = Buffer.from(item.image).toString('base64');
  return (
    <div className="flex flex-col items-center bg-white w-[11rem] lg:w-[13.15rem]" key={item._id}>
      <div className="bg-white flex justify-center px-2 py-4 items-center">
        <img
          className="w-28 h-28 object-contain"
          src={`data:image/jpeg;base64,${base64Image}`}
          alt={item.name}
        />
      </div>
      <Link className='px-2 py-2' to={`/items/${item._id}`}>
        <p className="mt-2 flex text-start text-base">${item.price}</p>
        <p className="mt-1 lg:w-44 text-xs text-start">{item.name}</p> 
        {/* 8B96A5 */}

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
