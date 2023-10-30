import React from 'react'
import logo from '../assets/logo1.png'
import icons from '../utils/icons'
import {Link} from 'react-router-dom'
import path from '../utils/path'

const Header = () => {
  const {RiPhoneFill, MdOutlineMailOutline, BsFillHandbagFill, FaUserCircle} = icons
  return (
    <div className='w-main flex justify-between h-[110px] py-[35px]'>
      <Link to={path.HOME}>
      <img src={logo} alt='logo' className='w-[234px] mb-2 object-contain'/>
      
      </Link>
      <div className='flex text-[13px]'>
        <div className='flex-col items-center border-r px-6'>
          <span className='flex gap-4 items-center'>
            <RiPhoneFill color='red'/>
            <span className='font-semibold'> (+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className='flex flex-col items-center border-r px-6'>
          <span className='flex gap-4 items-center'>
            <MdOutlineMailOutline color='red'/>
            <span className='font-semibold'>SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div >
        <div className='flex items-center justify-center gap-2 border-r px-6 cursor-pointer'>
          <BsFillHandbagFill color='red'/>
          <span>0 item(s)</span>
        </div>
        <div className='flex items-center justify-center px-6 gap-2 cursor-pointer'>
          <FaUserCircle color='red'/>
          <span>Profile</span>
        </div>
      </div>
    </div>
  )
}

export default Header