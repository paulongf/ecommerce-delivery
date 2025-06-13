import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/order/seller');
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>

        {loading && <p>Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <p className="text-gray-500">No orders found.</p>
        )}

        {!loading && orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row justify-between md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 bg-white"
          >
            {/* Product Info */}
            <div className="flex gap-5 max-w-80">
              <img
                className="w-12 h-12 object-cover"
                src={assets.box_icon}
                alt="box icon"
              />
              <div className="flex flex-col gap-1">
                {order.items.map((item, idx) => (
                <p key={idx} className="font-medium truncate">
                  {item.product ? item.product.name : "[Produto removido]"}{' '}
                  <span className="text-primary">x {item.quantity}</span>
                </p>
              ))}
              </div>
            </div>

            {/* Address Info */}
            <div className="text-sm md:text-base text-black/60">
              <p className="text-black/80 font-medium">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street}, {order.address.city}</p>
              <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* Total */}
            <p className="font-semibold text-lg my-auto whitespace-nowrap">
              {currency}{order.amount}
            </p>

            {/* Order Details */}
            <div className="flex flex-col text-sm text-black/70 whitespace-nowrap">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p className={order.isPaid ? 'text-green-600' : 'text-red-600'}>
                Payment: {order.isPaid ? 'Paid' : 'Pending'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
