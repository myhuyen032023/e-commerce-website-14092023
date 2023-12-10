import React , {memo, useState, useCallback} from 'react'
import { productInfoTabs } from 'utils/constants'
import Votebar from 'components/Vote/Votebar'
import { renderStarFromNumber } from 'utils/helpers'
import { apiRatingProduct } from 'apis'
import Button from 'components/Buttons/Button'
import VoteOptions from 'components/Vote/VoteOptions'
import { useDispatch } from 'react-redux'
import { showModal } from 'store/app/appSlice'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { redirect, useNavigate } from 'react-router-dom'
import path from 'utils/path'
import Comment from 'components/Vote/Comment'
const ProductInformation = ({totalRatings, ratings, product, rerender}) => {
    console.log(product)
    const [activedTab, setActivedTab] = useState(1)
    const {isLoggedIn} = useSelector(state => state.user)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [payload, setPayload] = useState({
        comment: '',
        star: ''
    })

    const handleSubmitVoteOption = async({star, comment}) => {
        console.log({star, comment})
        if (!star || !comment) {
            alert('Please write your comment and rate product')
            return
        }
        await apiRatingProduct({star, comment, pid: product?._id, updatedAt: Date.now()})
        rerender()
        dispatch(showModal({isShowModal: false, modalChildren: null}))
    }

    const handleVoteNow = () => {
        if (!isLoggedIn) {
            Swal.fire({
                showCancelButton: true,
                title: 'Oops!',
                text: 'Login to vote',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Go login',
            }).then((rs) => {
                if (rs.isConfirmed) {
                    navigate(`/${path.LOGIN}`)
                }
            }) 
        } else {
            dispatch(showModal({isShowModal: true, modalChildren: <VoteOptions productName={product?.title} handleSubmitVoteOption={handleSubmitVoteOption}/>}))
        }
    }
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

            <div 
                key={5} 
                className={`py-2 px-4 cursor-pointer ${activedTab === 5 ? 'bg-white border border-b-0' : 'bg-gray-200'}`}
                onClick={() => setActivedTab(5)}
            >CUSTOMER REVIEWS</div>
        </div>
        <div className='w-full border p-4'>
            {
                productInfoTabs.find(el => el.id === activedTab)?.content
            }

            {activedTab === 5 && <div className='flex flex-col p-4'>
                
               <div className='flex'>
                
               <div className='flex-4 border flex-col flex items-center justify-center'>
                
                <span>{totalRatings}/5</span>
                <span className='flex items-center gap-1'>{renderStarFromNumber(totalRatings)?.map((el, index) => (
                    <span key={index}>{el}</span>
                ))}</span>

                <span>{ratings?.length} reviews</span>
            </div>   
           <div className='flex-6 flex flex-col p-4 gap-2'>
            {Array.from(Array(5).keys()).reverse().map(el => (
                <Votebar 
                    key={el}
                    number={el+1}
                    ratingCount={ratings?.filter(i => i.star === el + 1)?.length}
                    ratingTotal={ratings?.length}
                />
            ))}

            </div> 
                
                </div>  

                <div className='p-4 flex flex-col items-center justify-center text-sm'>
                <span>Review this product</span>
                <Button handleOnClick={handleVoteNow}>Review now</Button>
            </div>

            <div className='flex flex-col gap-4'>
                {ratings?.map(el => (
                    <Comment 
                    key={el._id}
                    star={el.star}
                    updatedAt={el.updatedAt}
                    comment={el.comment}
                    name={`${el.postedBy?.lastname} ${el.postedBy?.firstname}`}
                    />
                ))}
            </div>
            </div>}

            
        </div>

    </div>
  )
}

export default memo(ProductInformation)