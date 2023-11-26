import React, {useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { FeaturedProduct, InputForm } from 'components'
import { apiGetProducts } from 'apis'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'
import UpdateProduct from './UpdateProduct'
import { apiDeleteProduct } from 'apis'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'


const ProductManagement = () => {
  const [params] = useSearchParams()
  const {register, formState: {errors}, handleSubmit, reset, watch} = useForm()
  const [products, setProducts] = useState([])
  const [update, setUpdate] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  
  const render = useCallback(() => {
    setUpdate(!update)
  }, [update])

  const fetchProducts = async (params) => {
    const response = await apiGetProducts(params)
    if (response.success) {
      console.log(response)
      setProducts(response.products)
    }
  }

  const handleDeleteProduct = (pid) => {
    Swal.fire({
      title: 'Are you sure?', 
      text: 'Are you sure you want to Delete this product?', 
      icon: 'warning', 
      showCancelButton: true}).then( async(rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteProduct(pid)
        if (response.success) toast.success('Delete successfully!') 
        else toast.error('Something went wrong...')
      }
    })
    
  }

  const queryDebounce = useDebounce(watch('q'), 800)
  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    if (queryDebounce) searchParams.q = queryDebounce
    fetchProducts(searchParams  )
  }, [params, queryDebounce])


  return (
    <div className='w-full flex flex-col gap-4 relative pl-8'>
      
      {
        editProduct && <div className='absolute inset-0 bg-gray-100 z-50'>
          <UpdateProduct editProduct={editProduct} render={render} setEditProduct={setEditProduct}/>
        </div>
      }

      <div className='h-[70px] w-full'></div>
      <div className='p-4 border-b w-full flex justify-between items-center fixed top-0'>
        <h1 className='text-3xl font-bold tracking-tight'>Product Manangement</h1>
      </div>

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
            <th className='text-center'>Actions</th>
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
              <td className='text-center'>
                
                  <span className='px-2 text-blue-700 hover:underline cursor-pointer'
                    onClick={() => setEditProduct(el)}
                  >Edit</span>
                  <span onClick={() => handleDeleteProduct(el._id)} className='px-2 text-blue-700 hover:underline cursor-pointer'>Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductManagement