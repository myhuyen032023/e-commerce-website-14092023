import {React} from 'react'
import { NavLink } from 'react-router-dom'
import {createSlug} from '../utils/helpers'
import { useSelector } from 'react-redux/es/hooks/useSelector'


const Sidebar = () => {
  // const [categories, setCategories] = useState([])
  // const fetchCategories = async () => {
  //   const response = await apiGetCategories();
  //   if (response.success) setCategories(response.prodCategories)
    
  // }

  // useEffect(() => {
  //   fetchCategories()
  // }, [])

  const {categories} = useSelector(state => state.app)
  // console.log(categories)
  return (
    <div className='flex flex-col border'>
      {categories.map(el => {
        return (
          <NavLink
              key={createSlug(el.title)}
              to={createSlug(el.title)}
              className={({isActive}) => isActive ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main' : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
        }>
          {el.title}
        </NavLink>
        )
        
      })}
    </div>  
  )
}

export default Sidebar 