import React, {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import { apiGetProduct, apiGetProducts } from '../../apis'
import Slider from 'react-slick'
import { formatMoney, renderStarFromNumber } from '../../utils/helpers'
import { Button, SelectQuantity, ProductExtraInfoItem, ProductInformation, CustomSlider } from '../../components'
import {productExtraInfoItem} from '../../utils/constants'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};

const DetailProduct = () => {
  const {pid, title, category} = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])
 

  const fetchProductData = async() => {
    const response = await apiGetProduct(pid)
    // console.log(response)
    if (response.success) setProduct(response.productData)
  }

  const fetchProducts = async() => {
    const response = await apiGetProducts({category})
    if (response.success) setRelatedProducts(response.products)
  }

  const handleQuantity = useCallback((number) => {
    if (!Number(number) || number < 1) {
      return
    } else {
      setQuantity(number)
    } 
  }, [])

  useEffect(() => {
    if (pid) {
      fetchProductData()
      fetchProducts()
    }
  }, [pid])
  
  const handleChangeQuantity = useCallback((flag) => {
      if (flag === 'minus' && quantity === 1) return
      if (flag === 'minus') setQuantity(prev => +prev - 1)
      if (flag === 'plus') setQuantity(prev => +prev + 1)
  }, [quantity])

  return (
    <div className='w-full'>
      <div className='h-[81px] bg-gray-100 flex items-center justify-center'>
        <div className='w-main'>
          <h3 className='font-semibold'>{title}</h3>
        </div>
      </div>

      <div className='w-main m-auto mt-6 flex'>
        <div className='w-2/5 flex flex-col gap-4 mr-8'>
          <img src={product?.thumb} alt='product' className='h-[458px] w-[458px] object-cover border mt-4'/>
        
          <div className='w-[458px]'>
            {
              (product?.images.length >= 3) ?
              <Slider {...settings}>

              { 
                product?.images?.map(el => (
                  <div key={el} className='px-2'>
                      <img src={el} alt='sub-product' className='h-[143px] w-[143px] border object-contain'/>
                  </div>
                  
                ))
              }
            </Slider>
            :
            <div className='flex items-center justify-center'>
              { 
                
                product?.images?.map(el => (
                  <div className='px-2' key={el}>
                      <img src={el} alt='sub-product' className='h-[143px] w-[143px] border object-contain'/>
                  </div>
                  
                ))
              }
            </div>
              
            }
            
          </div>
        </div>
        <div className='w-2/5 pr-[24px] flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold text-[30px]'>{formatMoney(product?.price)} VND</h2>
            
              <span className='text-sm text-main'>{`Remain: ${product?.quantity}`}</span>
            </div>
            <div className='flex items-center gap-1'>
              {renderStarFromNumber(product?.totalRatings)}
              <span className='text-sm italic text-main'>{`(Sold: ${product?.sold})`}</span>
            </div>
            <ul className='text-sm text-gray-500 list-disc pl-4 '>{product?.description?.map((el, index) => (<li key={index} className='leading-6' >{el}</li>))}</ul>
        
            <div className='flex flex-col gap-8'>
              <div className='flex items-center gap-4'>
                <span className='font-semibold'>Quantity </span>
                <SelectQuantity 
                  quantity={quantity} 
                  handleQuantity={handleQuantity}
                  handleChangeQuantity={handleChangeQuantity}
                  />
              </div>
              <Button name="Add to Cart" fullWidth/>
            </div>
        </div>
        <div className='w-1/5'>
          {
            productExtraInfoItem.map(el=>(
              <ProductExtraInfoItem 
                key={el.id}
                title={el.title}
                sub={el.sub}
                icon={el.icon}
              />
            ))
          }
        </div>
      </div>

      <div className='w-main m-auto mt-8'>
        <ProductInformation />
      </div>

      <div  className='w-main m-auto mt-8'>
        <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>OTHER CUSTOMERS ALSO BUY:</h3>
        <div className='w-full mt-4 mx-[-10px] mb-[100px]'>
          <CustomSlider products={relatedProducts} normal={true}/>
        </div>
      </div>
      

    </div>
  )
}

export default DetailProduct