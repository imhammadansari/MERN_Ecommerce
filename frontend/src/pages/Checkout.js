import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Create Stripe promise
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ 
  cartProducts, 
  quantities, 
  totalPrice,
  totalQuantity,
  billingDetails,
  onOrderSuccess
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent on your server
      const { data: { clientSecret } } = await axios.post(
        "https://mern-ecommerce-rnup.onrender.com/create-payment-intent",
        { amount: totalPrice }
      );

      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${billingDetails.firstName} ${billingDetails.lastName}`,
              email: billingDetails.email,
              phone: billingDetails.phoneNumber,
              address: {
                line1: billingDetails.streetAddress,
                city: billingDetails.city,
                postal_code: billingDetails.zipcode,
              }
            }
          }
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Payment succeeded - place the order
        await onOrderSuccess();
      }
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <CardElement 
          options={{
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
          }}
        />
      </div>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full h-9 bg-black text-white hover:bg-white hover:text-black disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay $${totalPrice}`}
      </button>
    </form>
  );
};

function Checkout() {
  const location = useLocation();
  const { cartProducts, quantities, totalPrice } = location.state;
  const navigate = useNavigate();
  const totalQuantity = quantities.reduce((total, quantity) => total + quantity, 0);

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    zipcode: ""
  });

  axios.defaults.withCredentials = true;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const placeOrder = async () => {
    try {
      const productIds = cartProducts.map(item => item._id);
      
      const response = await axios.post("https://mern-ecommerce-rnup.onrender.com/placeOrder", {
        productIds: productIds,
        quantities: quantities,
        totalPrice: totalPrice,
        ...billingDetails
      });
      
      if (response.data.status === "ok") {
        alert("Order placed successfully!");
        navigate("/orderdetails");
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  return (
    <>
      <Header />
      <div className="w-full">
        <div className="px-4 md:px-8 lg:px-12 py-4 flex flex-col md:flex-row">
          <div className="w-full lg:w-[50rem]">
            <h1 className="font-bold text-center text-xl">Billing Details</h1>
            <div className="py-4 flex flex-col gap-2 items-center">
              <div className="flex gap-2">
                <input
                  className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem]"
                  required
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleInputChange}
                />
                <input
                  className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem]"
                  required
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2">
                <input
                  className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem]"
                  required
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleInputChange}
                />
                <input
                  className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem]"
                  required
                  type="number"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  onChange={handleInputChange}
                />
              </div>
              <input
                className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[22.35rem] sm:w-[30.5rem] md:w-[27.5rem] lg:w-[42.5rem]"
                required
                type="text"
                placeholder="Street Address"
                name="streetAddress"
                onChange={handleInputChange}
              />

              <div className="flex gap-2">
                <input
                  className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem]"
                  required
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={handleInputChange}
                />
                <input
                  className="bg-white border border-1 border-solid border-black border-opacity-30 p-1 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem]"
                  required
                  type="number"
                  placeholder="Zip Code"
                  name="zipcode"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full sm:w-[30rem] md:2/6 lg:w-[30rem] flex flex-col md:border-l border-black mx-auto">
            <h1 className="font-bold text-xl mt-4 md:mt-0 px-4 md:px-8">Total Payment</h1>

            <div className="flex flex-col px-12 md:px-8 py-8 gap-2">
              <div className="flex justify-between">
                <h1>Sub Total</h1>
                <p>${totalPrice}</p>
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

            <div className="px-4 md:px-8 py-4">
              <h2 className="font-bold mb-4">Payment Information</h2>
              <Elements stripe={stripePromise}>
                <CheckoutForm 
                  cartProducts={cartProducts}
                  quantities={quantities}
                  totalPrice={totalPrice}
                  totalQuantity={totalQuantity}
                  billingDetails={billingDetails}
                  onOrderSuccess={placeOrder}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;