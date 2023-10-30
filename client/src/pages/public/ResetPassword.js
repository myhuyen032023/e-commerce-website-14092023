import React, {useState} from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis/user'
import {toast} from 'react-toastify'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const {token} = useParams()
  console.log(token)
  const handleResetPassword = async () => {
    console.log({newPassword, token})
    const response = await apiResetPassword({password: newPassword, token})
    if (response.success) {
      
      toast.success(response.mes)
    } else {
      toast.info(response.mes)
    }
  }

  return (
    <div className='absolute top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50'>
        <div className='flex flex-col gap-4'>
          <label htmlFor='newPassword'>Enter new password</label>
          <input 
            type='password' 
            id='newPassword'
            placeholder='Type here'
            className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />

          <div className='flex items-center justify-end w-full gap-4'>
            <Button name='Submit' style='px-4 py-2 rounded-md text-white bg-blue-500 my-2 text-semibold' handleOnClick={handleResetPassword}/>
          </div>
        </div>

      </div>
  )
}

export default ResetPassword