"use client"
import React from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Link } from 'react-router-dom';


const Banner = () => {


    return (
        <>
            <div className='w-full bg-slate-200 md:px-20 md:py-4'>
                <div className='w-full flex bg-white'>

                <div className='w-[15rem] hidden lg:block text-start px-2 py-2'>
                    <p className='pb-1 p-1'><Link to='/products/Kitchen%20Accessories'>Kitchen Accessories</Link></p>
                    <p className='pb-1 p-1'><Link to='/products/Men%20Fashion'>Men's Fashion</Link></p>
                    <p className='pb-1 p-1'><Link to='/products/Men%20Jeans'>Men's Jeans</Link></p>
                    <p className='pb-1 p-1'><Link to='/products/Men%20Shoes'>Men's Shoes</Link></p>
                    <p className='pb-1 p-1'><Link to='/products/Men%20Watches'>Men's Watches</Link></p>
                    <p className='pb-1 p-1'><Link to='/products/Electronics'>Electronics</Link></p>
                    <p className='pb-1 p-1'><Link to='/products/Women%20Fashion'>Women's Fashion</Link></p>
                    <p className='pb-1 p-1'><Link to='/products/Women%20Shoes'>Women's Shoes</Link></p>
                    <p className='pb-1 p-1'><Link to='/products/Household%20Accessories'>Household Accessories</Link></p>
                    <p className='pb-1 p-1'><Link to='/products/Sports%20&%20Outdoors'>Sports & Outdoors</Link></p>

                </div>

                <div className='py-2'>
                    <img src='/banner.png' />
                </div>


                <div className='w-[17.5rem] hidden lg:block px-2 py-2'>

                <div className='bg-blue-200 w-full rounded h-[10rem] px-2 py-2'>
                    <div className='flex'>
                    <img src='Avatar.png' />
                    <div className='flex flex-col text-start pl-4'>
                    <p>Hi, user</p>
                    <p>let's get started </p>
                    </div>
                    
                    </div>
                    <button className='w-full text-white rounded mt-2 bg-blue-600 h-9'>Join Now</button>
                    <button className='w-full text-blue-600 rounded mt-2 bg-white h-9'>Log in</button>
                </div>

                <div>
                    <div className='bg-orange-500 text-start text-white w-full rounded h-[6.2rem] px-2 py-2 mt-2'>
                        <p>Get US $10 off</p>
                        <p>with a new</p>
                        <p>supplier</p>
                    </div>

                </div>
                
                <div>
                    <div className='bg-green-600 text-start text-white w-full rounded h-[6.1rem] px-2 py-2 mt-2'>
                        <p>Send quotes with</p>
                        <p>supplier</p>
                        <p>preferences</p>
                    </div>

                </div>


                </div>



                
                </div>

            
            </div>
        </>
    )
}

export default Banner