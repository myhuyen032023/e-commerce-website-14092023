import React , {memo} from 'react'
import icons from 'utils/icons'

const {MdOutlineEmail} = icons
const Footer = () => {
  return (
    <div className='w-full'>
      <div className='h-[103px] w-full bg-main flex items-center justify-center'>
        <div className='w-main flex items-center justify-between'>
          <div className='flex flex-col flex-1'>
            <span className='text-[20px] text-gray-100'>SIGN UP TO NEWSLETTER</span>
            <small className='text-[13px] text-gray-300'>Subsribe now and receive weekly newsletter</small>
          </div>

          <div className='flex-1 flex items-center'>
            <input
              className='p-4 rounded-full w-full bg-[#f04646] outline-none text-gray-100 placeholder:text-sm
              placeholder:text-gray-200 placeholder:italic placeholder:opacity-50'
              type='text'
              placeholder='Email adress'
            />

            <div className='h-[56px] w-[56px] bg-[f04646] rounded-r-full flex items-center justify-center text-white'>
              <MdOutlineEmail size={16}/>
            </div>
          </div>
        </div>
      </div>

      <div className='h-[407px] bg-gray-800 w-full flex items-center justify-center text-white text-[13px]'>
          <div className='w-main flex'>
            <div className='flex-2 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[15px] font-bold border-l-2 border-main p-[15px]'>
              ABOUT US
              </h3>

              <span>
                <span>Address: </span>
                <span className='opacity-70'>474 Ontario St Toronto, ON M4X 1M7 Canada</span>
              </span>
              <span>
              <span>Phone: </span>
                <span className='opacity-70'> (+1234)56789xxx</span>
              </span>
              <span>
              <span>Mail: </span>
                <span className='opacity-70'> tadathemes@gmail.com</span>
              </span>
            </div>
            

            <div className='flex-1 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[15px] font-bold border-l-2 border-main p-[15px]'>INFORMATION</h3>
              <span>Typography</span>
              <span>Store Location</span>
              <span>Today's Deals</span>
              <span>Contact</span>

            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[15px] font-bold border-l-2 border-main p-[15px]'>WHO WE ARE</h3>
              




              <span>Help</span>
              <span>Free Shipping</span>
              <span>FAQs</span>
              <span>Return & Exchange</span>

            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <h3 className='mb-[20px] text-[15px] font-bold border-l-2 border-main p-[15px]'>#DIGITALWORLDSTORE</h3>

            </div>
          </div>
        </div>
    </div>
  )
}

export default memo(Footer)