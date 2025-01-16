import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const ExtraServices = () => {
  return (
    <>
    <div className="w-full bg-slate-200 px-4 lg:px-20 py-4">
      <h1 className="font-bold hidden lg:block text-start text-xl">Our Extra Services</h1>
      <div className='w-full hidden lg:flex gap-4'>

      <div className="py-2">
        <div
          className="w-[17.6rem] h-32 rounded flex px-4 relative items-end justify-end"
          style={{
            backgroundImage: "url('/extraservice01.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <div className='bg-blue-200 absolute bottom-[-1.5rem] right flex items-center justify-center w-12 px-1 py-1 h-12 rounded-full border border-white'>
                <img className='w-6 h-6' src='search.png' />

            </div>
          
        </div>
        <div className='bg-white w-[17.6rem] text-start h-20'>
            <p className='px-4 py-2 text-base w-40'>Source from Industry Hubs</p>

        </div>
      </div>

      <div className="py-2">
        <div
          className="w-[17.6rem] h-32 rounded flex px-4 relative items-end justify-end"
          style={{
            backgroundImage: "url('/image-104.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <div className='bg-blue-200 absolute bottom-[-1.5rem] right flex items-center justify-center w-12 px-1 py-1 h-12 rounded-full border border-white'>
                <img className='w-6 h-6' src='inventory_2.png' />

            </div>
          
        </div>
        <div className='bg-white w-[17.6rem] text-start h-20'>
            <p className='px-4 py-2 text-base w-40'>Customize Your Products</p>

        </div>
      </div>

      <div className="py-2">
        <div
          className="w-[17.6rem] h-32 rounded flex px-4 relative items-end justify-end"
          style={{
            backgroundImage: "url('/image-106.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <div className='bg-blue-200 absolute bottom-[-1.5rem] right flex items-center justify-center w-12 px-1 py-1 h-12 rounded-full border border-white'>
                <img className='w-6 h-6' src='send.png' />

            </div>
          
        </div>
        <div className='bg-white w-[17.6rem] text-start h-20'>
            <p className='px-4 py-2 text-base w-48'>Fast, reliable shipping by ocean or air</p>

        </div>
      </div>

      <div className="py-2">
        <div
          className="w-[17.6rem] h-32 rounded flex px-4 relative items-end justify-end"
          style={{
            backgroundImage: "url('/image-107.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <div className='bg-blue-200 absolute bottom-[-1.5rem] right flex items-center justify-center w-12 px-1 py-1 h-12 rounded-full border border-white'>
                <img className='w-6 h-6' src='security.png' />

            </div>
          
        </div>
        <div className='bg-white w-[17.6rem] text-start h-20'>
            <p className='px-4 py-2 text-base w-44'>Product monitoring and inspection</p>

        </div>
      </div>

    
      </div>
      
    </div>

    <div className="block lg:hidden px-4 my-2">
    <h1 className='text-base text-start w-full font-bold pb-2'>Our Extra Services</h1>

                    <Swiper
                      slidesPerView={1}
                      spaceBetween={5}
                      // pagination={{
                      //   clickable: true,
                      // }}
                      modules={[Pagination]}
                      className="mySwiper"
                    >
                        <SwiperSlide>
                        <div
          className="w-[17.6rem] h-32 rounded flex px-4 relative items-end justify-end"
          style={{
            backgroundImage: "url('/extraservice01.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <div className='bg-blue-200 absolute bottom-[-1.5rem] right flex items-center justify-center w-12 px-1 py-1 h-12 rounded-full border border-white'>
                <img className='w-6 h-6' src='search.png' />

            </div>
          
        </div>
        <div className='bg-white w-[17.6rem] text-start h-20'>
            <p className='px-4 py-2 text-base w-40'>Source from Industry Hubs</p>

        </div>
                        
          </SwiperSlide>
          <SwiperSlide>
          <div
          className="w-[17.6rem] h-32 rounded flex px-4 relative items-end justify-end"
          style={{
            backgroundImage: "url('/image-104.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <div className='bg-blue-200 absolute bottom-[-1.5rem] right flex items-center justify-center w-12 px-1 py-1 h-12 rounded-full border border-white'>
                <img className='w-6 h-6' src='inventory_2.png' />

            </div>
          
        </div>
        <div className='bg-white w-[17.6rem] text-start h-20'>
            <p className='px-4 py-2 text-base w-40'>Customize Your Products</p>

        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div
          className="w-[17.6rem] h-32 rounded flex px-4 relative items-end justify-end"
          style={{
            backgroundImage: "url('/image-106.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <div className='bg-blue-200 absolute bottom-[-1.5rem] right flex items-center justify-center w-12 px-1 py-1 h-12 rounded-full border border-white'>
                <img className='w-6 h-6' src='send.png' />

            </div>
          
        </div>
        <div className='bg-white w-[17.6rem] text-start h-20'>
            <p className='px-4 py-2 text-base w-48'>Fast, reliable shipping by ocean or air</p>

        </div>
          </SwiperSlide>
          <SwiperSlide>
          <div
          className="w-[17.6rem] h-32 rounded flex px-4 relative items-end justify-end"
          style={{
            backgroundImage: "url('/image-107.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <div className='bg-blue-200 absolute bottom-[-1.5rem] right flex items-center justify-center w-12 px-1 py-1 h-12 rounded-full border border-white'>
                <img className='w-6 h-6' src='security.png' />

            </div>
          
        </div>
        <div className='bg-white w-[17.6rem] text-start h-20'>
            <p className='px-4 py-2 text-base w-44'>Product monitoring and inspection</p>

        </div>
      
          </SwiperSlide>
          
        </Swiper>
        </div>

        </>

    
  );
};

export default ExtraServices;
