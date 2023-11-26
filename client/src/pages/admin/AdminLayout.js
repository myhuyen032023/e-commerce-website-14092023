import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import path from 'utils/path'
import {useSelector} from 'react-redux'
import { AdminSidebar } from 'components'

const AdminLayout = () => {
  const {isLoggedIn, current} = useSelector(state => state.user)
  if (!isLoggedIn || !current || current.role !== 'admin') return <Navigate to={`/${path.LOGIN}`} replace={true} />
  
  return (
    <div className='flex w-full  min-h-screen relative'>
      <div className='w-[327px] flex-none top-0 bottom-0 absolute'>
        <AdminSidebar />
      </div>
      <div className='w-[327px]'></div>
      <div className='flex-auto bg-gray-100 ml-6'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout