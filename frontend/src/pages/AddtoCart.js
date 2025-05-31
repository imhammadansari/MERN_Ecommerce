import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import { MdDelete } from "react-icons/md";
import Footer from '../Components/Footer';

function AddtoCart() {
  const [cartProducts, setcartProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedProducts, setsavedProducts] = useState([]);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const getCartProducts = async () => {
    try {
      const response = await axios.get("https://mern-ecommerce-website.up.railway.app/addtoCart");
      const user = response.data.user;

      setcartProducts(user.cart || []);
      setQuantities(user.cart.map(() => 1));
    } catch (error) {
      console.error("Error fetching cart products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSavedProducts = async () => {
    try {
        const response = await axios.get(`https://mern-ecommerce-website.up.railway.app/shop`);
        const bestSellerProducts = response.data.product.slice(19, 25);
            setsavedProducts(bestSellerProducts);
    } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data : error.message);
    }
};

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    getSavedProducts();
  }, []);

  const increaseQuantity = (index) => {
    setQuantities(prevQuantities =>
      prevQuantities.map((quantity, i) => (i === index ? quantity + 1 : quantity))
    );
  };

  const decreaseQuantity = (index) => {
    setQuantities(prevQuantities =>
      prevQuantities.map((quantity, i) => (i === index && quantity > 1 ? quantity - 1 : quantity))
    );
  };

  const checkOut = () => {
    const totalPrice = cartProducts.reduce((total, item, index) => {
      return total + ((quantities[index] || 0) * item.price);
    }, 0);

    navigate("/checkout", {
      state: {
        cartProducts,
        quantities,
        totalPrice
      }
    });
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`https://mern-ecommerce-website.up.railway.app/removeFromCart/${productId}`);
      if (response.status === 200) {
        setcartProducts((prevCart) => prevCart.filter((item) => item._id !== productId));
        setQuantities((prevQuantities, index) =>
          prevQuantities.filter((_, i) => cartProducts[i]._id !== productId));
        console.log("Product removed from cart");
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };


  const totalQuantity = (quantities || []).reduce((total, quantity) => total + quantity, 0);
  const totalPrice = (cartProducts || []).reduce((total, item, index) => {
    return total + ((quantities[index] || 0) * item.price);
  }, 0);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <>
      <Header />
      <div className="w-full flex flex-col lg:flex-row gap-2 bg-slate-200 px-4 lg:px-20 py-4">

        <div className='flex flex-col'>
          {cartProducts.length === 0 ? (
            <p className="text-center mt-4">Your cart is empty</p>
          ) : (
            cartProducts.map((item, index) => {
              const base64Image = Buffer.from(item.image).toString('base64');
              const individualPrice = item.price * quantities[index];

              return (
                <div className="flex lg:w-[56rem] flex-col lg:flex-row bg-white px-4 py-4 items-center lg:justify-between" key={item._id}>

                  <div className='flex items-center lg:item gap-4 lg:gap-8'>
                    <img className="w-32 h-24 mt-8 lg:mt-0 lg:w-24 lg:h-24" src={`data:image/jpeg;base64,${base64Image}`} alt={item.name} />

                    <div className='flex flex-col gap-2'>
                      <p className="text-xs mt-3 text-start lg:mt-0 lg:text-base lg:w-[25rem]">{item.name}</p>

                      <div className='flex gap-2'>
                        <button onClick={() => deleteProduct(item._id)} className='border border-black border-opacity-25 font-bold text-red-600 w-20 h-7 text-sm'>Remove</button>
                        <button className='border border-black border-opacity-25 text-blue-700 w-28 h-7 text-sm'>Save for later</button>

                      </div>

                    </div>


                  </div>

                  <div className='hidden lg:flex flex-col items-end justify-start'>
                    <p className="text-lg">{`Rs. ${individualPrice.toFixed(2)}`}</p>

                    <div className="flex gap-4">
                      <button className='text-gray-500' onClick={() => decreaseQuantity(index)}>-</button>
                      <p className='font-bold'>{quantities[index]}</p>
                      <button className='text-gray-500' onClick={() => increaseQuantity(index)}>+</button>

                    </div>
                  </div>

                  <div className='flex w-full justify-between mt-3 lg:hidden'>

                    <div className="flex">
                      <button className='text-gray-500 border border-black border-opacity-25 px-2' onClick={() => decreaseQuantity(index)}>-</button>
                      <p className='font-bold border-t border-b border-black border-opacity-25 px-4'>{quantities[index]}</p>
                      <button className='text-gray-500 border border-black border-opacity-25 px-2' onClick={() => increaseQuantity(index)}>+</button>

                    </div>
                    <p className="text-base">{`Rs. ${individualPrice.toFixed(2)}`}</p>
                  </div>

                </div>

              );
            })
          )}

          <div className='hidden lg:flex w-full bg-white border-t border-black border-opacity-25 p-2 justify-between'>

            <button className='bg-blue-700 text-white py-2 px-4 text-sm'>Back to shop</button>
            <button className='bg-white border-black border border-opacity-25 text-blue-700 text-sm py-2 px-3'>Remove All</button>

          </div>

          <div className='w-full hidden lg:flex gap-16 pt-6 pb-4'>

            <div className='flex gap-2'>
              
              <div className='bg-black bg-opacity-40 flex items-center rounded-full p-2'>
                <img className='w-7' src='lock.png' />
              </div>

              <div className='flex flex-col text-start'>
                <h1>Secure Payment</h1>
                <p className='text-sm text-black text-opacity-70'>Your Payments are fully protected</p>
              </div>

            </div>

            <div className='flex gap-2'>
              
              <div className='bg-black bg-opacity-40 flex items-center rounded-full p-2'>
                <img className='w-7' src='comment.png' />
              </div>

              <div className='flex flex-col text-start'>
                <h1>Customer Support</h1>
                <p className='text-sm text-black text-opacity-70'>We are here to help anytime.</p>
              </div>

            </div>

            <div className='flex gap-2'>
              
              <div className='bg-black bg-opacity-40 flex items-center rounded-full p-2'>
                <img className='w-8' src='free-delivery.png' />
              </div>

              <div className='flex flex-col text-start'>
                <h1>Free Delivery</h1>
                <p className='text-sm text-black text-opacity-70'>No delivery charges, Always free!</p>
              </div>

            </div>
          </div>



        </div>

        <div className='flex flex-col gap-2'>

          <div className="flex text-start py-2 flex-col bg-white px-4 border-t">
            <h1>Have a coupon?</h1>
            <div className='flex py-1'>
              <input className='rounded-l p-1 w-44 text-sm border border-black border-opacity-25' type='text' placeholder='Add Coupon' />
              <button className='px-4 h-9 text-sm text-blue-700 rounded-r border border-black border-opacity-25'>Apply</button>

            </div>

          </div>



          <div className='bg-white flex flex-col px-4 py-2'>

            <div className="flex justify-between">
              <div className="flex flex-col text-start gap-2">
                <h1 className="text-base lg:text-sm ">Total Products:</h1>
                <h1 className="text-base lg:text-sm ">Total Quantity:</h1>
                <h1 className="text-base lg:text-sm ">Subtotal:</h1>
              </div>

              <div className="flex flex-col text-end gap-2">
                <h1 className="text-base lg:text-sm">{cartProducts.length}</h1>
                <h1 className="text-base lg:text-sm">{totalQuantity}</h1>
                <h1 className="text-base lg:text-sm">Rs. {totalPrice.toFixed(2)}</h1>
              </div>
            </div>

            <button className="w-full py-2 rounded bg-green-600 text-white text-sm hover:bg-white hover:text-green-600 my-4" onClick={checkOut}>
              Check Out
            </button>

          </div>

        </div>
      </div>

      <div className='w-full flex px-4 lg:px-20 bg-slate-200 flex-col'>
          <h1 className='text-start w-full bg-white p-2 font-bold'>Saved for later</h1>
                          <div className='flex flex-col lg:flex-row gap-6 bg-white'>
          
                              {savedProducts?.map((item) => {
                                  const base64Image = Buffer.from(item.image).toString('base64');
                                  return (
                                      <div key={item._id} className='flex lg:flex-col lg:w-[15rem] gap-8 lg:gap-0 items-start bg-white px-4 lg:px-2 py-2'>
          
                                          <img
                                              className="w-28 h-28 object-contain"
                                              src={`data:image/jpeg;base64,${base64Image}`}
                                              alt={item.name}
                                          />
          
                                          <Link className='mt-2' to={`/items/${item._id}`}>
                                              <p className="flex text-start text-xs text-gray-700 py-2">Rs. {item.price}</p>
                                              <p className="text-xs text-start w-[10rem]">{item.name}</p>
                                              {/* 8B96A5 */}
          
                                          </Link>

                                          <div className='hidden lg:flex items-start justify-start mt-2'>
                                          <button className='text-blue-700 py-1 px-2 rounded-sm text-xs border border-black border-opacity-25'>Move to cart</button>

                                          </div>
          
                                      </div>
                                  )
                              })}
          
          
                          </div>
        </div>

        <div className='w-full bg-slate-200 px-4 lg:px-20 py-2'>
                <div className='w-full px-4 mb-8 rounded h-[6rem] items-center flex justify-between' style={{ backgroundImage: 'url("/discount-banner.png")' }}>

                    <div className='flex flex-col w-60 lg:w-[30rem] text-start text-white'>
                        <h1 className='font-bold text-sm lg:text-lg'>Super discount on more than Rs. 5,000</h1>
                        <p className='text-xs lg:text-sm'>Have you ever experienced an Huge Offer? Here we are offering you a biggest discount.</p>
                    </div>

                    <div>
                        <button className='w-20 h-8 lg:w-24 lg:h-9 text-sm lg:text-base bg-orange-600 text-white rounded'>Shop Now</button>

                    </div>

                </div>

            </div>
            
            <Footer />
    </>
  );
}

export default AddtoCart;
