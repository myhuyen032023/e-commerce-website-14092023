import React , {memo, useState} from 'react'
import { productInfoTabs } from 'utils/constants'

const ProductInformation = () => {
    const [activedTab, setActivedTab] = useState(1)
  return (
    <div>
        <div className='flex items-center gap-2'>
            {
                productInfoTabs.map(el => (
                    <span 
                        key={el.id} 
                        className={`py-2 px-4 cursor-pointer ${activedTab === +el.id ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
                        onClick={() => setActivedTab(el.id)}
                    >{el.name}</span>
                ))
            }
        </div>
        <div className='w-full border p-4'>
            {
                productInfoTabs.find(el => el.id === activedTab)?.content
            }
        </div>

    </div>
  )
}

export default memo(ProductInformation)