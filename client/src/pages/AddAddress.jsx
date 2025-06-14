import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none
    text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name] || ''}
    required
  />
)

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext()

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/address/add', {
        address,
        userId: user._id,
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/cart')
    }
  }, [user, navigate])

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                address={address}
                name='firstName'
                placeholder='First Name'
                type='text'
                handleChange={handleChange}
              />
              <InputField
                address={address}
                name='lastName'
                placeholder='Last Name'
                type='text'
                handleChange={handleChange}
              />
            </div>
            <InputField
              address={address}
              name='email'
              placeholder='Email address'
              type='email'
              handleChange={handleChange}
            />
            <InputField
              address={address}
              name='street'
              placeholder='Street'
              type='text'
              handleChange={handleChange}
            />
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                address={address}
                name='city'
                placeholder='City'
                type='text'
                handleChange={handleChange}
              />
              <InputField
                address={address}
                name='state'
                placeholder='State'
                type='text'
                handleChange={handleChange}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InputField
                address={address}
                name='zipcode'
                placeholder='Zip code'
                type='text'  
                handleChange={handleChange}
              />
              <InputField
                address={address}
                name='country'
                placeholder='Country'
                type='text'
                handleChange={handleChange}
              />
            </div>
            <InputField
              address={address}
              name='phone'
              placeholder='Phone'
              type='text'
              handleChange={handleChange}
            />

            <button
              className='w-full mt-6 bg-primary text-white py-3
                        hover:bg-primary-dull transition cursor-pointer uppercase'
            >
              Save address
            </button>
          </form>
        </div>
        <img
          className='md:mr-16 mb-16 md:mt-0'
          src={assets.add_address_iamge}
          alt='Add address'
        />
      </div>
    </div>
  )
}

export default AddAddress
