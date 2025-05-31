import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import axios from 'axios';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    axios.defaults.withCredentials = true;

    const getOrders = async () => {
        try {
            const response = await axios.get("https://mern-ecommerce-website.up.railway.app/allOrders");
            setOrders(response.data.orders);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.post(`https://mern-ecommerce-website.up.railway.app/updateOrder/${orderId}`, { status: newStatus });

            if (response.data.success) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    return (
        <>
            <Header />

            <div className='w-full'>
                <div className="w-full my-5">
                    <h1 className='font-bold md:text-xl text-center mb-5'>All Orders</h1>
                    <div className="grid md:pl-4 pl-4 border-t grid-cols-[2fr_2fr_2fr_2fr_2fr_2fr_2fr_2fr_2fr] md:grid-cols-[2fr_1.5fr_1.5fr_2fr_2.5fr_1fr_1.5fr_1fr_1.5fr] font-bold border-black border-b">
                        <div className="text-xs md:text-sm border-black border-r md:text-center">Order ID</div>
                        <div className="text-xs md:text-sm border-black border-r text-center">Order Date</div>
                        <div className="text-xs md:text-sm border-black border-r text-center">Customer Name</div>
                        <div className="text-xs md:text-sm border-black border-r text-center">Phone Number</div>
                        <div className="text-sm md:text-sm border-black border-r text-center">Address</div>
                        <div className="text-xs md:text-sm border-black border-r text-center">Quantity</div>
                        <div className="text-xs md:text-sm border-black border-r text-center">Total Price</div>
                        <div className="text-xs md:text-sm border-black border-r text-center">Status</div>
                        <div className="text-xs md:text-sm text-center">Actions</div>
                    </div>

                    {orders?.map((order, index) => (
                        <div key={index} className="grid md:pl-4 pl-4 grid-cols-[2fr_2fr_2fr_2fr_2fr_2fr_2fr_2fr_2fr] md:grid-cols-[2fr_1.5fr_1.5fr_2fr_2.5fr_1fr_1.5fr_1fr_1.5fr] border-black border-b">
                            <div className="text-xs md:text-sm border-black border-r md:text-center">{order._id}</div>
                            <div className="text-xs md:text-sm border-black border-r text-center">{new Date(order.orderDate).toLocaleDateString()}</div>
                            <div className="text-xs md:text-sm text-center border-black border-r">{order.firstName} {order.lastName}</div>
                            <div className="text-xs md:text-sm border-black border-r text-center">{order.phoneNumber}</div>
                            <div className="text-sm md:text-sm border-black border-r text-center">{order.streetAddress}, {order.city}</div>
                            <div className="text-sm md:text-sm border-black border-r text-center">{order.products.length}</div>
                            <div className="text-sm md:text-sm border-black border-r text-center">${order.totalPrice}</div>
                            <div className="text-xs md:text-sm border-black border-r text-center">
                                {order.status === "Pending" ? (
                                    <span className="text-yellow-600 font-bold">Pending</span>
                                ) : order.status === "Fulfilled" ? (
                                    <span className="text-green-600 font-bold">Fulfilled</span>
                                ) : (
                                    <span className="text-red-600 font-bold">Canceled</span>
                                )}
                            </div>
                            <div className="text-xs md:text-xs flex gap-2 py-1 justify-center text-center">
                                {order.status === "Pending" ? (
                                    <>
                                        <button onClick={() => updateOrderStatus(order._id, "Fulfilled")} className='w-14 h-7 text-xs bg-green-600 text-white rounded'>Fulfill</button>
                                        <button onClick={() => updateOrderStatus(order._id, "Canceled")} className='w-14 h-7 text-xs bg-red-600 text-white rounded'>Cancel</button>
                                    </>
                                ) : (
                                    <span className="text-gray-500">No Action</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllOrders;
