import React, {memo} from 'react'
import {renderStarFromNumber, formatMoney} from 'utils/helpers'

const ProductCard = ({price, totalRatings, title, image}) => {
  return (
    <div className='w-1/3 flex-auto px-[10px] mb-[20px]'>
      <div className='flex w-full border'>
          <img src={image} alt='product' className='w-[90px] object-contain p-4'/>
          <div className='flex flex-col gap-1 mt-[15px]  items-start w-full text-xs'>
             <span className='line-clamp-1 lowercase'>{title}</span>
            <span className='flex h-4 '>{renderStarFromNumber(totalRatings)}</span>
            <span>{formatMoney(price)} VND</span>
          </div>
      </div>

      
        
    </div>

    
  )
}

export default memo(ProductCard)