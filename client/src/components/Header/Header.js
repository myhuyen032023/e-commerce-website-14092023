import React, { Fragment, memo , useEffect, useState} from 'react'
import logo from 'assets/logo1.png'
import icons from 'utils/icons'
import {Link} from 'react-router-dom'
import path from 'utils/path'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'store/user/userSlice'
import withBaseComponent from 'hocs/withBaseComponent'
import { showCart } from 'store/app/appSlice'
const Header = ({navigate}) => {
  const dispatch = useDispatch()
  const {current} = useSelector(state => state.user)
  const [isShowOption, setIsShowOption] = useState(false)

  const {RiPhoneFill, MdOutlineMailOutline, BsFillHandbagFill, FaUserCircle} = icons
  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById('profile')
      if (!profile?.contains(e.target) && isShowOption) setIsShowOption(false)
    }

    document.addEventListener('click', handleClickoutOptions)

    return () => {
      document.removeEventListener('click', handleClickoutOptions)
    }
  }, [])
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
        {
          current && <Fragment>
            
            <div 
              onClick={() => navigate(`/${path.DETAIL_CART}`)}
              className='flex items-center justify-center gap-2 border-r px-6 cursor-pointer'>
              <BsFillHandbagFill color='red'/>
              <span>{`${current?.cart?.length || 0} item(s)`}</span>
            </div>
            <div 
              id='profile'
              onClick={() => setIsShowOption(prev => !prev)}
              className='flex items-center justify-center px-6 gap-2 cursor-pointer relative'>
              <FaUserCircle color='red'
              
              />
              <span>Profile</span>
             {isShowOption &&  <div className='absolute top-full left-[16px] flex flex-col bg-gray-100 border min-w-[150px] py-2'>
                <Link to={`/${path.MEMBER}/${path.PERSONAL}`} className='p-2 w-full hover:bg-sky-100'>Personal</Link>
              {
                current?.role === 'admin' && <Link className='p-2 w-full hover:bg-sky-100' to={`/${path.ADMIN}/${path.DASHBOARD}`}>Admin Workspace</Link>
              }
                
                <span onClick={ () => {
                  dispatch(logout())
                  navigate('/')
                }} className='p-2 w-full hover:bg-sky-100' >Logout</span>
              </div>}
            </div>
            </Fragment>
        }
      </div>
    </div>
  )
}

export default withBaseComponent(memo(Header))