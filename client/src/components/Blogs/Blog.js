import React, {useState, memo} from 'react'
import { formatMoney } from 'utils/helpers'
import label from 'assets/label.png'
import label_blue from 'assets/label-blue.png'
import {renderStarFromNumber} from 'utils/helpers'
import {SelectOption} from '..'
import icons from 'utils/icons'
import withBaseComponent from 'hocs/withBaseComponent'
import { apiUpdateCart } from 'apis'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({blogData, navigate}) => {
    const dispatch = useDispatch()
    
    return (
      <div className='w-full text-base px-[10px]'>
        <div className='w-full border p-[15px] flex flex-col items-center' 
            onClick={() => navigate(`/${blogData?._id}/${blogData?.title}`)}
            onMouseEnter={e => {
            e.stopPropagation()
            }} 
            onMouseLeave={e => {
              e.stopPropagation()
            }
          }>


          {/* <div className='w-full relative'>
            {isShowOption && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top '>
              <span onClick={(e) => handleClickOptions(e, 'QUICK_VIEW')}><SelectOption icon={<AiFillEye />}/></span>
              <span onClick={(e) => handleClickOptions(e, 'WISHLIST')}><SelectOption icon={<AiFillHeart />}/></span>
              
              {!current?.cart?.some(el => el.product?._id === productData?._id.toString()) && <span onClick={(e) => handleClickOptions(e, 'CART')}><SelectOption icon={<BsCartPlusFill />}/></span>}
            
            </div>}
            
            {
                !normal && 
                <img src={isNew ? label : label_blue} alt="" className={`absolute top-[-15px] left-[-40px]  w-[120px] h-[35px] object-cover`} />
                
            }
            
            <span className={`font-bold top-[-15px] left-[-10px] text-white absolute ${isNew ? '' : 'text-sm'}`}>{isNew? 'New': 'Trending'}</span>
            
            
        </div> */}
        <img src={blogData?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} alt='' className='w-[400px] h-[250px] object-contain' />
     
        <div className='flex flex-col gap-1 mt-[15px]  items-start w-full cursor-pointer hover:text-gray-800 h-[150px]'>
            <span className='text-[20px] font-semibold'>{blogData?.title}</span>
            <span className='flex'>{blogData?.description.replace(/(<([^>]+)>)/ig, '').substring(0, 80)}</span>
            <span className='hover:text-gray-800 cursor-pointer'>READ MORE...</span>
        </div>
        
        
        </div>   
      </div>
    )
}

export default withBaseComponent(memo(Blog))