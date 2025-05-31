import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import Header from '../Components/Header';
import { Link, useNavigate } from 'react-router-dom';

function AllProductsForAdmin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await axios.get('https://mern-ecommerce-website.up.railway.app/shop');
      setProducts(response.data.product);
      console.log(response.data.product);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`https://mern-ecommerce-website.up.railway.app/products/deleteproduct/${productId}`);
      console.log(response.data.message);
      if(response.status === 200){
        alert("Product Deleted Successfully");
      }
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <div className='flex flex-col'>
        <h1 className="text-start font-bold bg-white w-full p-2 mx-1 rounded-sm border border-black border-opacity-15">All Products</h1>
        <div className="flex flex-wrap items-center justify-center py-4 gap-4">
          {products?.map((item) => {

            const base64Image = item.image ? `data:image/jpeg;base64,${Buffer.from(item.image).toString('base64')}` : null;
            return (
              <div className="flex flex-col bg-white w-[18.7rem]" key={item._id}>
                <div className='bg-white mb-2 md:mb-0 flex justify-center'>
                  {base64Image && (
                    <img
                      className="object-contain"
                      src={base64Image}
                      alt={item.name}
                    />
                  )}
                </div>
                <Link to={`/items/${item._id}`}>
                  <p className="flex w-full text-center lg:text-start text-lg font-bold">Rs. {item.price}</p>
                  <p className="mt-1 w-full lg:w-64 text-sm text-center lg:text-start">{item.name}</p>
                </Link>

                <div className='flex justify-center lg:justify-normal py-2 lg:py-4 gap-4'>
                  <button 
                    onClick={() => navigate(`/editproducts/${item._id}`)} 
                    className='w-28 h-8 bg-blue-500 text-white'>
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteProduct(item._id)} 
                    className='w-28 h-8 bg-red-500 text-white'>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AllProductsForAdmin;
