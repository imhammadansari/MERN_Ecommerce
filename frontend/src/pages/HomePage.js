import React from 'react'
import Header from '../Components/Header'
import Banner from '../Components/Banner'
import DiscountBanner from '../Components/DiscountBanner'
import Footer from '../Components/Footer'
import Categor from '../Components/Categor'
import SupplierQuotesSection from '../Components/SupplierQuotesSection'
import BestProducts from '../Components/BestProducts'
import ExtraServices from '../Components/ExtraServices'
import SuppliersSectiion from '../Components/SuppliersSectiion'
import SubscribeSection from '../Components/SubscribeSection'

const HomePage = () => {
  return (
    <>
    <Header />
    <Banner />
    <DiscountBanner />
    <Categor />
    <SupplierQuotesSection />
    <BestProducts />
    <ExtraServices />
    <SuppliersSectiion />
    <SubscribeSection />
    <Footer />
    </>

  )
}

export default HomePage