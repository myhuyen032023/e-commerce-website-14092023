import { apiRemoveCart } from 'apis'
import { Button, CartItem, SelectQuantity } from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import React, {memo, useCallback, useState} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getCurrent } from 'store/user/asyncActions'
import { updateCart } from 'store/user/userSlice'
import { formatMoney } from 'utils/helpers'
import { Link } from 'react-router-dom'
import path from 'utils/path'

const DetailCart = ({dispatch, navigate}) => {

  const {currentCart} = useSelector(state => state.user)

  const handleUpdateQuantity = (pid, quantity) => {
    console.log({pid, quantity})
    dispatch(updateCart({pid, quantity}))
  }

  
  

  return (
    <div>
      {
        currentCart?.length > 0 ? 
        <div className='w-full'>
      <div className='h-[81px] flex justify-center items-center bg-gray-100'> 
      <h3 className='text-3xl font-bold tracking-tight my-8'>My Cart</h3>

      </div>
      <div className='flex flex-col border my-8 w-main mx-auto'>
      <div className='w-main mx-auto font-bold grid grid-cols-10 py-3 bg-gray-800 text-white '>
        <span className='col-span-6 w-full text-center'>Products</span>
        <span className='col-span-1 w-full text-center'>Quantity</span>
        <span className='col-span-3 w-full text-center'>Price</span>
      </div>

      {currentCart?.map(el => (
        <CartItem el={el} key={el._id} handleUpdateQuantity={handleUpdateQuantity} defaultQuantity={el.quantity}/>
      ))}
      </div>

      {currentCart?.length > 0 && <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mb-12'>
        <span>
          <span>Subtotal: </span>
          <span>{formatMoney(currentCart?.reduce((sum, el) =>  +el?.product?.price * el.quantity + sum, 0))} VND</span>
        </span>
        
        <Button handleOnClick={() => navigate(`/${path.CHECKOUT}`)} >Checkout</Button>
      </div>}
    </div>
    :
    <h1>Cart is Empty</h1>
      }
    </div>
  )
}

export default withBaseComponent(memo(DetailCart))