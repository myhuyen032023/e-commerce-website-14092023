import React, {memo, useRef} from 'react';
import { showModal, showProductList, isShowProductList } from 'store/app/appSlice'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import withBaseComponent from 'hocs/withBaseComponent';
import path from 'utils/path'
import VoteOptions from 'components/Vote/VoteOptions'
import logo from 'assets/logo1.png'
import Button from 'components/Buttons/Button';

const ProductList = ({ products, dispatch, navigate }) => {
    const modalRef = useRef()
    
    const {isLoggedIn} = useSelector(state => state.user)
    const handleVoteNow = (product) => {
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
            dispatch(showModal({isShowModal: true, modalChildren: <VoteOptions product={product}/>}))
        }
    }
    return (
    <div onClick={e => e.stopPropagation()} ref={modalRef} className='bg-white w-[500px] p-6 gap-4'>
      <div className='flex justify-between' >
      <img src={logo} alt="logo" className='w-[300px] object-contain'/>
      
      <div className='flex items-center justify-end'>
      <Button handleOnClick={() => dispatch(showProductList({isShowProductList: false, productList: []}))} >X</Button>

      </div>
      
      </div>
      <div>
      {products.map((product) => (
        <div key={product._id} className="p-2">
          
          <h3 className='cursor-pointer hover:text-main' onClick={() => handleVoteNow(product)}>{product.title}</h3>
          
        </div>
      ))}
      </div>
    </div>
  );
};

export default withBaseComponent(memo(ProductList))