import React, {memo, useEffect, useState} from 'react'
import icons from '../utils/icons';
import { colors } from '../utils/constants';
import {createSearchParams, useNavigate, useParams} from 'react-router-dom';
import { apiGetProducts } from '../apis';
import { formatMoney } from '../utils/helpers';
import useDebounce from '../hooks/useDebounce';

const {AiOutlineDown} = icons

const SearchItem = ({name, activeClick, changeActiveClick, type='checkbox'}) => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [bestPrice, setBestPrice] = useState(null)
  //price nay dung de render ui
  const [price, setPrice] = useState({
    from: '',
    to: ''
  })

  const {category, from, to} = useParams()

  const handleSelect = (e) => {
    const alreadyEl = selected.find(el => el === e.target.value)
    if (alreadyEl) setSelected(prev => prev.filter(el => el!==e.target.value))
    else setSelected(prev => [...prev, e.target.value])
    changeActiveClick(null)
  } 
  
  const fetchBestPriceProduct = async() => {
    const response = await apiGetProducts({sort: '-price', limit: 1})
    if (response.success) setBestPrice(response.products[0]?.price)
  }

  useEffect(() => {
    if (selected.length > 0){
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(",")
        }).toString()
     })
    } else {
      navigate(`/${category}`)
    }
    
  }, [selected])

  useEffect(() => {
    if (type === 'input') fetchBestPriceProduct()
  }, [type])

  //Price
  const debouncePriceFrom = useDebounce(price.from, 500)
  const debouncePriceTo = useDebounce(price.to, 500)
  useEffect(() => {
    const queries = {}
    if (Number(price.from) > 0) queries.from = price.from
    if (Number(price.to) > 0) queries.from = price.to

    navigate({
      pathname: `/${category}`,
        search: createSearchParams(queries).toString()
    })
    
  }, [debouncePriceFrom, debouncePriceTo])
  
  return (
    <div 
        onClick={() => changeActiveClick(name)}
        className='p-3 cursor-pointer text-gray-500 text-xs gap-6 relative border border-gray-800 flex justify-between items-center'>
        
        <span className='capitalize'>{name}</span>
        <AiOutlineDown />

        {
            activeClick === name && <div className='absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border  bg-white main-w-[150px]'>
            {
              type === 'checkbox' && <div onClick={e => e.stopPropagation()}>
                <div className='p-4 items-center flex justify-between gap-8 border-b'>
                  <span className='whitespace-nowrap'>{selected} selected</span>
                  <span 
                    className='underline hover:text-main cursor-pointer' 
                    onClick={
                      (e) => {
                        e.stopPropagation()
                        setSelected([])
                      }}
                    >Reset</span>
                </div>


                <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                  {
                    colors.map((el, index) => (
                      <div className='flex items-center gap-4 ' key={index}>
                        <input 
                          type="checkbox" 
                          id={el} 
                          name={el} 
                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                          value={el}
                          onChange={handleSelect}
                          checked={selected.some(selectedItem => selectedItem === el)}
                          />
                        <label htmlFor={el} className='capitalize text-gray-700'>{el}</label>
                        </div>
                    ))
                  }
                </div>

              </div>
            }

            {
              type === 'input' && <div onClick={e => e.stopPropagation()}>
                <div className='p-4 items-center flex justify-between gap-8 border-b' >
                  <span className='whitespace-nowrap'>The highest price is {formatMoney(bestPrice)} VND</span>
                  <span 
                    className='underline hover:text-main cursor-pointer' 
                    onClick={
                      (e) => {
                        e.stopPropagation()
                        setPrice({from: '', to: ''})
                      }}
                    >Reset</span>
                </div>

                <div className='flex items-center p-2 gap-2'>

                  <div className='flex items-center gap-2'>
                    <label htmlFor="from">From</label>
                    <input 
                      type="number" 
                      id='from' 
                      className='form-input'
                      value={price.from}
                      onChange={e => setPrice(prev => ({...prev, from: e.target.value}))}
                      />

                    <label htmlFor="to">To</label>
                    <input 
                      type="number" 
                      id='to' className='form-input'
                      value={price.to}
                      onChange={e => setPrice(prev => ({...prev, to: e.target.value}))}
                      />
                  </div>
                </div>
              </div>
            }
        </div>
        }
    </div>
  )
}

export default memo(SearchItem)