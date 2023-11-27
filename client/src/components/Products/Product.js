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
import { getCurrent } from 'store/user/asyncActions'

const {AiFillEye, AiOutlineMenu, AiFillHeart, BsCartPlusFill} = icons
const Product = ({productData, isNew, normal, navigate}) => {
  const dispatch = useDispatch()
  const [isShowOption, setIsShowOption] = useState(false)
  const {current} = useSelector(state => state.user)

  const handleClickOptions = async(e, flag) => {
    e.stopPropagation()
    if(flag=== 'CART') {
      if(!current) return toast.info('Please login first')
      const response = await apiUpdateCart({pid: productData._id, color: productData.color})
    
      if(response.success) toast.success('Add to Cart Successfully!')
      else toast.error('Something went wrong')

      dispatch(getCurrent())
    }
  }
  return (
    <div className='w-full text-base px-[10px]'>
      <div className='w-full border p-[15px] flex flex-col items-center' 
          onClick={() => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
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
            <span onClick={(e) => handleClickOptions(e, 'QUICK_VIEW')}><SelectOption icon={<AiFillEye />}/></span>
            <span onClick={(e) => handleClickOptions(e, 'WISHLIST')}><SelectOption icon={<AiFillHeart />}/></span>
            
            {!current?.cart?.some(el => el.product._id === productData?._id.toString()) && <span onClick={(e) => handleClickOptions(e, 'CART')}><SelectOption icon={<BsCartPlusFill />}/></span>}
          
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
      
      
      </div>   
    </div>
  )
}

export default withBaseComponent(memo(Product))