import React, { memo } from 'react'
import { showModal } from 'store/app/appSlice'
import { useDispatch } from 'react-redux'

const Modal = ({children}) => {
    const dispatch = useDispatch()
  return (
    <div onClick={() => dispatch(showModal({isShowModal: false, modalChildren: null}))} className='absolute inset-0 bg-overlay z-50 flex items-center justify-center'>
        
    {children}
    </div>
  )
}

export default memo(Modal)