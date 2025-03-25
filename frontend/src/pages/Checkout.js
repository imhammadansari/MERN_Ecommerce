import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Checkout() {
    const location = useLocation();
    const { cartProducts, quantities, totalPrice } = location.state;
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const totalQuantity = quantities.reduce((total, quantity) => total + quantity, 0);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!firstName || !lastName || !email || !phoneNumber) {
            alert("Please fill out all required details.");
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            // 1. Create payment intent on the server
            const { data: { clientSecret } } = await axios.post("https://mern-ecommerce-rnup.onrender.com/create-payment-intent", {
                amount: totalPrice * 100, // Convert to cents
            });

            // 2. Confirm the payment with Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: `${firstName} ${lastName}`,
                        email: email,
                        phone: phoneNumber,
                    },
                }
            });

            if (stripeError) {
                setPaymentError(stripeError.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                // 3. Place the order on your server
                const productIds = cartProducts.map(item => item._id);
                
                const response = await axios.post("https://mern-ecommerce-rnup.onrender.com/placeOrder", {
                    productIds: productIds,
                    quantities: quantities,
                    totalPrice: totalPrice,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    paymentIntentId: paymentIntent.id
                });

                if (response.data.status === "ok") {
                    alert("Order placed successfully!");
                    navigate("/orderdetails");
                } else {
                    alert("Failed to place order");
                }
            }
        } catch (error) {
            console.error(error);
            alert("Error processing payment");
        } finally {
            setLoading(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <>
            <Header />
            <div className="w-full">
                <div className="px-4 md:px-8 lg:px-12 py-4 flex flex-col md:flex-row">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row">
                        <div className="w-full lg:w-[50rem]">
                            <h1 className="font-bold text-center text-xl">Billing Details</h1>
                            <div className="py-4 flex flex-col gap-2 items-center">
                                <div className="flex gap-2">
                                    <input
                                        className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem]"
                                        required
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <input
                                        className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem]"
                                        required
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem]"
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem]"
                                        required
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                
                                <div className="w-[22.35rem] sm:w-[30.5rem] md:w-[27.5rem] lg:w-[42.5rem] mt-4 p-2 border border-1 border-solid border-black border-opacity-30">
                                    <CardElement options={cardElementOptions} />
                                </div>
                                
                                {paymentError && (
                                    <div className="text-red-500 text-sm mt-2">{paymentError}</div>
                                )}
                            </div>
                        </div>

                        <div className="w-full sm:w-[30rem] md:2/6 lg:w-[30rem] flex flex-col md:border-l border-black mx-auto">
                            <h1 className="font-bold text-xl mt-4 md:mt-0 px-4 md:px-8">Total Payment</h1>

                            <div className="flex flex-col px-12 md:px-8 py-8 gap-2">
                                <div className="flex justify-between">
                                    <h1>Sub Total</h1>
                                    <p>Rs. {totalPrice}</p>
                                </div>

                                <div className="flex justify-between">
                                    <h1>Total Products</h1>
                                    <p>{cartProducts.length}</p>
                                </div>

                                <div className="flex justify-between">
                                    <h1>Total Quantity</h1>
                                    <p>{totalQuantity}</p>
                                </div>
                            </div>

                            <div className="flex items-center px-4 md:px-8 py-10">
                                <button
                                    type="submit"
                                    disabled={!stripe || loading}
                                    className={`w-full h-9 bg-black text-white hover:bg-white hover:text-black ${(!stripe || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Checkout;