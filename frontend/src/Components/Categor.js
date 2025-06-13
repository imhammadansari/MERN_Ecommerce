import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const Categor = () => {
  return (
    <>
    {/* for Screens */}
    <div className='w-full bg-slate-200 lg:px-20 lg:py-4'>
        <div className='bg-white w-full hidden lg:flex'>
            <div>
                <LazyLoadImage loading='lazy' effect='blur' src='/left-aside.png' />
            </div>

            <div className='border-r border-gray-200 w-[14rem]'>
                <div className='flex px-2 py-2 justify-between h-[8rem] border-b'>
                    <div>
                    <p className='text-start'>Soft chairs</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 19</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/sofa-chair.jpg' />
                    </div>

                </div>

                <div className='flex px-2 py-2 justify-between h-[8rem]'>
                    <div>
                    <p className='text-start'>Kitchen mixer</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 100</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/kitchen-mixer.jpg.jpg' />
                    </div>

                </div>
            </div>

            <div className='border-r border-gray-200 w-[14rem]'>
                <div className='flex px-2 py-2 justify-between h-[8rem] border-b'>
                    <div>
                    <p className='text-start'>Flowers Vase</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 12</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/flowers-vase.jpg' />
                    </div>

                </div>

                <div className='flex px-2 py-2 justify-between h-[8rem]'>
                    <div>
                    <p className='text-start'>Lamp</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 22</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage className='w-20 flex items-end justify-end' src='/lamp.jpg' loading='lazy' effect='blur' />
                    </div>

                </div>
            </div>

            <div className='border-r border-gray-200 w-[14rem]'>
                <div className='flex px-2 py-2 justify-between h-[8rem] border-b'>
                    <div>
                    <p className='text-start'>Folding Chair</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 110</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/folding-chair.jpg' />
                    </div>

                </div>

                <div className='flex px-2 py-2 justify-between h-[8rem]'>
                    <div>
                    <p className='text-start'>Coffee Maker</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 150</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/coffee-maker.jpg' />
                    </div>

                </div>
            </div>

            <div className='border-gray-200 w-[14rem]'>
                <div className='flex px-2 py-2 justify-between h-[8rem] border-b'>
                    <div>
                    <p className='text-start'>Clay Handi</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 25</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/clay-handi.jpg' />
                    </div>

                </div>

                <div className='flex px-2 py-2 justify-between h-[8rem]'>
                    <div>
                    <p className='text-start'>Air Mattress</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 100</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/air-mattress.jpg' />
                    </div>

                </div>
            </div>

        </div>

    </div>

    <div className='w-full bg-slate-200 lg:px-20 lg:py-2'>
        <div className='bg-white w-full hidden lg:flex'>
            <div>
                <LazyLoadImage loading='lazy' effect='blur' src='/left-side.png' />
            </div>

            <div className='border-r border-gray-200 w-[14rem]'>
                <div className='flex px-2 py-2 justify-between h-[8rem] border-b'>
                    <div>
                    <p className='text-start'>Soft chairs</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 19</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/1.jpg' />
                    </div>

                </div>

                <div className='flex px-2 py-2 justify-between h-[8rem]'>
                    <div>
                    <p className='text-start'>Kitchen mixer</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 100</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/9.jpg' />
                    </div>

                </div>
            </div>

            <div className='border-r border-gray-200 w-[14rem]'>
                <div className='flex px-2 py-2 justify-between h-[8rem] border-b'>
                    <div>
                    <p className='text-start'>Sofa & chair</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 19</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/1.jpg' />
                    </div>

                </div>

                <div className='flex px-2 py-2 justify-between h-[8rem]'>
                    <div>
                    <p className='text-start'>Kitchen mixer</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 100</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/9.jpg' />
                    </div>

                </div>
            </div>

            <div className='border-r border-gray-200 w-[14rem]'>
                <div className='flex px-2 py-2 justify-between h-[8rem] border-b'>
                    <div>
                    <p className='text-start'>Soft chairs</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 19</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/1.jpg' />
                    </div>

                </div>

                <div className='flex px-2 py-2 justify-between h-[8rem]'>
                    <div>
                    <p className='text-start'>Kitchen mixer</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 100</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/9.jpg' />
                    </div>

                </div>
            </div>

            <div className='border-gray-200 w-[14rem]'>
                <div className='flex px-2 py-2 justify-between h-[8rem] border-b'>
                    <div>
                    <p className='text-start'>Soft chairs</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 19</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/1.jpg' />
                    </div>

                </div>

                <div className='flex px-2 py-2 justify-between h-[8rem]'>
                    <div>
                    <p className='text-start'>Kitchen mixer</p>
                    <p className='text-start text-gray-400 pt-2 text-xs'>From</p>
                    <p className='text-start text-xs text-gray-400'>USD 100</p>

                    </div>
                    
                    <div className='flex justify-end items-end'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex items-end justify-end' src='/9.jpg' />
                    </div>

                </div>
            </div>

        </div>

    </div>

    {/* For Small Screens */}

    <div className="block lg:hidden px-4 my-2">
        <h1 className='text-base text-start w-full font-bold'>Home and outdoor</h1>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={50}
                  // pagination={{
                  //   clickable: true,
                  // }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                    <SwiperSlide>
                   <div>
                    <div className='flex'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex' src='/1.jpg' />
                    </div>
                    <p className='text-start text-sm'>Soft chairs</p>
                    <p className='text-start text-gray-400 text-xs'>From USD 19</p>

                    </div>
                    
      </SwiperSlide>
      <SwiperSlide>
      <div>
                    <div className='flex'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex' src='/9.jpg' />
                    </div>
                    <p className='text-start text-sm'>Kitchen mixer</p>
                    <p className='text-start text-gray-400 text-xs'>From USD 19</p>

                    </div>
      </SwiperSlide>
      <SwiperSlide>
      <div>
                    <div className='flex'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex' src='/1.jpg' />
                    </div>
                    <p className='text-start text-sm'>Soft chairs</p>
                    <p className='text-start text-gray-400 text-xs'>From USD 19</p>

                    </div>
      </SwiperSlide>
      <SwiperSlide>
      <div>
                    <div className='flex'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex' src='/1.jpg' />
                    </div>
                    <p className='text-start text-sm'>Soft chairs</p>
                    <p className='text-start text-gray-400 text-xs'>From USD 19</p>

                    </div>
      </SwiperSlide>
      <SwiperSlide>
      <div>
                    <div className='flex'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex' src='/1.jpg' />
                    </div>
                    <p className='text-start text-sm'>Soft chairs</p>
                    <p className='text-start text-gray-400 text-xs'>From USD 19</p>

                    </div>
      </SwiperSlide>
    </Swiper>
    </div>

    <div className="block lg:hidden px-4 py-2">
        <h1 className='text-base text-start w-full font-bold'>Consumer electronics</h1>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={50}
                  // pagination={{
                  //   clickable: true,
                  // }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                    <SwiperSlide>
                   <div>
                    <div className='flex'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex' src='/1.jpg' />
                    </div>
                    <p className='text-start text-sm'>Soft chairs</p>
                    <p className='text-start text-gray-400 text-xs'>From USD 19</p>

                    </div>
                    
      </SwiperSlide>
      <SwiperSlide>
      <div>
                    <div className='flex'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex' src='/9.jpg' />
                    </div>
                    <p className='text-start text-sm'>Kitchen mixer</p>
                    <p className='text-start text-gray-400 text-xs'>From USD 19</p>

                    </div>
      </SwiperSlide>
      <SwiperSlide>
      <div>
                    <div className='flex'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex' src='/1.jpg' />
                    </div>
                    <p className='text-start text-sm'>Soft chairs</p>
                    <p className='text-start text-gray-400 text-xs'>From USD 19</p>

                    </div>
      </SwiperSlide>
      <SwiperSlide>
      <div>
                    <div className='flex'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex' src='/1.jpg' />
                    </div>
                    <p className='text-start text-sm'>Soft chairs</p>
                    <p className='text-start text-gray-400 text-xs'>From USD 19</p>

                    </div>
      </SwiperSlide>
      <SwiperSlide>
      <div>
                    <div className='flex'>
                    <LazyLoadImage loading='lazy' effect='blur' className='w-20 flex' src='/1.jpg' />
                    </div>
                    <p className='text-start text-sm'>Soft chairs</p>
                    <p className='text-start text-gray-400 text-xs'>From USD 19</p>

                    </div>
      </SwiperSlide>
    </Swiper>
    </div>
    </>
  )
}

export default Categor