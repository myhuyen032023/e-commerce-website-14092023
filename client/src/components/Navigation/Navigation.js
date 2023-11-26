import React, {memo, useState, useEffect} from 'react'
import {navigation} from 'utils/constants'
import {NavLink} from 'react-router-dom'
import InputField from 'components/Inputs/InputField'
import useDebounce from 'hooks/useDebounce'
import { apiGetProducts } from 'apis'
import path from 'utils/path'
import { useNavigate } from 'react-router-dom'
const Navigation = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState({
    title: ''
  })
  

  const titleDebounce = useDebounce(title.title, 800) 
  useEffect(() => {
    if (titleDebounce !== '')
    navigate(`${path.PRODUCTS}`)
  }, [titleDebounce])

  
  return (
    <div className='w-main h-[48px] py-2 border-y flex text-sm items-center'>
      {navigation.map(el => (
        <NavLink 
          to={el.path} 
          key={el.id}
          className={({isActive}) => isActive ? 'pr-12 text-main':'pr-12 hover:text-main'}
        >
          {el.value}
          
        </NavLink>
      ))}

      {/* <div>
      <div className='flex justify-end '>
          <InputField
            nameKey={'title'}
            value={title.title}
            setValue={setTitle}
            style='w-[800px]'
            placeholder='Search product name...'
            fullWidth={true}
            isHideLabel={true}
          />
        </div>
      </div> */}

        
    </div>
  )
}

export default memo(Navigation)