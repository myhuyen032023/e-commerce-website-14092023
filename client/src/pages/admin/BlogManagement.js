import React, {useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { FeaturedProduct, InputForm } from 'components'
import { apiGetBlogs, apiDeleteBlog } from 'apis'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'
import useDebounce from 'hooks/useDebounce'
import UpdateProduct from './UpdateProduct'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import UpdateBlog from './UpdateBlog'

const BlogManagement = () => {
    const [params] = useSearchParams()
    const {register, formState: {errors}, handleSubmit, reset, watch} = useForm()
    // const [products, setProducts] = useState([])
    const [blogs, setBlogs] = useState([])
    const [update, setUpdate] = useState(false)
    // const [editProduct, setEditProduct] = useState(null)
    const [editBlog, setEditBlog] = useState(null)
    
    const render = useCallback(() => {
      setUpdate(!update)
    }, [update])
  
    const fetchBlogs = async () => {
      const response = await apiGetBlogs()
      if (response.success) {
        console.log(response)
        setBlogs(response.blogs)
      }
    }
  
    const handleDeleteBlog = (bid) => {
      Swal.fire({
        title: 'Are you sure?', 
        text: 'Are you sure you want to Delete this Blog?', 
        icon: 'warning', 
        showCancelButton: true}).then( async(rs) => {
        if (rs.isConfirmed) {
          const response = await apiDeleteBlog(bid)
          if (response.success) toast.success('Delete successfully!') 
          else toast.error('Something went wrong...')
        }
      })
      
    }
  
    // const queryDebounce = useDebounce(watch('q'), 800)
    useEffect(() => {
      // const searchParams = Object.fromEntries([...params])
      // if (queryDebounce) searchParams.q = queryDebounce
      fetchBlogs()
    }, [])
  
  
    return (
      <div className='w-full flex flex-col gap-4 relative pl-8'>
        
        {
          editBlog && <div className='absolute inset-0 bg-gray-100 z-50'>
            <UpdateBlog editBlog={editBlog} render={render} setEditBlog={setEditBlog}/>
          </div>
        }
  
        <div className='h-[70px] w-full'></div>
        <div className='p-4 border-b w-full flex justify-between items-center fixed top-0'>
          <h1 className='text-3xl font-bold tracking-tight'>Blog Manangement</h1>
        </div>
  
        {/* <div className='flex w-full justify-end items-center px-8'>
          <form className='w-[45%]'>
  
            <InputForm 
              id='q'
              register={register}
              errors={errors}
              fullWidth
              placeholder="Search Blog by title, description..."
            />
          </form>
        </div> */}
  
        <table className='table-auto'>
  
          <thead>
            <tr className='border bg-background py-2'>
              <th className='text-center'>STT</th>
              <th className='text-center'>Thumb</th>
              <th className='text-center'>Title</th>
              <th className='text-center'>UpdatedAt</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
  
          <tbody>
            {blogs?.map((el, indx) => (
              <tr key={el._id}>
                <td className='text-center'>{indx+1}</td>
                <td className='text-center'>
                  <img src={el.thumb} alt="thumb" className='w-12 h12 object-cover' />
                </td>
  
                <td className='text-center'>{el.title}</td>
                <td className='text-center'>{moment(el.updatedAt).format('DD/MM/YYYY')}</td>
                <td className='text-center'>
                  
                    <span className='px-2 text-blue-700 hover:underline cursor-pointer'
                      onClick={() => setEditBlog(el)}
                    >Edit</span>
                    <span onClick={() => handleDeleteBlog(el._id)} className='px-2 text-blue-700 hover:underline cursor-pointer'>Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

export default BlogManagement