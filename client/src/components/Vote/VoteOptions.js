import React, { memo, useEffect, useRef, useState } from 'react'
import logo from 'assets/logo1.png'
import { voteOptions } from 'utils/constants'
import { AiFillStar } from 'react-icons/ai'
import Button from 'components/Buttons/Button'
import { apiRatingProduct } from 'apis'
import { showModal } from 'store/app/appSlice'
import withBaseComponent from 'hocs/withBaseComponent'
import { toast } from 'react-toastify'
const VoteOptions = ({product, dispatch}) => {
  const modalRef = useRef()
  
  const [chosenStar, setChosenStar] = useState(0)

  const [comment, setComment] = useState('')
console.log(product)
  useEffect(() => {
    modalRef.current.scrollIntoView({block:'center', behavior: 'smooth'})

  }, [])

  const handleSubmitVoteOption = async({star, comment}) => {
    console.log({star, comment})
    if (!star || !comment) {
        alert('Please write your comment and rate product')
        return
    }
    await apiRatingProduct({star, comment, pid: product?._id, updatedAt: Date.now()})
    
    toast.success('Rate Successfully!')
    dispatch(showModal({isShowModal: false, modalChildren: null}))
}

  return (
    <div onClick={e => e.stopPropagation()} ref={modalRef} className='bg-white w-[700px] p-4 flex flex-col items-center justify-center gap-4'>
      
      <img src={logo} alt="logo" className='w-[300px] object-contain'/>
        <h2 className='text-center'>{product?.title}</h2>
        <textarea 
          value={comment}
          onChange={e => setComment(e.target.value)}
          className='form-textarea w-full placeholder:italic' placeholder='Your comment' ></textarea>

        <div className='w-full flex flex-col gap-4'>
          <p>How do you like this product?</p>
          <div className='flex items-center justify-center gap-4'>
            {voteOptions.map((el => (
              <div 
                onClick={() => setChosenStar(el.id)}
                className='w-[100px] h-[100px] p-4 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-md flex items-center justify-center flex-col gap-2'>
                {chosenStar >= el.id ? <AiFillStar color='orange'/> : <AiFillStar color='gray'/>}
                <span>{el.text}</span>
              </div>
            )))}
          </div>
        </div>
        <Button fullWidth handleOnClick={()=> handleSubmitVoteOption({comment, star: chosenStar})}>Submit</Button>
    </div>
  )
}

export default withBaseComponent(memo(VoteOptions))