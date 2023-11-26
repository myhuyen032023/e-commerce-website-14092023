import { apiUpdateCart } from 'apis';
import Button from 'components/Buttons/Button';
import withBaseComponent from 'hocs/withBaseComponent';
import React, { memo } from 'react'
import { MdClose } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { showCart } from 'store/app/appSlice';
import { formatMoney } from 'utils/helpers';
import path from 'utils/path';

const Cart = ({dispatch, navigate}) => {

    const {current} = useSelector(state => state.user)

    

  return (
    <div className='w-[400px] h-screen  bg-black text-white p-6 grid grid-rows-10'>
        <header className=' border-b font-bold text-2xl border-gray-800 flex justify-between items-center row-span-1 h-full'>
            <span>Your Cart</span>
            <span className='cursor-pointer p-2'><MdClose   onClick={() => dispatch(showCart())}/> </span>
        </header>

        <section className='row-span-6 h-full max-h-full overflow-y-auto gap-3 flex flex-col'>
            {current?.cart && current.cart?.map(el => (
                <div key={el._id} className='flex  gap-2'>
                    <img src={el.product.thumb} alt="thumb" className='w-16 h-16 object-cover' />
                    <div className='flex flex-col gap-1'>
                        <span className='font-sm'>{el.product.title}</span>
                        <span className='text-[10px]'>{el.product.color}</span>
                        <span className='text-sm'>{formatMoney(el.product.price)} VND</span>
                    </div>

                </div>
            ))}
        </section>

        <div className='row-span-3 h-full '>
            <div className='flex items-center my-4 justify-between border-t pt-4'>
                <span>Subtotal:</span>
                <span>{formatMoney(current?.cart?.reduce((sum, el) => sum + Number(el.product.price), 0))} VND</span>
            </div>

            <Button handleOnClick={()=> {
                navigate(`/${path.DETAIL_CART}`)
                dispatch(showCart())
            }} fullWidth>Shopping Cart</Button>
        </div>
    </div>
  )
}

export default withBaseComponent(memo(Cart))