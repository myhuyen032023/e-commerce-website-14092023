import React from 'react'
import {navigation} from '../utils/constants'
import {NavLink} from 'react-router-dom'


const Navigation = () => {
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
    </div>
  )
}

export default Navigation