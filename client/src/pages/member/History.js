import { apiGetUserOrders, apiUpdateStatus } from 'apis'
import { InputForm } from 'components'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formatMoney } from 'utils/helpers'
import {Button} from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import path from 'utils/path'
import { showProductList } from 'store/app/appSlice'

const History = ({dispatch, navigate}) => {
  const [orders, setOrders] = useState([])
  const {register, formState: {errors}, handleSubmit, reset, watch} = useForm()
  const q = watch('q')
  const {isLoggedIn} = useSelector(state => state.user)
  const [update, setUpdate] = useState(false)
 

  const handleVoteNow = (products) => {
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
        dispatch(showProductList({isShowProductList: true,  productList: products}))
    }
}
  const handleUpdateStatus = async({oid, status}) => {
    
    setUpdate(!update)
    console.log(update)
    const response = await apiUpdateStatus({oid, status})
    if (response.success) {
      Swal.fire({
        title: 'Thank You For Your Order!', 
        text: 'Remember to Rate our Product', 
        type: 'success'
    })
    
  } 
  }

  const fetchUserOrders = async() => {
    const response = await apiGetUserOrders()
    if (response.success) {
      setOrders(response.orders)
    }
  }

  useEffect(() => {
    fetchUserOrders()
  }, [update])
  
  console.log(orders)
  return (
    <div className='w-full relative px-4'>
      <header className='text-3xl font-semibold py-4 border-b border-b-gray-200'>
        Buy History
      </header>

      <div className='flex w-full justify-end items-center px-8'>
        <form className='w-[45%]'>

          <InputForm 
            id='q'
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search orders by status..."
          />
        </form>
      </div>

      <table className='table-auto w-full'>

        <thead>
          <tr className='border bg-background py-2'>
            <th className='text-center'>STT</th>
            <th className='text-center'>Products</th>
            <th className='text-center'>Total</th>
            <th className='text-center'>Status</th>
            <th className='text-center'>CreatedAt</th>
            <th className='text-center'>UpdatedAt</th>
            <th className='text-center'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((el, indx) => (
            <tr key={el._id}>
              <td className='text-center py-2'>{indx+1}</td>
            <td className='text-center py-2'>
                <span className='flex flex-col text-left pl-10'>
                  {el.products?.map(item => <span key={item._id}>
                      {`• ${item.product.title}`}
                  </span>)}
                </span>
              </td>

              <td className='text-center'>{formatMoney(el.total)} VND</td>
              {(el.status === "Shipping") ? <Button handleOnClick={() => handleUpdateStatus({oid:el._id, status: 'Success'}) } style={"px-4 py-2 rounded-md text-white bg-[#008000] my-2 text-semibold"}>Received Verify</Button> : <td className='text-center '>{el.status}</td>}
              <td className='text-center'>{el.createdAt}</td>
              <td className='text-center'>{el.updatedAt}</td>
              <td className='text-center'><Button handleOnClick={()=>handleVoteNow(el.products.map(e => e.product))}>Review now</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default withBaseComponent(History)