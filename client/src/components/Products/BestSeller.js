import React, {useState, useEffect, memo} from 'react'
import { apiGetProducts } from 'apis/product'
import CustomSlider from 'components/Common/CustomSlider'
import { useDispatch} from 'react-redux'
import { getNewProducts } from 'store/products/asyncActions'

const tabs = [
    {id: 1, name: 'best sellers'},
    {id: 2, name: 'new arrivals'},
]

const BestSeller = () => {
    const [bestSellers, setBestSellers] =  useState([])
    const [newArrivals, setNewArrivals] =  useState([])
    const [activeTab, setActiveTab] = useState(1)
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const fetchProducts = async() => {
        const response = await Promise.all([apiGetProducts({sort: '-sold'}), apiGetProducts({sort: '-createdAt'})])
        if (response[0]?.success) {
            setBestSellers(response[0].products)
            setProducts(response[0].products)
        }
        if (response[1]?.success) setNewArrivals(response[1].products)
    }

    useEffect(() => {
        fetchProducts()
        dispatch(getNewProducts())
    }, [dispatch])

    useEffect(() => {
        if (activeTab===1) setProducts(bestSellers)
        if (activeTab===2) setProducts(newArrivals)
    }, [activeTab, bestSellers, newArrivals]) 

    // console.log(bestSellers)
  return (
    <div>
        <div className='flex text-[20px] pb-4 border-b-2 border-main'>
            {
                tabs.map(el => {
                    return <span
                        key={el.id}
                        pid={el.id}
                        className={`font-semibold uppercase  cursor-pointer pr-8  ${activeTab === el.id ? 'text-black-400  ':  'text-gray-400'} `}
                        onClick={() => {setActiveTab(el.id)}}
                    >
                        {el.name}
                    </span>
                    
                })
            }
        </div>

        <div className='mt-4 mx-[-10px]'>
            <CustomSlider products={products} activeTab={activeTab}/>
        </div>

        <div className='w-full flex gap-4 mt-8'>
            <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657' 
            alt='banner'
            className='flex-1 object-contain'/>

            <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
            alt='banner'
            className='flex-1 object-contain'/>
        </div>
    </div>
  )
}

export default memo(BestSeller)