import React, {memo, Fragment, useState} from 'react'
import logo from 'assets/logo1.png'
import { adminSidebar, memberSidebar } from 'utils/constants'
import { NavLink, Link } from 'react-router-dom'
import clsx from 'clsx'
import {AiOutlineCaretDown} from 'react-icons/ai'
import {AiFillCaretRight} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import avatar from 'assets/defaultAvatar.png'

const activedStyle = 'px-2 py-2 flex items-center gap-2  bg-background'
const notActivedStyle = 'px-2 py-2 flex items-center gap-2 hover:bg-background'

const MemberSidebar = () => {
  const [active, setActive] = useState([])
  const {current} = useSelector(state=>state.user)

  const handleShowTabs = (tabId) => {
    if (active.some(el => el === tabId)) {
      setActive(prev => prev.filter(el => el !== tabId))
    }
    else {
      setActive(prev => [...prev, tabId])
    }
  }

  return (
    <div className='py-4  h-full bg-white w-[250px] flex-none'>
      <div className='w-full flex flex-col items-center justify-center py-4' >
        <img src={current?.avatar || avatar} alt="avatar" className='w-16 h-16 object-cover'/>
        <small>{current?.lastname} {current?.firstname}</small>
      </div>
      <div>
        {
          memberSidebar.map(el => (
              <Fragment
                key={el.id}
              >
                {el.type === 'single' && <NavLink 
                    to={el.path}
                    className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
                  >
                    
                    <br></br>
                    <span>{el.text}</span>
                    
                    
                    </NavLink>}

                    {el.type === 'parent' && <div className='flex flex-col ' onClick={() => handleShowTabs(el.id)}>
                    
                    <div className='flex items-center gap-2 px-4  py-2 hover:bg-background justify-between cursor-pointer'>
                      <span>{el.text}</span>
                      {active.some(id => id === el.id) ? <AiFillCaretRight /> : <AiOutlineCaretDown />}
                      
                    </div>

                    {
                      active.some(id => id === el.id) && <div className='flex flex-col text-sm' >
                      {el.submenu.map(item => (
                        <NavLink 
                          to={item.path}
                          className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActivedStyle, 'pl-5')}
                          onClick={(e) => e.stopPropagation()}
                          >{item.text}</NavLink>
                      ))}
                    </div>
                    }
                    
                    </div>}
              </Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default memo(MemberSidebar)