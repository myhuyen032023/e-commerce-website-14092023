import React from 'react'

const InputField = ({value, setValue, nameKey, type, invalidField, setInvalidField}) => {
  
  return (
    <div className='w-full flex flex-col relative mb-2'>
      {
        value && <label htmlFor={nameKey} className='text-[10px] absolute left-[12px] block bg-white px-1'>{nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}</label>
      }
        
        <input 
            type={type || 'text'}
            className='px-4 py-2 rounded-sm border w-full mt-2 text-sm outline-none'
            placeholder={nameKey.charAt(0).toUpperCase() + nameKey.slice(1)}
            value={value}
            onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value}))}
            onFocus={() => setInvalidField([])}
        />
        {invalidField?.some(el => el.name === nameKey) && <small className='text-main italic'>{invalidField.find(el => el.name === nameKey)?.mes}</small>}
        
    </div>
  )
}

export default InputField