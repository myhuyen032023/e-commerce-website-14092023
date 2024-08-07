import React, {useState, useEffect, useCallback} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Product , SearchItem} from '../../components'
import { apiGetProducts } from '../../apis'
import Masonry from 'react-masonry-css'
import { queries } from '@testing-library/react'
import { useSelector } from 'react-redux'
import withBaseComponent from 'hocs/withBaseComponent'

import { setSearchProducts } from 'store/products/productSlice'
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};
const Products = ({dispatch}) => {
  const {searchProducts} = useSelector(state => state.products)
  
  const [products, setProducts] = useState([])
  const [activeClick, setActiveClick] = useState(null)
  const [params] = useSearchParams()
  const {category} = useParams()
  console.log(category)
  
  const fetchProductsByCategory = async(data) => {
    const response = await apiGetProducts(data);
    
    if(response.success) setProducts(response.products)
      console.log(response.products)
  }

  useEffect(() => {
    console.log(searchProducts)
    
    if (searchProducts && searchProducts?.counts >0) {
      setProducts(searchProducts?.products)
    }  else {
      const queries = {}
      if (category && category !== 'products') queries.category = category
      for (let i of params.entries()){
        queries[i[0]] = i[1]
      } 


      let priceQuery = {}
      if (queries.to && queries.from) {
        priceQuery = { $and : [
          {price: {gte: queries.from}},
          {price: {lt: queries.to}}
        ]}

        delete queries.price  
      }

      if (queries.from) {
        queries.price = {gte: queries.from}
      }

      if (queries.to) {
        queries.price = {lt: queries.to}
      }
      delete queries.to
      delete queries.from  
      console.log(queries)
      fetchProductsByCategory({...priceQuery, ...queries})
    }

  }, [params, searchProducts, category])
  const changeActiveClick = useCallback((name) => {
    if(activeClick === name) setActiveClick(null)
    else setActiveClick(name)
  }, [activeClick])

  return (
    <div className='w-full'>
      <div className='h-[81px] bg-gray-100 flex items-center justify-center'>
        <div className='w-main'>
          <h3 className='font-semibold uppercase'>{category}</h3>
        </div>
      </div>

      <div className='w-main border p-4 flex justify-between mt-8 m-auto'>
        <div className='w-4/5 flex-auto flex flex-col gap-3'>
          <span className='font-semibold text-sm'>Filter by</span>
          <div className='flex items-center gap-4'>
            <SearchItem 
              name="price"
              activeClick={activeClick}
              changeActiveClick={changeActiveClick}
              type="input"
            />
            <SearchItem 
              name="color"
              activeClick={activeClick}
              changeActiveClick={changeActiveClick}
            />
          </div>
        </div>
        <div className='w-1/5'>
          Sort by
        </div>
      </div>
      <div className='mt-8 w-main m-auto'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {
            products?.map(el => (
              <Product 
                    id={el._id}
                    key={el._id}
                    productData={el}
                    normal={true}
                />
            ))
          }  
        </Masonry>
      </div>

      <div className='w-full h-[500px]'></div>

    </div>
  )
}

export default withBaseComponent(Products)