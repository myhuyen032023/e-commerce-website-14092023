import React, {memo, Fragment, useState} from 'react'
import logo from 'assets/logo1.png'
import { adminSidebar } from 'utils/constants'
import { NavLink, Link } from 'react-router-dom'
import clsx from 'clsx'
import {AiOutlineCaretDown} from 'react-icons/ai'
import {AiFillCaretRight} from 'react-icons/ai'

const activedStyle = 'px-2 py-2 flex items-center gap-2  bg-background'
const notActivedStyle = 'px-2 py-2 flex items-center gap-2 hover:bg-background'

const AdminSidebar = () => {
  const [active, setActive] = useState([])

  const handleShowTabs = (tabId) => {
    if (active.some(el => el === tabId)) {
      setActive(prev => prev.filter(el => el !== tabId))
    }
    else {
      setActive(prev => [...prev, tabId])
    }
  }

  return (
    <div className='py-4  h-full bg-white'>
      <Link className='flex flex-col justify-center items-center gap-2 py-4' to={'/'}>
        <img src={logo} alt="logo" className='w-[200px] object-contain '/>
        <small>Admin Workspace</small>
      </Link>
      <div>
        {
          adminSidebar.map(el => (
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

export default memo(AdminSidebar)