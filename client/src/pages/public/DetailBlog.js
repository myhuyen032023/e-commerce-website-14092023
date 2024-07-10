import React, {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import { apiGetBlog, apiGetProduct, apiGetProducts, apiUpdateCart } from 'apis'
import Slider from 'react-slick'
import { formatMoney, renderStarFromNumber } from 'utils/helpers'
import { Button, SelectQuantity, ProductExtraInfoItem, ProductInformation, CustomSlider } from 'components'
import {productExtraInfoItem} from 'utils/constants'
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import withBaseComponent from 'hocs/withBaseComponent'
import { getNewProducts } from 'store/products/asyncActions'
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

const DetailBlog = ({dispatch}) => {
    const {bid, title} = useParams()
    const [blog, setBlog] = useState(null)
    const [update, setUpdate] = useState(false)
   
  
    const fetchBlogData = async() => {
      const response = await apiGetBlog(bid)
      // console.log(response)
      if (response.success) {
        setBlog(response.blogData)
        
      }
    }
  
    
  
   
  
    const rerender = useCallback(() => {
      setUpdate(!update)
    },[update])
  
    useEffect(() => {
      if (bid) {
        fetchBlogData()
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [bid, update])
    
   
    return (
      <div className='w-full'>
        <div className='h-[81px] bg-gray-100 flex items-center justify-center'>
          <div className='w-main'>
            <h3 className='font-semibold'>{title}</h3>
          </div>
        </div>
  
        <div className='w-main m-auto mt-6 flex'>
          <div className='w-full flex flex-col gap-4 mr-8'>
            <img src={blog?.thumb} alt='product' className=' object-cover border mt-4'/>
            <span className='mt-4 text-xm line-clamp-[10] mb-8'>{blog?.description.replace(/(<([^>]+)>)/ig, '')}</span>
            
            
          </div>
          
          
        </div>
  
        
  
        {/* <div  className='w-main m-auto mt-8'>
          <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>OTHER CUSTOMERS ALSO BUY:</h3>
          <div className='w-full mt-4 mx-[-10px] mb-[100px]'>
            <CustomSlider products={relatedProducts} normal={true}/>
          </div>
        </div> */}
        
  
      </div>
    )
}

export default DetailBlog