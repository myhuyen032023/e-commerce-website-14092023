import React, {useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { Button, FeaturedProduct, InputForm } from 'components'
import { apiGetProducts, apiUpdateProduct } from 'apis'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'
import UpdateProduct from './UpdateProduct'
import { apiDeleteProduct } from 'apis'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import withBaseComponent from 'hocs/withBaseComponent'
import { setDiscountProducts } from 'store/products/productSlice'

const DealDailyManagement = ({dispatch}) => {
  const [params] = useSearchParams()
  const {register, formState: {errors}, handleSubmit, reset, watch} = useForm()
  const [products, setProducts] = useState([])
  
 

  const fetchProducts = async (params) => {
    const response = await apiGetProducts(params)
    if (response.success) {
      console.log(response)
      setProducts(response.products)
    }
  }

  const handleUpdateProduct = async (pid) => {
        const discount = document.getElementById(pid).value
        const response = await apiUpdateProduct({discount: discount}, pid)
        if (response.success) toast.success('Update successfully!') 
        else toast.error('Something went wrong...')

        const discountResponse = await apiGetProducts({limit: 30, sort: '-discount'})
        if (discountResponse.success) {
        dispatch(setDiscountProducts(discountResponse.products))
        console.log("Discount")
      }
  }

  const fetchDiscountProducts = async() => {
    const response = await apiGetProducts({limit: 30, sort: '-discount'})
    if (response.success) {
      dispatch(setDiscountProducts(response.products))
    }
}

useEffect(() => {
  fetchDiscountProducts()
}, [handleUpdateProduct])


  const queryDebounce = useDebounce(watch('q'), 800)
  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    if (queryDebounce) searchParams.q = queryDebounce
    fetchProducts(searchParams  )
  }, [params, queryDebounce])



  return (
    <div className='w-full flex flex-col gap-4 relative pl-8'>

      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Deal Daily</span>
      </h1>

      <div className='flex w-full justify-end items-center px-8'>
        <form className='w-[45%]'>

          <InputForm 
            id='q'
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search Product by title, description..."
          />
        </form>
      </div>

      <table className='table-auto'>

        <thead>
          <tr className='border bg-background py-2'>
            <th className='text-center'>STT</th>
            <th className='text-center'>Thumb</th>
            <th className='text-center'>Title</th>
            <th className='text-center'>Brand</th>
            <th className='text-center'>Category</th>
            <th className='text-center'>Price</th>
            <th className='text-center'>Quantity</th>
            <th className='text-center'>Sold</th>
            <th className='text-center'>Color</th>
            <th className='text-center'>Ratings</th>
            <th className='text-center'>UpdatedAt</th>
            <th className='text-center'>Discounts</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((el, indx) => (
            <tr key={el._id}>
              <td className='text-center'>{indx+1}</td>
              <td className='text-center'>
                <img src={el.thumb} alt="thumb" className='w-12 h12 object-cover' />
              </td>

              <td className='text-center'>{el.title}</td>
              <td className='text-center'>{el.brand}</td>
              <td className='text-center'>{el.category}</td>
              <td className='text-center'>{el.price}</td>
              <td className='text-center'>{el.quantity}</td>
              <td className='text-center'>{el.sold}</td>
              <td className='text-center'>{el.color}</td>
              <td className='text-center'>{el.totalRatings}</td>
              <td className='text-center'>{moment(el.updatedAt).format('DD/MM/YYYY')}</td>
              <td className='text-center gap-2'>
                
                  
                  <Button handleOnClick={() => handleUpdateProduct(el._id)}>-</Button>
                  <input className='px-2 w-[50px]' id={el._id} defaultValue={el.discount}
                  /> %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default withBaseComponent(DealDailyManagement)