import React, {useState} from 'react'
import { formatMoney } from '../utils/helpers'
import label from '../assets/label.png'
import label_blue from '../assets/label-blue.png'
import {renderStarFromNumber} from '../utils/helpers'
import {SelectOption} from './'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
import path from '../utils/path'

const {AiFillEye, AiOutlineMenu, AiFillHeart} = icons
const Product = ({productData, isNew, normal, key}) => {
  const [isShowOption, setIsShowOption] = useState(false)
  return (
    <div className='w-full text-base px-[10px]'>
      <Link className='w-full border p-[15px] flex flex-col items-center' 
          to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`}
          onMouseEnter={e => {
          setIsShowOption(true)
          e.stopPropagation()
          }} 
          onMouseLeave={e => {
            e.stopPropagation()
            setIsShowOption(false)
          }
        }>
        <div className='w-full relative'>
          {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top '>
            <SelectOption icon={<AiFillEye />}/>
            <SelectOption icon={<AiOutlineMenu />}/>
            <SelectOption icon={<AiFillHeart />}/>
          </div>}
          
            <img src={productData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} alt='' className='w-[274px] h-[274px] object-cover' />
          {
            !normal && 
            <img src={isNew ? label : label_blue} alt="" className={`absolute top-[-15px] left-[-40px]  w-[120px] h-[35px] object-cover`} />

          }
          
          <span className={`font-bold top-[-15px] left-[-10px] text-white absolute ${isNew ? '' : 'text-sm'}`}>{isNew? 'New': 'Trending'}</span>
          
          
        </div>
   
      <div className='flex flex-col gap-1 mt-[15px]  items-start w-full'>
          <span className='line-clamp-1'>{productData?.title}</span>
          <span className='flex'>{renderStarFromNumber(productData?.totalRatings)}</span>
          <span>{formatMoney(productData?.price)} VND</span>
      </div>
      
      
      </Link>   
    </div>
  )
}

export default Product