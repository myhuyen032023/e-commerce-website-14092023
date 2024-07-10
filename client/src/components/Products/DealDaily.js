import React, { useEffect, useState, memo } from 'react'
import icons from 'utils/icons'
import { apiGetProducts } from 'apis/product'
import { formatMoney, renderStarFromNumber } from 'utils/helpers'
import CountDown from 'components/Common/CountDown'
import withBaseComponent from 'hocs/withBaseComponent'
import {setDiscountProducts} from 'store/products/productSlice'
import { useSelector } from 'react-redux'
const {AiFillStar, AiOutlineMenu} = icons
let idInterval
const DealDaily = () => {

  const [dealDailyIndex, setDealDailyIndex] = useState(0)
  const {discountProducts} = useSelector(state => state.products)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [expire, setExpired] = useState(false)

  // const fetchDealDaily = async() => {
  //     if (response.success) {
  //       const h = 24 - new Date().getHours()
  //       const m = 60 - new Date().getMinutes()
  //       const s = 60 - new Date().getSeconds()
  //       setHour(h)
  //       setMinute(m)
  //       setSecond(s)
  //     } else {
  //       setHour(0)
  //       setMinute(59)
  //       setSecond(59)
  //     }
  // }
console.log(discountProducts)

  useEffect(() => {
    idInterval && clearInterval(idInterval)
    if (discountProducts.length > 0) {
      setDealDailyIndex((prevIndex) => (prevIndex + 1) % discountProducts.length)
    }
    const h = 24 - new Date().getHours()
    const m = 60 - new Date().getMinutes()
    const s = 60 - new Date().getSeconds()
    setHour(h)
    setMinute(m)
    setSecond(s)

    console.log(dealDailyIndex)
  }, [expire, discountProducts])

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) {
        setSecond(prev => prev -1)
      } else {
        if (minute > 0) {
          setMinute(prev => prev - 1)
          setSecond(60)
        } else {
          if (hour > 0) {
            setHour(prev => prev -1) 
            setMinute(60)
            setSecond(60)
          } else {
            setExpired(!expire)
          }
        }
      }
    }, 1000)
    return () => {
      clearInterval(idInterval)
    }

  
  }, [second, minute, hour])

  

  return (
    <div className='border w-full flex-auto'>
        <div className='flex items-center justify-between'>
            
            <span className='flex-3 flex justify-center'><AiFillStar size={20} color='#DD1111'/></span>
            <span className='flex-4 font-bold text-[20px] text-center'>DEAL DAILY</span>
            <span className='flex-3'></span>
        </div>

          <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
          <img src={discountProducts[dealDailyIndex]?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} alt='' className='w-full object-cover' />
          
          
          <span className='line-clamp-1'>{discountProducts[dealDailyIndex]?.title}</span>
          <span className='flex'>{renderStarFromNumber(discountProducts[dealDailyIndex]?.totalRatings)}</span>
          {discountProducts[dealDailyIndex]?.discount > 0 && <span className='line-through'>{formatMoney(Math.round(discountProducts[dealDailyIndex]?.price))} VND</span>}
          <span className='text-main font-medium'>{formatMoney(Math.round(discountProducts[dealDailyIndex]?.price * discountProducts[dealDailyIndex]?.discount / 100))} VND</span>
          </div>
          
        <div className='px-4 mt-8'> 

          <div className='flex justify-center gap-2 items-center mb-4'>
            <CountDown unit={"Hours"} number={hour}/>
            <CountDown unit={"Minutes"} number={minute}/>
            <CountDown unit={"Seconds"} number={second}/>
          </div>
          <button type='button' className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium'>
            <AiOutlineMenu />
            <span>Options</span>
          </button>
        </div>
    </div>
  )
}

export default withBaseComponent(memo(DealDaily))