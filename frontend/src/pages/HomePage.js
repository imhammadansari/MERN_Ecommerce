import React from 'react'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import DiscountBanner from '../Components/DiscountBanner'
import Categories from '../Components/Categories'
import Footer from '../Components/Footer'
import BestProducts from '../Components/BestProducts'

const HomePage = () => {
  return (
    <>
    <Header />
    <Banner />
    <DiscountBanner />
    <BestProducts />
    <Categories />
    <Footer />
    </>

  )
}

export default HomePage