import { Button, SelectQuantity } from 'components'
import React, {useCallback, useState} from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { formatMoney } from 'utils/helpers'

const DetailCart = () => {

  const {current} = useSelector(state => state.user)
  const [quantity, setQuantity] = useState(0)

  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number)
  }
  const handleChangeQuantity = useCallback((flag) => {
    if (flag === 'minus' && quantity === 1) return
    if (flag === 'minus') setQuantity(prev => +prev - 1)
    if (flag === 'plus') setQuantity(prev => +prev + 1)
}, [quantity])

const handleCheckout= () => {
  toast.success('Checkout Successfully!')
}
  return (
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

      {current?.cart?.map(el => (
        <div key={el._id} className='w-main mx-auto font-bold grid grid-cols-10 py-3 border-b'>
           <span className='col-span-6 w-full text-center'>
            <div key={el._id} className='flex  gap-2'>
                  <img src={el.product.thumb} alt="thumb" className='w-28 h-28 object-cover' />
                  <div className='flex flex-col gap-1 items-start justify-center'>
                      <span className='font-sm text-main'>{el.product.title}</span>
                      <span className='text-[10px]'>{el.product.color}</span>
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
          <span>{formatMoney(el.product.price)} VND</span>
          </span>
      </div>
      ))}
      </div>

      <div className='w-main mx-auto flex flex-col justify-center items-end gap-3 mb-12'>
        <span>
          <span>Subtotal: </span>
          <span>{formatMoney(current?.cart?.reduce((sum, el) => sum + Number(el.product.price), 0))} VND</span>
        </span>

        <Button handleOnClick={() => handleCheckout()}>Checkout</Button>
      </div>
    </div>
  )
}

export default DetailCart