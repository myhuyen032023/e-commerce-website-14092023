import withBaseComponent from 'hocs/withBaseComponent'
import {Sidebar, Banner, BestSeller, DealDaily, FeaturedProduct} from '../../components'
import {CustomSlider} from '../../components/'
import { useSelector } from 'react-redux'

import RecommendedProduct from 'components/Products/RecommendedProduct'

import { apiGetRecommendProducts, apiGetProducts } from 'apis';
import { useEffect, useState } from 'react'
import { setSearchProducts, setDiscountProducts } from 'store/products/productSlice'
const Home = ({navigate, dispatch}) => {
  const {newProducts, searchProducts} = useSelector(state => state.products) 
  const {categories} = useSelector(state => state.app) 
  const {blogs} = useSelector(state => state.blogs)
  
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [visibleProductIndex, setVisibleProductIndex] = useState(0);
  const [isShowing, setIsShowing] = useState(false);

  const getRecommendProduct = async() => {
    const response = await apiGetRecommendProducts();
    if (response.success) {
      setRecommendedProducts(response.recommendedItems)
    }
  }

  const fetchDiscountProducts = async() => {
    const response = await apiGetProducts({limit: 30, sort: '-discount'})
    if (response.success) {
      dispatch(setDiscountProducts(response.products))
      console.log("discountProducts")
    }
}

useEffect(() => {
  
  fetchDiscountProducts()
  
}, [])


  useEffect(() => {
    getRecommendProduct()
    if (searchProducts) {
      dispatch(setSearchProducts([]))
      
    }
    console.log(searchProducts)
  }, []);



  useEffect(() => {
    const interval = setInterval(() => {
      setIsShowing(true);

      setTimeout(() => {
        setIsShowing(false);

        setVisibleProductIndex((prevIndex) => (prevIndex + 1) % recommendedProducts.length);
      }, 3000);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [recommendedProducts]);

  const currentProduct = recommendedProducts[visibleProductIndex];



  
  return (
    <>
    
    <div className='w-main flex pt-6 sticky'>
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
    <h3 className='text-[20px] font-semibold py-[15px] border-b-2 border-main'>Blogs</h3>
      <div className='w-full mt-4 mx-[-10px] '>
        <CustomSlider blogs={blogs}/>
      </div>
      
    </div>

    

    <div className="fixed bottom-0 left-0 flex flex-wrap gap-4 shadow-2xl rounded-2xl bg-white max-w-[400px]">
    {isShowing && currentProduct && (
      <RecommendedProduct
      image={currentProduct.thumb}
      name={currentProduct.title}
      price={currentProduct.price}
      link={`/${currentProduct.category.toLowerCase()}/${currentProduct._id}/${currentProduct.title}`}
      />
    )}
      </div>
    
    </>
    
  )
}

export default withBaseComponent(Home)