import React, {memo} from 'react'
import clsx from 'clsx'

const InputField = ({value, setValue, nameKey, type, invalidField, setInvalidField, style, fullWidth, placeholder, isHideLabel}) => {
  
  return (
    <div className={clsx('flex flex-col relative mb-2', !fullWidth && 'w-full')}>
      {
        !isHideLabel && value && <label htmlFor={nameKey} className='text-[10px] absolute left-[12px] block bg-white px-1'>{nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}</label>
      }
        
        <input 
            type={type || 'text'}
            className={clsx('px-4 py-2 rounded-sm border w-full mt-2 text-sm outline-none', style)}
            placeholder={placeholder || nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
            value={value}
            onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value}))}
            onFocus={() => setInvalidField && setInvalidField([])}
        />
        {invalidField?.some(el => el.name === nameKey) && <small className='text-main italic'>{invalidField.find(el => el.name === nameKey)?.mes}</small>}
        
    </div>
  )
}

export default memo(InputField)