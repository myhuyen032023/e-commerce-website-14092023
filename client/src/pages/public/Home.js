import {Sidebar, Banner, BestSeller, DealDaily, FeaturedProduct} from '../../components'

import {CustomSlider} from '../../components/'
import { useSelector } from 'react-redux'


const Home = () => {
  const {newProducts} = useSelector(state => state.products) 
  const {categories} = useSelector(state => state.app) 
  // const {isLoggedIn, current} = useSelector(state => state.user)
  // console.log({isLoggedIn, current})

  return (
    <>
    
    <div className='w-main flex pt-6'>
      <div className='flex flex-col gap-5 w-[25%] flex-auto'>
        <Sidebar />
        <DealDaily />
      </div>
      <div className='flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
        <Banner />
        <BestSeller />
      </div>
      
    </div>

    <div className='my-8 w-main'>
      <FeaturedProduct />
    </div>

    <div className='my-8 w-main'>
    <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>NEW ARRIVALS</h3>
      <div className='w-full mt-4 mx-[-10px] '>
        <CustomSlider products={newProducts}/>
      </div>
      
    </div>

    <div className='my-8 w-main '>
    <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>HOT COLLECTIONS</h3>
      <div className='flex flex-wrap gap-4 mt-4'>
        {
          categories?.map(el => (
            <div key={el._id} className='w-[396px]'>
              <div className='border flex p-4 gap-4 min-h-[190px]'>
                <img src={el?.image} alt='' className='w-[114px] object-cover h-[129px]'/>
                <div className='flex-1 text-gray-700'>
                  <h4 className='font-semibold uppercase'>{el.title}</h4>
                  <ul className='text-sm'>
                    {el.brand.map(item => (
                      <span className='flex gap-1 items-center text-gray-500'>
                        <li key={item}>{item}</li>
                      </span>
                    ))}
                  </ul>                
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </div>

    <div className='my-8 w-main'>
      <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>BLOGS POSTS</h3>

    </div>
    
    </>
    
  )
}

export default Home