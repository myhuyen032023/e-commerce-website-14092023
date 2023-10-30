import React , {memo} from 'react'

const SelectQuantity = ({quantity, handleQuantity, handleChangeQuantity}) => {
  return (
    <div>
        <span className='p-2 border-r border-black cursor-pointer' onClick={() =>handleChangeQuantity("minus")}>-</span>
        <input className='py-2 outline-none w-[50px] text-center' type="text" value={quantity} onChange={e => handleQuantity(e.target.value)}/>
        <span className='p-2 border-l border-black cursor-pointer' onClick={() =>handleChangeQuantity("plus")}>+</span>
    </div>
  )
}

export default memo(SelectQuantity)