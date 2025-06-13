import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])
  const { currency, axios, user } = useAppContext()

  const fetchMyOrders = async () => {
    try {
      if (!user?._id) return

      const { data } = await axios.post('/api/order/user', { userId: user._id })
      if (data.success) {
        setMyOrders(data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyOrders()
    }
  }, [user])

  return (
    <div className='mt-16 pb-16'>
      <div className='flex flex-col items-end w-max mb-8'>
        <p className='text-2xl font-medium uppercase'>My orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>
      {myOrders.map((order, index) => (
        <div
          key={order._id || index}
          className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'
        >
          <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
            <span>OrderId: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>
              Total Amount: {currency}
              {order.amount}
            </span>
          </p>
          {order.items.map((item, idx) => {
            const imageUrl = item.product?.image?.[0] || null

            return (
              <div
                key={idx}
                className={`relative bg-white text-gray-500/70 ${
                  order.items.length !== idx + 1 ? 'border-b' : ''
                } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
              >
                <div className='flex items-center mb-4 md:mb-0'>
                  <div className='bg-primary/10 p-4 rounded-lg flex justify-center items-center w-20 h-20'>
                    {imageUrl ? (
                      <img
                        className='w-16 h-16 object-contain'
                        src={imageUrl}
                        alt={item.product?.name || 'Product image'}
                      />
                    ) : (
                      <span className='text-gray-400'>No image</span>
                    )}
                  </div>
                  <div className='ml-4'>
                    <h2 className='text-xl font-medium text-gray-800'>
                      {item.product?.name || '[Produto removido]'}
                    </h2>
                    <p>Category: {item.product?.category || 'N/A'}</p>
                  </div>
                </div>
                <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                  <p>Quantity: {item.quantity || 1}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <p className='text-primary text-lg font-medium'>
                  Amount: {currency}
                  {item.product ? item.product.offerPrice * (item.quantity || 1) : '0'}
                </p>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default MyOrders
