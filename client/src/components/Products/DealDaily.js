import React, { useEffect, useState, memo } from 'react'
import icons from 'utils/icons'
import { apiGetProducts } from 'apis/product'
import { formatMoney, renderStarFromNumber } from 'utils/helpers'
import CountDown from 'components/Common/CountDown'

const {AiFillStar, AiOutlineMenu} = icons
let idInterval
const DealDaily = () => {

  const [dealDaily, setDealDaily] = useState([])
  
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [expire, setExpired] = useState(false)

  const fetchDealDaily = async() => {
      const response = await apiGetProducts({limit: 1, page: Math.round(Math.random() * 3  ), totalRatings: 5})
      if (response.success) {
        setDealDaily(response.products[0])
        const h = 24 - new Date().getHours()
        const m = 60 - new Date().getMinutes()
        const s = 60 - new Date().getSeconds()
        setHour(h)
        setMinute(m)
        setSecond(s)
      } else {
        setHour(0)
        setMinute(59)
        setSecond(59)
      }
  }

  useEffect(() => {
    idInterval && clearInterval(idInterval)
    fetchDealDaily()
    
  }, [expire])

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
  }, [second, minute, hour, expire])

  

  return (
    <div className='border w-full flex-auto'>
        <div className='flex items-center justify-between'>
            
            <span className='flex-3 flex justify-center'><AiFillStar size={20} color='#DD1111'/></span>
            <span className='flex-4 font-bold text-[20px] text-center'>DEAL DAILY</span>
            <span className='flex-3'></span>
        </div>

          <div className='w-full flex flex-col items-center pt-8 px-4 gap-2'>
          <img src={dealDaily?.thumb || 'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png'} alt='' className='w-full object-cover' />
          
          
          <span className='line-clamp-1'>{dealDaily?.title}</span>
          <span className='flex'>{renderStarFromNumber(dealDaily?.totalRatings)}</span>
          <span>{formatMoney(dealDaily?.price)} VND</span>
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

export default memo(DealDaily)