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
      const response = await axios.post(`https://mern-ecommerce-website.up.railway.app/addtoCart/${productId}`);
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
      const response = await axios.get(`https://mern-ecommerce-website.up.railway.app/products/category/${category}`);
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
      <div className='w-full bg-slate-200 px-20 py-4'>
      <div className="w-full flex">

       <div className='flex flex-col'>
         {/* Category Section */}
         <div className='flex flex-col w-[15rem] border-t border-black'>
      
          <h1 className='font-bold text-start'>Category</h1>

          <div className='text-start py-2'>
            <p>Kitchen Accessory</p>
            <p>Men's Fashion</p>
            <p>Electronic</p>
            <p>Women's Fashion</p>
          </div>

        </div>

        {/* Brand Section */}
        <div className='flex flex-col w-[15rem] mt-4 border-t border-black'>
          <h1 className='font-bold text-start'>Brands</h1>

          <div className='text-start py-2'>
            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Samsung</p>
            </div>

            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Apple</p>
            </div>

            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Huawei</p>
            </div>

            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Pocco</p>
            </div>

            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Lenovo</p>
            </div>

          </div>

        </div>

        {/* Features Section */}
        <div className='flex flex-col w-[15rem] mt-4 border-t border-black'>
          <h1 className='font-bold text-start'>Features</h1>

          <div className='text-start py-2'>
            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Metallic</p>
            </div>

            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Plastic</p>
            </div>

            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>High Quality</p>
            </div>

            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Super Power</p>
            </div>

          </div>

        </div>

        {/* Price Range */}
        <div className='flex flex-col w-[15rem] mt-4 border-t border-black'>
          <h1 className='font-bold text-start'>Price Range</h1>
          <input className='py-2' type='range' />
          <div className='flex gap-4'>

            <div className='flex flex-col items-start'>
              <p>Min</p>
              <input type='text' placeholder='0' className='w-28 p-1 border border-opacity-25 border-black rounded' />
            </div>

            <div className='flex flex-col items-start'>
              <p>Max</p>
              <input type='text' placeholder='999999' className='w-28 p-1 rounded border border-opacity-25 border-black' />
            </div>

          </div>
          <button className='w-full mt-2 border border-opacity-25 border-black bg-white rounded text-blue-700 h-8'>Apply</button>

        </div>

        {/* Condtion Section */}
        <div className='flex flex-col w-[15rem] mt-4 border-t border-black'>
          <h1 className='font-bold text-start'>Condition</h1>

          <div className='text-start py-2'>
            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Any</p>
            </div>

            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Refurbished</p>
            </div>

            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Brand New</p>
            </div>

            <div className='flex'>
              <input type='checkbox' />
              <p className='px-1'>Old Items</p>
            </div>

          </div>

        </div>

        {/* Rating Section */}
        <div className='flex flex-col w-[15rem] mt-4 border-t border-black'>
          <h1 className='font-bold text-start'>Ratings</h1>

          <div className='text-start py-2'>
            <div className='flex'>
              <input type='checkbox' />
              <img className='w-24 px-2' src='/rating5.png' />
            </div>

            <div className='flex mt-2'>
              <input type='checkbox' />
              <img className='w-24 px-2' src='/rating4.png' />
            </div>

            <div className='flex mt-2'>
              <input type='checkbox' />
              <img className='w-24 px-2' src='/rating3.png' />
            </div>

            <div className='flex mt-2'>
              <input type='checkbox' />
              <img className='w-24 px-2' src='/rating2.png' />
            </div>

          </div>

        </div>

       </div>

        <div className='flex flex-col'>

        <h1 className="text-start font-bold bg-white w-full p-2 mx-1 rounded-sm border border-black border-opacity-15">{category}</h1>
        <div className="flex flex-wrap items-center justify-center pl-3 py-4 gap-4">
          {products?.map((item) => {
            const base64Image = Buffer.from(item.image).toString('base64');
            return (
              <div className="flex flex-col items-center bg-white w-[18.7rem] h-[25rem]" key={item._id}>
                <div className={`${getDynamicStyles(category)} bg-white mb-2 md:mb-0 flex justify-center`}>
                  <img
                    className="w-[10rem] max-h-full object-contain"
                    src={`data:image/jpeg;base64,${base64Image}`}
                    alt={item.name}
                  />
                </div>
                <Link to={`/items/${item._id}`}>
                  <p className="flex text-start text-lg font-bold">Rs. {item.price}</p>
                  <div className='flex gap-2 items-center'>
                  {item.reviews.length === 0 ? (
                                    <img className='w-20' src='/rating0.png' />
                                ): (
                                    <img className='w-20' src='/rating.png' />
                                )}
                    <p>{item.reviews.length}</p>
                  </div>
                  <p className="mt-1 w-64 text-sm text-start">{item.name}</p>

                </Link>
              </div>
            );
          })}
        </div>

        </div>
      </div>

      </div>
      <Footer />
    </>
  );
};

export default CategoryProducts;
