import React, {memo} from 'react'


const Button = ({children, handleOnClick, style, fullWidth, type='button', disabled = false}) => {
  return (
    <button
    type={style}
    className={style ? style : `px-4 py-2 rounded-md text-white bg-main my-2 text-semibold ${fullWidth ? 'w-full' : 'w-fit'} cursor-pointer`}
    onClick={() => (handleOnClick && handleOnClick())}
    
    >

        {children}
    </button>
  )
}

export default memo(Button)