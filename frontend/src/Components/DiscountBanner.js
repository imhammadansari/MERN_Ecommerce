import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const DiscountBanner = () => {
  return (
    <>
    <div className='w-full bg-slate-200 lg:px-20 py-4'>
      
      <div className='w-full flex flex-col lg:flex-row bg-white'>

      <div className='px-4 g:px-4 justify-between lg:justify-normal text-black lg:py-2 lg:border-r lg:border-gray-400 flex lg:flex-col w-full lg:w-[18rem] text-start'>
        <div className='flex flex-col pt-4'>
        <p className='font-bold'>Deals and offers</p>
        <p className='text-sm text-gray-400'>Hygiene equipements</p>

        </div>

        <div className='flex gap-2'>
          <div className='flex flex-col px-2 py-1 bg-black bg-opacity-90 text-white mt-3 rounded text-center'>
            <p className='font-bold'>04</p>
            <p className='text-sm'>Days</p>
          </div>
          
          <div className='flex flex-col px-2 py-1 bg-black bg-opacity-90 text-white mt-3 rounded text-center'>
            <p className='font-bold'>13</p>
            <p className='text-sm'>Hour</p>
          </div>
          
          <div className='flex flex-col px-2 py-1 bg-black bg-opacity-90 text-white mt-3 rounded text-center'>
            <p className='font-bold'>34</p>
            <p className='text-sm'>Min</p>
          </div>
          
          <div className='flex flex-col px-2 py-1 bg-black bg-opacity-90 text-white mt-3 rounded text-center'>
            <p className='font-bold'>56</p>
            <p className='text-sm'>Sec</p>
          </div>
        </div>

      </div>

      <div className="block lg:hidden px-2 py-4">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              // pagination={{
              //   clickable: true,
              // }}
              modules={[Pagination]}
              className="mySwiper"
            >
                <SwiperSlide>
               <div className="flex flex-col items-center">
      <img className="w-28 h-28 object-contain" src="watch.png" />
      <p className='text-sm'>Smart watches</p>
      <p className="bg-red-300 text-red-500 rounded-full py-1 px-1 w-16 text-center">
        -25%
      </p>
    </div>
  </SwiperSlide>
  <SwiperSlide>
    <div className="flex flex-col items-center">
      <img className="w-28 h-28 object-contain" src="laptop.png" />
      <p className='text-sm'>Laptop</p>
      <p className="bg-red-300 text-red-500 rounded-full py-1 px-1 w-16 text-center">
        -15%
      </p>
    </div>
  </SwiperSlide>
  <SwiperSlide>
    <div className="flex flex-col items-center">
      <img className="w-28 h-28 object-contain" src="camera.png" />
      <p className='text-sm'>GoPro cameras</p>
      <p className="bg-red-300 text-red-500 rounded-full py-1 px-1 w-16 text-center">
        -40%
      </p>
    </div>
  </SwiperSlide>
  <SwiperSlide>
    <div className="flex flex-col items-center">
      <img className="w-28 h-28 object-contain" src="headphone.png" />
      <p className='text-sm'>Headphones</p>
      <p className="bg-red-300 text-red-500 rounded-full py-1 px-1 w-16 text-center">
        -25%
      </p>
    </div>
  </SwiperSlide>
  <SwiperSlide>
    <div className="flex flex-col items-center">
      <img className="w-28 h-28 object-contain" src="mobile.png" />
      <p className='text-sm'>Canon cameras</p>
      <p className="bg-red-300 text-red-500 rounded-full py-1 px-1 w-16 text-center">
        -25%
      </p>
    </div>
  </SwiperSlide>
</Swiper>
          </div>

      <div className='px-2 hidden py-2 w-[12rem] lg:flex lg:flex-col justify-center items-center border-r border-gray-400'>
        <img src='watch.png' />
        <div className='flex flex-col items-center'>
        <p>Smart watches</p>
        <p className='bg-red-300 text-red-500 rounded-full py-1 px-1 w-16'>-25%</p>
        </div>
      </div>
      
      <div className='px-2 hidden py-2 w-[12rem] lg:flex lg:flex-col  justify-center items-center border-r border-gray-400'>
        <img className='w-40' src='laptop.png' />
        <div className='flex flex-col items-center'>
        <p>Laptop</p>
        <p className='bg-red-300 text-red-500 rounded-full py-1 px-1 w-16'>-15%</p>
        </div>
      </div>
      
      <div className='px-2 hidden py-2 w-[12rem] lg:flex lg:flex-col justify-center items-center border-r border-gray-400'>
        <img className='w-44' src='camera.png' />
        <div className='flex flex-col mt-4 items-center'>
        <p>GoPro cameras</p>
        <p className='bg-red-300 text-red-500 rounded-full py-1 px-1 w-16'>-40%</p>
        </div>
      </div>
      
      <div className='px-2 hidden py-2 w-[12rem] lg:flex lg:flex-col  justify-center items-center border-r border-gray-400'>
        <img src='headphone.png' />
        <div className='flex flex-col items-center'>
        <p>Headphones</p>
        <p className='bg-red-300 text-red-500 rounded-full py-1 px-1 w-16'>-25%</p>
        </div>
      </div>
      
      <div className='px-2 hidden py-2 w-[12rem] lg:flex lg:flex-col justify-center items-center'>
        <img src='mobile.png' />
        <div className='flex flex-col items-center'>
        <p>Canon cameras</p>
        <p className='bg-red-300 text-red-500 rounded-full py-1 px-1 w-16'>-25%</p>
        </div>
      </div>


      </div>
    </div>
    </>
  )
}

export default DiscountBanner