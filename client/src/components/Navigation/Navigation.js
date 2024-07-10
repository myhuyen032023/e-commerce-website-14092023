import React, {memo, useState, useEffect} from 'react'
import {navigation} from 'utils/constants'
import {NavLink, useSearchParams} from 'react-router-dom'
import InputField from 'components/Inputs/InputField'
import useDebounce from 'hooks/useDebounce'
import { apiGetProducts } from 'apis'
import path from 'utils/path'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import InputForm from 'components/Inputs/InputForm'
import withBaseComponent from 'hocs/withBaseComponent'
import { setSearchProducts } from 'store/products/productSlice'
const Navigation = ({dispatch, navigate}) => {
  const {register, formState: {errors}, reset, watch} = useForm()
  const [params] = useSearchParams()

  

  const fetchProducts = async (params) => {
    const response = await apiGetProducts(params)
    if (response.success) {
      dispatch(setSearchProducts(response))
      console.log(response)
      navigate(`/${path.PRODUCTS}`) 
    }
  }

  const queryDebounce = useDebounce(watch('q'), 800)
  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    if (queryDebounce !== '') {
      searchParams.q = queryDebounce
      fetchProducts(searchParams) 
      reset()
    }
  }, [queryDebounce])

  
  
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

      <div>
      <div className='flex w-full justify-end items-center px-8'>
        <form className='w-full'>

          <InputForm 
            id='q'
            register={register}
            errors={errors}
            placeholder="Search Product by title, description..."
          />
        </form>
      </div>
      </div>

        
    </div>
  )
}

export default withBaseComponent(memo(Navigation))