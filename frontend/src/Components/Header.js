import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MobileNavbar from "./MobileNavbar";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileNavbar, setShowMobileNavbar] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("https://mern-ecommerce-website.up.railway.app/users/check-login");
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("https://mern-ecommerce-website.up.railway.app/users/logout");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleCategorySelect = (category) => {
    navigate(`/products/${category}`);
  };

  const toggleMobileNavbar = () => {
    setShowMobileNavbar((prev) => !prev); 
  };

  return (
    <div className="w-full">

      <div className="w-full border-gray-300 lg:px-20 border-b">
        <div className="flex items-center justify-between pl-4 py-4 lg:hidden">
          <div className="flex items-center gap-4">
            <LazyLoadImage loading='lazy' effect='blur'
              className="w-6 cursor-pointer"
              src="/category.png"
              alt="Menu"
              onClick={toggleMobileNavbar}
            />
            <Link to="/" className="text-lg text-black">
              Logo.
            </Link>
          </div>

          <div className="flex px-4 items-center gap-4">
            <LazyLoadImage loading='lazy' effect='blur' className="w-6" src="/user.png" alt="User" />
            <Link to="/cart">
            <LazyLoadImage loading='lazy' effect='blur' className="w-6" src="/shopping-cart.png" alt="cart" />
            </Link>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-between pl-4 md:pl-0 py-4 text-lg lg:text-xl xl:text-xl">
          <h1 className="md:text-xl lg:text-2xl xl:text-2xl text-black">
            <Link to="/">Logo.</Link>
          </h1>

          <form className="ml-1 hidden lg:flex justify-center items-center">
            <input
              className="border-t border-l border-b border-black rounded-l p-1 w-[25rem]"
              type="text"
              name="search"
              placeholder="Search"
            />
            <select
              onChange={(e) => handleCategorySelect(e.target.value)}
              className="bg-none border-l border-t border-b text-sm text-center items-center border-black w-20 lg:w-32 xl:w-32 h-7 lg:h-10 xl:h-[2.4rem]"
            >
              <option value="all">All Categories</option>
              <option value="Kitchen Accessories">Kitchen Accessories</option>
              <option value="Men Fashion">Men's Fashion</option>
              <option value="Men Jeans">Men's Jeans</option>
              <option value="Men Shoes">Men's Shoes</option>
              <option value="Men Watches">Men's Watches</option>
              <option value="Electronics">Electronics</option>
              <option value="Women Fashion">Women's Fashion</option>
              <option value="Women Shoes">Women's Shoes</option>
              <option value="Household Accessories">Household Accessories</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
            </select>
            <button className="bg-blue-700 text-base w-28 h-[2.4rem] text-white rounded-r">
              Search
            </button>
          </form>

          <div className="flex justify-end items-center ">
            <ul className="flex items-center gap-6 text-black text-base">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/returnpolicy">Return Policy</Link>
              </li>
              <li>
                <Link to="/orderdetails">Orders</Link>
              </li>
              {isLoggedIn ? (
                <li onClick={handleLogout} className="cursor-pointer">
                  Log out
                </li>
              ) : (
                <li>
                  <Link to="/login">Log in</Link>
                </li>
              )}
              <li>
                <Link to="/cart">
                <LazyLoadImage loading='lazy' effect='blur' className="w-6" src="/shopping-cart.png" alt="cart" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      {showMobileNavbar && (
        <MobileNavbar onClose={toggleMobileNavbar} /> 
      )}
    </div>
  );
};

export default Header;
