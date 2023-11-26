import { Button, InputForm } from 'components'
import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import avatar from 'assets/defaultAvatar.png'
import { apiUpdateCurrent } from 'apis'
import { getCurrent } from 'store/user/asyncActions'
import { toast } from 'react-toastify'
const Personal = () => {
  const {register, handleSubmit, formState:{errors, isDirty}, reset, watch} = useForm()
  const {current} =  useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
    })
  }, [current])

  

  const handleUpdateInfor = async(data) => {
    console.log(data)
    const formData = new FormData()
    if (data.avatar.length > 0) formData.append('avatar', data.avatar[0])
    delete data.avatar

    for (let i of Object.entries(data)) formData.append(i[0], i[1])

    const response = await apiUpdateCurrent(formData)
    if (response.success) {
      dispatch(getCurrent())
      toast.success('Update Infor Successfully!')
    } else toast.error('Something went wrong')
  }

  return (
    <div className='w-full relative px-4'>
      <header className='text-3xl font-semibold py-4 border-b border-b-gray-200'>
        Personal
      </header>

      <form onSubmit={handleSubmit(handleUpdateInfor)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
        <InputForm 
              label='Firstname'
              register={register}
              errors={errors}
              id='firstname'
              validate={{
                required: 'Require this field'

              }}
            />

              <InputForm 
              label='Lastname'
              register={register}
              errors={errors}
              id='lastname'
              validate={{
                required: 'Require this field'

              }}
            />
              <InputForm 
              label='Email address'
              register={register}
              errors={errors}
              id='email'
              validate={{
                required: 'Require this field',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              }}
            />

            <InputForm 
              label='Phone'
              register={register}
              errors={errors}
              id='mobile'
              validate={{
                required: 'Require this field',
                pattern: {
                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                  message: "invalid phone number"
                }
              }}
            />

            <div className='flex items-center gap-2'>
              <span className='font-medium'>Account status: </span>
              <span>{current?.isBlocked ? 'Blocked' : 'Active'}</span>
            </div>


              <div className='flex flex-col gap-2'>
                <span >Profile image</span>
                <label htmlFor="file">
                  <img src={current?.avatar || avatar} alt="avatar" className='w-20 h-20 object-cover rounded-full'/>
                </label>
                <input type="file" id='file' hidden {...register('avatar')}/>
              </div>
            {isDirty && <Button type='submit'> Update </Button>}
      </form>
    </div>
  )
}

export default Personal