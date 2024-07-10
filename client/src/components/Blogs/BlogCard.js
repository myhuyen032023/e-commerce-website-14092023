import React, {memo} from 'react'

const BlogCard = ({blog}) => {
    return (
        <div className='w-1/3 flex-auto px-[10px] mb-[20px]'>
          <div className='flex w-full border'>
              <img src={blog?.thumb} alt='product' className='w-[90px] object-contain p-4 '/>
              <div className='flex flex-col gap-1 mt-[15px]  items-start w-full text-xs'>
                 <span className='line-clamp-1 lowercase'>{blog?.title}</span>
                 <span>{blog?.description}</span>
                <span>READ MORE...</span>
              </div>
          </div>
    
          
            
        </div>
    
        
      )
}

export default memo(BlogCard)