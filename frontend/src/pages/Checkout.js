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
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

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
        { amount: totalPrice * 100 } // Convert to cents
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
            }
          }
        }
      );

      if (stripeError) {
        setError(`Payment failed: ${stripeError.message}`);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        setSucceeded(true);
        setError(null);
        // Payment succeeded - place the order
        await onOrderSuccess();
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
      setProcessing(false);
    }
  };

  const CARD_OPTIONS = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
        iconColor: '#9e2146',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-4">
        <CardElement 
          options={CARD_OPTIONS}
          onChange={handleChange}
        />
      </div>
      
      {error && (
        <div className="text-red-500 mb-4 text-center">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={processing || disabled || succeeded}
        className={`w-full h-12 ${processing || succeeded ? 'bg-gray-400' : 'bg-black hover:bg-white hover:text-black'} text-white font-bold py-2 px-4 rounded transition duration-300`}
      >
        {processing ? 'Processing...' : succeeded ? 'Payment Successful!' : `Pay $${totalPrice}`}
      </button>
    </form>
  );
};

function Checkout() {
  const location = useLocation();
  const { cartProducts, quantities, totalPrice } = location.state || {};
  const navigate = useNavigate();
  const totalQuantity = quantities?.reduce((total, quantity) => total + quantity, 0) || 0;

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  // Redirect if no cart data
  useEffect(() => {
    if (!location.state) {
      navigate('/cart');
    }
  }, [location.state, navigate]);

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
        navigate("/orderdetails", { state: { orderSuccess: true } });
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("Error placing order");
    }
  };

  if (!location.state) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Header />
      <div className="w-full min-h-screen">
        <div className="px-4 md:px-8 lg:px-12 py-4 flex flex-col md:flex-row">
          <div className="w-full lg:w-[50rem]">
            <h1 className="font-bold text-center text-xl">Billing Details</h1>
            <div className="py-4 flex flex-col gap-2 items-center">
              <div className="flex gap-2">
                <input
                  className="bg-white border border-1 border-solid border-black border-opacity-30 p-2 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem] rounded"
                  required
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={billingDetails.firstName}
                  onChange={handleInputChange}
                />
                <input
                  className="bg-white border border-1 border-solid border-black border-opacity-30 p-2 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem] rounded"
                  required
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={billingDetails.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-2">
                <input
                  className="bg-white border border-1 border-solid border-black border-opacity-30 p-2 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem] rounded"
                  required
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={billingDetails.email}
                  onChange={handleInputChange}
                />
                <input
                  className="bg-white border border-1 border-solid border-black border-opacity-30 p-2 text-sm md:text-base w-[11rem] sm:w-[15rem] md:w-[13.5rem] lg:w-[21rem] rounded"
                  required
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={billingDetails.phoneNumber}
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
                <p>${totalPrice.toFixed(2)}</p>
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