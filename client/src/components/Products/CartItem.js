import { apiRemoveCart } from 'apis'
import SelectQuantity from 'components/Common/SelectQuantity'
import withBaseComponent from 'hocs/withBaseComponent'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getCurrent } from 'store/user/asyncActions'
import { formatMoney } from 'utils/helpers'

const CartItem = ({el, handleUpdateQuantity, defaultQuantity=1, dispatch}) => {
  const [quantity, setQuantity] = useState(() => defaultQuantity)
    
    const handleQuantity = (number) => {
        if (+number > 1) setQuantity(number)
         
      }
      const handleChangeQuantity = useCallback((flag) => {
        if (flag === 'minus' && quantity === 1) removeItemFromCart(el?.product?._id)
        if (flag === 'minus') setQuantity(prev => +prev - 1)
        if (flag === 'plus') setQuantity(prev => +prev + 1)
    }, [quantity])

    const removeItemFromCart = async(pid) => {
        await apiRemoveCart(pid)
        dispatch(getCurrent())
    }

    useEffect(() => {
      handleUpdateQuantity && handleUpdateQuantity(el.product?._id, quantity)
    }, [quantity])
  
  return (
    <div>
        <div  className='w-main mx-auto font-bold grid grid-cols-10 py-3 border-b'>
           <span className='col-span-6 w-full text-center'>
            <div  className='flex  gap-2 px-4 py-3'>
                  <img src={el?.product?.thumb} alt="thumb" className='w-28 h-28 object-cover' />
                  <div className='flex flex-col gap-1 items-start justify-center'>
                      <span className='font-sm text-main'>{el?.product?.title}</span>
                      <span className='text-[10px]'>{el?.product?.color}</span>
                  </div>

              </div>
             </span>        
          <span className='col-span-1 w-full text-center'>
                  <div className='flex items-center h-full'>
                  <SelectQuantity
                  quantity={quantity} 
                  handleQuantity={handleQuantity}
                  handleChangeQuantity={handleChangeQuantity}
                  />
                  </div>
          </span>
          <span className='col-span-3 w-full text-center h-full flex items-center justify-center'>
          <span>{formatMoney(el?.product?.price * quantity)} VND</span>
          </span>
          
      </div>
      
    </div>
  )
}

export default withBaseComponent(memo(CartItem))