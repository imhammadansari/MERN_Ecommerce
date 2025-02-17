import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link, useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';


const ProductDetails = () => {
    const { productid } = useParams();
    const [bestproducts, setbestproducts] = useState([]);
    const [cartProducts, setCartProducts] = useState("");
    const [relatedproducts, setrelatedproducts] = useState([]);
    const [currentPage, setcurrentPage] = useState('description');
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: { data: null },
        category: '',
        reviews: [],
    });

    const [reviewData, setReviewData] = useState({
        name: '',
        comments: '',
        rating: '',
    });

    const getProduct = async () => {
        try {
            const response = await axios.get(`https://mern-ecommerce-rnup.onrender.com/items/${productid}`);
            setProduct(response.data.product);
            console.log(response.data.product);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(`https://mern-ecommerce-rnup.onrender.com/addtoCart/${productId}`);
            console.log("Product added to cart:", response);

            if (response.status === 200) {
                alert("Product added to cart");
            }
            setCartProducts(response.data);
        } catch (error) {
            console.error("Error adding to cart:", error.response ? error.response.data : error.message);
            if (error.response?.data === "You need to login first") alert("You need to login first");
        }
    };

    const handleReviewSubmit = async () => {
        try {
            if (!reviewData.name || !reviewData.comments || !reviewData.rating) {
                alert("All fields are required");
                return;
            }

            await axios.post(`https://mern-ecommerce-rnup.onrender.com/products/${productid}/review`, reviewData);
            alert("Review submitted successfully");
            setReviewData({ name: '', comments: '', rating: '' });
            getProduct();
        } catch (error) {
            console.error("Error submitting review:", error.response ? error.response.data : error.message);
        }
    };

    const bestProducts = async () => {
        try {
            const response = await axios.get(`https://mern-ecommerce-rnup.onrender.com/shop`);
            const bestSellerProducts = response.data.product
                .filter(product => product.bestseller === true)
                .slice(0, 5);
            setbestproducts(bestSellerProducts);
        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);
        }
    };

    const relatedProducts = async (productCategory) => {
        try {
            const response = await axios.get(`https://mern-ecommerce-rnup.onrender.com/shop`);

            const relateProducts = response.data.product.filter(product => product.category === productCategory)
                .slice(0, 6);
            setrelatedproducts(relateProducts)
        } catch (error) {
            console.error("Error fetching products:", error.response ? error.response.data : error.message);

        }
    }

    useEffect(() => {
        getProduct();
    }, [productid]);

    useEffect(() => {
        bestProducts();
    }, []);


    useEffect(() => {
        if (product.category) {
            relatedProducts(product.category);
        }
    }, [product.category]);



    const base64Image =
        product.image?.data && product.image.data.length
            ? `data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}`
            : null;

    return (
        <>
            <Header />
            <div className="px-4 lg:px-20 bg-slate-200 py-4 md:py-12 gap-4 flex flex-col lg:flex-row items-start justify-start">
                <div className='bg-white w-full flex flex-col lg:flex-row gap-4 py-4 px-4'>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start bg-white justify-start">
                        {base64Image ? (
                            <div className="flex flex-col bg-white">
                                <div className="lg:flex w-[10rem] lg:w-[20rem] justify-center lg:justify-start items-center lg:items-start">
                                    <img
                                        className="border border-1 border-solid border-black border-opacity-10"
                                        src={base64Image}
                                        alt={product.name}
                                    />
                                </div>
                                
                                <div className="hidden lg:flex gap-4 items-start justify-start mt-2">
                                    <img className='w-24 border border-black border-opacity-35' src={base64Image} alt={product.name} />
                                    <img className='w-24 border border-black border-opacity-35' src={base64Image} alt={product.name} />
                                    <img className='w-24 border border-black border-opacity-35' src={base64Image} alt={product.name} />

                                </div>
                                
                            </div>
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>

                    <div>
                        <div className="flex flex-col w-full lg:w-[30rem] items-start">
                            {product.brand && product.brand !== "" && (
                                <p className="text-sm md:text-base text-gray-500 font-light">Brand: {product.brand}</p>
                            )}

                            <p className="text-sm md:text-lg font-bold text-start">{product.name}</p>
                            <p className="text-lg md:text-xl text-red-600">Rs. {product.price}</p>
                            <div className='flex gap-2 items-center'>
                                {product.reviews.length === 0 ? (
                                    <img className='w-20' src='/rating0.png' />
                                ): (
                                    <img className='w-20' src='/rating.png' />
                                )}
                                <img src='' />
                                <p>{product.reviews.length} Reviews</p>

                                <img src='' />
                                <p>154 Sold</p>

                            </div>
                            <div className='flex text-start py-2 border-b border-black border-opacity-25 w-full'>
                                <p className='w-32'>Price: </p>
                                <p>Negotiable</p>
                            </div>

                            <div className='flex text-start py-2 w-full'>
                                <p className='w-32'>Type: </p>
                                <p>{product.category}</p>
                            </div>

                            <div className='flex text-start py-2 w-full'>
                                <p className='w-32'>Material: </p>
                                <p>{product.material}</p>
                            </div>

                            <div className='flex text-start py-2 w-full'>
                                <p className='w-32'>Design: </p>
                                <p>Modern nice</p>
                            </div>

                            <div className='hidden lg:flex py-2 border-t text-start border-black border-opacity-25 w-full'>
                                <p className='w-32'>Customization: </p>
                                <p>Customized logo and design custom packages</p>
                            </div>

                            <div className='flex text-start py-2 w-full'>
                                <p className='w-32'>Protection: </p>
                                <p>Refund Policy</p>
                            </div>

                            <div className='flex text-start border-black border-b border-opacity-25 py-2 w-full'>
                                <p className='w-32'>Warranty: </p>
                                <p>2 years full warranty</p>
                            </div>

                            {product.color && product.color !== "" && (
                                <p className="text-sm md:text-base"><span className='font-bold'>Color:</span> {product.color}</p>
                            )}
                            {product.size && product.size !== "" && (
                                <p className="text-sm md:text-base"><span className='font-bold'>Size:</span> {product.size}</p>
                            )}

                            <br />
                            <div className="flex justify-center">
                                <button onClick={() => addToCart(product._id)} className="w-28 h-8 bg-black hover:text-black hover:bg-white  text-white">
                                    Add to Cart
                                </button>
                            </div>
                        </div>


                    </div>

                    <div className='px-4 flex flex-col w-full lg:h-[22rem] justify-center items-start border bg-white border-black border-opacity-25 py-4'>
                        <div className='flex flex-col w-full justify-center'>
                            <div className='flex gap-2 border-b border-black pb-4 w-full border-opacity-25'>
                                <h1 className='w-16 text-xl h-12 text-center flex items-center justify-center bg-blue-300 rounded-sm'>S</h1>
                                <div className='flex flex-col text-start '>
                                    <h1>Supplier</h1>
                                    <h1>Guanjoi Trading LLC</h1>
                                </div>

                            </div>

                            <div className='flex gap-4 lg:gap-0 flex-row lg:flex-col'>

                            <div className='flex gap-2 lg:gap-4 mt-1 pt-4 items-center text-start'>
                                <img className='w-8 lg:w-10' src='/Germany.png' />
                                <p className='hidden lg:flex'>Germany, Berlin</p>
                                <p className='text-xs lg:hidden'>Germany</p>
                            </div>


                            <div className='flex gap-2 lg:gap-4 mt-1 pt-4 items-center text-start'>
                                <img className='w-8 lg:w-10' src='/verified.png' />
                                <p className='hidden lg:flex'>Verified Seller</p>
                                <p className='text-xs lg:hidden'>Verified</p>
                            </div>


                            <div className='flex gap-2 lg:gap-4 mt-1 pt-4 items-center text-start'>
                                <img className='w-8 lg:w-10' src='/globe.png' />
                                <p className='hidden lg:flex'>Worldwide Shipping</p>
                                <p className='text-xs lg:hidden'>Shipping</p>
                            </div>

                            </div>

                        </div>

                        <button className='w-full h-10 bg-blue-700 rounded mt-4 hidden lg:block text-white'>Send Inquiry</button>
                        <button className='w-full h-10 border border-black mt-2 hidden lg:block rounded border-opacity-30 text-blue-700'>Seller's Profile</button>

                    </div>

                </div>

            </div>


            <div className='flex gap-4 bg-slate-200 w-full px-4 lg:px-20 py-2'>

                <div className='lg:w-[140rem] bg-white flex flex-col px-4 text-start'>
                    <div className="border-black border-b border-opacity-25 py-2 w-full flex gap-4 lg:gap-8">
                        <h1
                            onClick={() => setcurrentPage('description')}
                            className={`cursor-pointer ${currentPage === 'description' ? 'text-blue-500 border-b-2 text-sm lg:text-base border-blue-500' : 'text-gray-700 text-sm lg:text-base'
                                }`}
                        >
                            Description
                        </h1>
                        <h1
                            onClick={() => setcurrentPage('reviews')}
                            className={`cursor-pointer ${currentPage === 'reviews' ? 'text-blue-500 border-b-2 text-sm lg:text-base border-blue-500' : 'text-gray-700 text-sm lg:text-base'
                                }`}
                        >
                            Reviews
                        </h1>
                        <h1 className="text-gray-700 text-sm lg:text-base">Shipping</h1>
                        <h1 className="text-gray-700 text-sm lg:text-base">About Seller</h1>
                    </div>



                    {currentPage === 'description' && (
                        <>
                            <div className='flex flex-col gap-6 pb-4'>
                                <p className="text-xs md:text-base py-2">{product.description}</p>

                                <div className='flex border lg:w-[40rem] border-black border-opacity-25 flex-col'>
                                    <div className='flex border-b border-black border-opacity-25'>
                                        <p className='w-28 lg:w-40 text-sm lg:base bg-gray-300 px-2 py-1 text-black'>Model</p>
                                        <p className='text-black text-sm lg:base py-1 px-2'>{product._id}</p>
                                    </div>

                                    <div className='flex border-b border-black border-opacity-25'>
                                        <p className='w-28 lg:w-40 bg-gray-300 text-sm lg:base px-2 py-1 text-black'>Style</p>
                                        <p className='text-black py-1 text-sm lg:base px-2'>Classic Style</p>
                                    </div>

                                    <div className='border-b border-black border-opacity-25 flex'>
                                        <p className='w-28 lg:w-40 text-sm lg:base bg-gray-300 px-2 py-1 text-black'>Dimensions</p>
                                        <p className='text-black text-sm lg:base py-1 px-2'>{product.dimensions}</p>
                                    </div>

                                    <div className='flex'>
                                        <p className='w-28 lg:w-40 text-sm lg:base bg-gray-300 px-2 py-1 text-black'>Weight</p>
                                        <p className='text-black text-sm lg:base py-1 px-2'>{product.weight}</p>
                                    </div>

                                </div>
                            </div>
                        </>

                    )}

                    {currentPage === 'reviews' && (
                        <>

                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((review, index) => (
                                    <div key={index} className="mb-4 border-b py-2 flex justify-between">
                                        <p className="font-bold">{review.name}</p>
                                        <p>{review.comments}</p>
                                        <p className="text-yellow-500">Rating: {review.rating} / 5</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet</p>
                            )}

                            <div className='flex flex-col mt-4 py-2 text-start'>
                                <h1 className="font-bold mb-2">Add a Review</h1>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="block w-full mb-2 p-1 lg:p-2 border"
                                    value={reviewData.name}
                                    onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                                />
                                <textarea
                                    placeholder="Your Comments"
                                    className="block w-full mb-2 p-1 lg:p-2 border"
                                    value={reviewData.comments}
                                    onChange={(e) => setReviewData({ ...reviewData, comments: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Rating (1-5)"
                                    className="block w-full mb-4 p-1 lg:p-2 border"
                                    value={reviewData.rating}
                                    onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                                    min="1"
                                    max="5"
                                />
                                <button
                                    onClick={handleReviewSubmit}
                                    className="w-24 h-8 lg:w-28 lg:h-10 text-xs lg:text-sm bg-black text-white hover:text-black hover:bg-white rounded"
                                >
                                    Submit Review
                                </button>
                            </div>

                        </>
                    )}
                </div>

                <div className="hidden lg:flex bg-white px-2 py-2 flex-col gap-2">
                    <h1 className='text-base text-start'>You may Like</h1>
                    {bestproducts?.map((item) => {
                        const base64Image = Buffer.from(item.image).toString('base64');
                        return (
                            <div className="flex gap-2 items-center" key={item._id}>

                                <img
                                    className="w-20 h-20 border-black border-opacity-25 border object-contain"
                                    src={`data:image/jpeg;base64,${base64Image}`}
                                    alt={item.name}
                                />

                                <Link to={`/items/${item._id}`}>
                                    <p className="w-full text-xs text-start">{item.name}</p>
                                    <p className="flex text-start text-xs text-gray-700 pt-2">Rs. {item.price}</p>
                                    

                                </Link>
                            </div>
                        );
                    })}

                </div>


            </div>

            <div className="block bg-slate-200 lg:hidden px-4 py-2">
  <h1 className="text-base text-start w-full font-bold pb-2">Similar Products</h1>
  <Swiper
    slidesPerView={3} 
    spaceBetween={10}
    modules={[Pagination]}
    className="mySwiper"
  >
    {bestproducts?.map((item) => {
      const base64Image = Buffer.from(item.image).toString('base64');
      return (
        <SwiperSlide key={item._id}>
          <div className="flex flex-col bg-white px-2 py-2 gap-2 items-center">
            <img
              className="w-20 h-20  object-contain"
              src={`data:image/jpeg;base64,${base64Image}`}
              alt={item.name}
            />
            <Link to={`/items/${item._id}`}>
              <p className="w-full text-xs text-start">{item.name}</p>
              <p className="flex text-start text-xs text-gray-700 pt-2">Rs. {item.price}</p>
            </Link>
          </div>
        </SwiperSlide>
      );
    })}
  </Swiper>
</div>


            <div className='w-full bg-slate-200 hidden lg:flex flex-col px-4 lg:px-20 py-2'>
                <h1 className='text-start w-full bg-white px-2 py-2 font-bold'>Related Products</h1>
                <div className='flex justify-between'>

                    {relatedproducts?.map((item) => {
                        const base64Image = Buffer.from(item.image).toString('base64');
                        return (
                            <div key={item._id} className='flex flex-col w-[15rem] items-center bg-white px-2 py-2'>

                                <img
                                    className="w-28 h-28 object-contain"
                                    src={`data:image/jpeg;base64,${base64Image}`}
                                    alt={item.name}
                                />

                                <Link className='mt-2' to={`/items/${item._id}`}>
                                    <p className="text-xs text-start w-[10rem]">{item.name}</p>
                                    <p className="flex text-start text-xs text-gray-700 pt-2">Rs. {item.price}</p>
                                    {/* 8B96A5 */}

                                </Link>

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
};

export default ProductDetails;
