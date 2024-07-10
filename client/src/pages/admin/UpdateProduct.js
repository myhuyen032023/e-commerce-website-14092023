import { Button, InputForm, MarkdownEditor, Select } from 'components'
import React, {useCallback, useEffect, useState, memo} from 'react'
import { set, useForm } from 'react-hook-form'
import { getBase64, validate } from 'utils/helpers'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { apiUpdateProduct } from 'apis'
const UpdateProduct = ({editProduct, render, setEditProduct}) => {
    const {categories} = useSelector(state => state.app)
    const {register, handleSubmit, formState:{errors}, reset, watch} = useForm()
    const [preview, setPreview] = useState({
        thumb: '',
        images: []
      })  
    
      const [payload, setPayload] = useState({
        description: ''
      })

      

      const [invalidFields, setInvalidFields] = useState([])
        const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])

    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: base64Thumb}))
      }
    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for(let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            
            toast.warning('File not supported')
            return
            } else {

            const base64 = await getBase64(file)
            imagesPreview.push(base64)
            }
        }
        setPreview(prev => ({...prev, images: imagesPreview}))
    
    }
      
    
    
      

    useEffect(() => {
        reset({
            title: editProduct?.title || '',
            price: editProduct?.price || '',
            quantity: editProduct?.quantity || '',
            color: editProduct?.color || '',
            category: editProduct?.category || '',
            brand: editProduct?.brand?.toLowerCase() || '',
        })

        setPayload({description: typeof editProduct?.description === 'object' ? editProduct?.description?.join(', ') : editProduct?.description})
        setPreview({
            thumb: editProduct?.thumb || '',
            images: editProduct?.images || []
        })
    }, [editProduct])

    useEffect(() => {
        
        if ( watch('thumb') instanceof FileList && watch('thumb').length > 0) handlePreviewThumb(watch('thumb')[0])
    
        }, [watch('thumb')])

    useEffect(() => {
        //Neu no la 1 file upload len thi se chuyen sang base64
        //Neu no chi la 1 link anh thi khong can
        if ( watch('images') instanceof FileList && watch('images').length > 0) handlePreviewImages(watch('images'))
    
    }, [watch('images')])

      
    
    

    const handleUpdateProduct = async(data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
          if (data.category) data.category = categories?.find(el => el.title === data.category)?.title
          
          const finalPayload = {...data, ...payload}
          finalPayload.thumb = data?.thumb?.length === 0 ? preview.thumb : data.thumb[0]
          console.log(finalPayload)

          const formData = new FormData()
          for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
          
          finalPayload.images = data.images?.length === 0 ? preview.images : data.images
          for(let image of finalPayload.images) formData.append('images', image)
          
          console.log(formData)
    
          const response = await apiUpdateProduct(formData, editProduct._id)
          console.log(response)
          if (response.success) {
            reset()
            toast.success('Update Product Successfully!')
            setPayload({
              thumb: '',
              images: []
            })
          } else toast.error('Something Went Wrong')
        }
      }
    
      
      
    return (
    <div className='w-full flex flex-col gap-4 relative pl-8'>
         {/* <div className='h-[70px] w-full'></div>
         <div className='p-4 border-b  flex justify-between items-center fixed top-0 right-0 left-[350px]'>
            <h1 className='text-3xl font-bold tracking-tight'>Update Product</h1>
            
        </div> */}

        <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
          <span>Products</span>
          <span className='text-main hover:underline cursor-pointer text-sm' onClick={() => setEditProduct(null)}>Cancel</span>
          
        </h1>

        <div className='p-4'>
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm 
            label='Name Product'
            register={register}
            errors={errors}
            id='title'
            validate={{
              required: 'Require this field'

            }}
            fullWidth
            placeholder='Name of New Product'
          />

          <div className='flex w-full gap-4 my-6 '>
            <InputForm 
              label='Price'
              register={register}
              errors={errors}
              id='price'
              validate={{
                required: 'Require this field'

              }}
              fullWidth
              placeholder='Price of New Product'
              type='number'
              style='flex-1'
            />

              <InputForm 
              label='Quantity'
              register={register}
              errors={errors}
              id='quantity'
              validate={{
                required: 'Require this field'

              }}
              fullWidth
              placeholder='Quantity of New Product'
              type='number'
              style='flex-1'
            />

            <InputForm 
              label='Color'
              register={register}
              errors={errors}
              id='color'
              validate={{
                required: 'Require this field'

              }}
              fullWidth
              placeholder='Color of New Product'
              style='flex-1'
            />
          </div>

          <div className='flex w-full gap-4 my-6 '>
          <Select 
            
            label='Category'
            options={categories?.map(el => ({code: el.title, value: el.title}))}
            register={register}
            id='category'
            validate={{
              required: 'Require this field'
            }}
            errors={errors}
            style='flex-1'
            fullwidth
            />

            <Select 
            
            label='Brand'
            options={categories?.find(el => el.title === watch('category'))?.brand?.map(el => ({code: el.toLowerCase(), value: el}))}
            register={register}
            id='brand'
            errors={errors}
            style='flex-1'
            fullwidth
            />
          </div>
          <MarkdownEditor 
            name='description'
            changeValue={changeValue}
            label='Description'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.description}
          />
          <div className='flex flex-col gap-2 mt-8'>
            <label htmlFor="thumb" className='text-sm font-bold'> Upload Thumb</label>
            <input type="file" id='thumb' 
              {...register('thumb')}
            />
            {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
          </div>


          {preview.thumb && <div className='my-4'>

            <img src={preview?.thumb} alt="thumb" className='w-[200px] object-contain'/>
          </div>}

          <div className='flex flex-col gap-2 mt-8'>  
            <label htmlFor="products" className='text-sm font-bold'> Upload Images</label>
            <input type="file" id='images' multiple {...register('images')}/>
          
            
          </div>
          {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
          
          
          {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>

            {preview.images?.map((el, idx) => (
              <img key={idx} 
                src={el} alt='product' className='w-[200px] object-contain'/>
            ))}
          </div>}
          <div className='my-6'>


           <Button type='submit'>Update</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(UpdateProduct)