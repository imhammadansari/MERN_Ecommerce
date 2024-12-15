import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const ProductDetails = () => {
    const { productid } = useParams();
    const [cartProducts, setCartProducts] = useState("");
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: { data: null },
        category: '',
        reviews: [], // Fetch product reviews
    });

    const [reviewData, setReviewData] = useState({
        name: '',
        comments: '',
        rating: '',
    });

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/items/${productid}`);
            setProduct(response.data.product);
            console.log(response.data.product);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const addToCart = async (productId) => {
        try {
            const response = await axios.post(`http://localhost:8080/addtoCart/${productId}`);
            console.log("Product added to cart:", response);
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

            await axios.post(`http://localhost:8080/products/${productid}/review`, reviewData);
            alert("Review submitted successfully");
            setReviewData({ name: '', comments: '', rating: '' }); // Clear form
            getProduct(); // Refresh product details to fetch the new review
        } catch (error) {
            console.error("Error submitting review:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        getProduct();
    }, [productid]);

    const base64Image =
        product.image?.data && product.image.data.length
            ? `data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}`
            : null;

    return (
        <>
            <Header />
            <div className="px-4 lg:px-12 py-4 md:py-12 grid grid-cols-1 md:grid-cols-2 items-center justify-center">
                <div className="flex items-center justify-center">
                    {base64Image ? (
                        <div className="flex flex-col md:flex-row">
                            <div className="hidden md:flex w-1/3 flex-col items-center">
                                <img src={base64Image} alt={product.name} />
                            </div>
                            <div className="hidden md:flex w-2/3 items-center">
                                <img
                                    className="border border-1 border-solid border-black border-opacity-10"
                                    src={base64Image}
                                    alt={product.name}
                                />
                            </div>
                            <div className="w-full flex justify-center md:hidden">
                                <img
                                    className="w-[16rem] border border-1 border-solid border-black border-opacity-10"
                                    src={base64Image}
                                    alt={product.name}
                                />
                            </div>
                        </div>
                    ) : (
                        <p>No images available</p>
                    )}
                </div>

                <div>
                    <div className="flex flex-col items-center md:items-start">
                         {product.brand && product.brand !== "" && (
        <p className="text-sm md:text-base text-gray-500 font-light">Brand: {product.brand}</p>
    )}

                        <p className="text-sm md:text-xl font-bold md:text-start">{product.name}</p>
                        <p className="text-lg md:text-xl text-red-600 mt-2">Rs. {product.price}</p>
                        <p className="text-sm md:text-base text-gray-500">{product.category}</p>
                        {product.color && product.color !== "" && (
                            <p className="text-sm md:text-base"><span className='font-bold'>Color:</span> {product.color}</p>
                        )}
                        {product.size && product.size !== "" && (
                            <p className="text-sm md:text-base"><span className='font-bold'>Size:</span> {product.size}</p>
                        )}
                        <p className="text-sm md:text-base mt-2">Free Delviery</p>
                        <p className="text-sm md:text-base">Cash on Delivery Available</p>


                        <br />
                        <div className="flex justify-center">
                            <button onClick={() => addToCart(product._id)} className="w-28 h-8 bg-black hover:text-black hover:bg-white  text-white">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                </div>

            </div>
            <div className='w-full px-4 md:px-14 text-start'>
                <h1 className='font-bold text-sm md:text-xl'>Product Description</h1>
                <p className="text-xs md:text-base">{product.description}</p>
            </div>

            {(product.material || product.dimensions || product.weight || product.unitcount) &&
                product.material !== "" && product.dimensions !== "" && product.weight !== "" && product.unitcount !== "" && (
                    <div className='w-full px-4 md:px-14 flex flex-col mt-4 text-start'>
                        <h1 className='font-bold text-sm md:text-xl'>About Product</h1>
                        {product.material && product.material !== "" && (
                            <p className="text-xs md:text-base"><span className='font-bold'>Material:</span> {product.material}</p>
                        )}
                        {product.dimensions && product.dimensions !== "" && (
                            <p className="text-xs md:text-base"><span className='font-bold'>Dimensions:</span> {product.dimensions}</p>
                        )}
                        {product.weight && product.weight !== "" && (
                            <p className="text-xs md:text-base"><span className='font-bold'>Weight:</span> {product.weight}</p>
                        )}
                    </div>
                )}


            {/* Reviews Section */}
            <div className="px-4 lg:px-12 py-4 md:py-12">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <div key={index} className="mb-4 border-b pb-2 flex justify-between">
                            <p className="font-bold">{review.name}</p>
                            <p>{review.comments}</p>
                            <p className="text-yellow-500">Rating: {review.rating} / 5</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet</p>
                )}

                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2">Add a Review</h3>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="block w-full mb-2 p-2 border"
                        value={reviewData.name}
                        onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                    />
                    <textarea
                        placeholder="Your Comments"
                        className="block w-full mb-2 p-2 border"
                        value={reviewData.comments}
                        onChange={(e) => setReviewData({ ...reviewData, comments: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Rating (1-5)"
                        className="block w-full mb-4 p-2 border"
                        value={reviewData.rating}
                        onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                        min="1"
                        max="5"
                    />
                    <button
                        onClick={handleReviewSubmit}
                        className="w-36 h-12 bg-black text-white hover:text-black hover:bg-white rounded"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;
