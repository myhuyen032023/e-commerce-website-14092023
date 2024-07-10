import React, {useCallback, useEffect, useState} from 'react'
import { InputForm, Select , Button, MarkdownEditor} from 'components'
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
import { getBase64, validate } from 'utils/helpers'
import { toast } from 'react-toastify'
import { apiCreateProduct } from 'apis'

const CreateProduct = () => {
  const {handleSubmit, register, formState: {errors}, watch, reset} = useForm()
  const {categories} = useSelector(state => state.app)
  const [preview, setPreview] = useState({
    thumb: null,
    images: []
  })  

  const [payload, setPayload] = useState({
    description: ''
  })

  const [invalidFields, setInvalidFields] = useState([])
  const changeValue = useCallback((e) => {
    setPayload(e)
  }, [payload])

  const handleCreateProduct = async(data) => {
    const invalids = validate(payload, setInvalidFields)
    if (invalids === 0) {
      if (data.category) data.category = categories?.find(el => el._id === data.category)?.title
      const finalPayload = {...data, ...payload}
      const formData = new FormData()
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])

      if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
      if (finalPayload.images) {
        for(let image of finalPayload.images) formData.append('images', image)
      }

      const response = await apiCreateProduct(formData)
      if (response.success) {
        reset()
        window.location.reload()
        toast.success('Create Product Successfully!')
        setPayload({
          thumb: '',
          images: []
        })

      } else toast.error('Something Went Wrong')
    }
  }

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file)
    setPreview(prev => ({ ...prev, thumb: base64Thumb}))
  }

  useEffect(() => {
    handlePreviewThumb(watch('thumb')[0])

  }, [watch('thumb')])

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
    handlePreviewImages(watch('images'))

  }, [watch('images')])

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Create New Product</span>
      </h1>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
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
            options={categories?.map(el => ({code: el._id, value: el.title}))}
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
            
            label='Brand '
            options={categories?.find(el => el._id === watch('category'))?.brand?.map(el => ({code: el, value: el}))}
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
          />
          <div className='flex flex-col gap-2 mt-8'>
            <label htmlFor="thumb" className='text-sm font-bold'> Upload Thumb</label>
            <input type="file" id='thumb' 
              {...register('thumb', {required: 'Require this field'})}
            />
            {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
          </div>


          {preview.thumb && <div className='my-4'>

            <img src={preview.thumb} alt="thumb" className='w-[200px] object-contain'/>
          </div>}

          <div className='flex flex-col gap-2 mt-8'>
            <label htmlFor="products" className='text-sm font-bold'> Upload Images</label>
            <input type="file" id='images' multiple {...register('images', {required: 'Require this field'})}/>
          
            
          </div>
          {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
          
          
          {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>

            {preview.images?.map((el, idx) => (
              <img key={idx} 
                src={el} alt='product' className='w-[200px] object-contain'/>
            ))}
          </div>}
          <div className='my-6'>


           <Button type='submit'>Create New Product</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct