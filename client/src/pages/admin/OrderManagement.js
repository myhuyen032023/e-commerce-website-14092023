import { apiGetOrders, apiUpdateStatus } from 'apis'
import { InputForm } from 'components'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formatMoney } from 'utils/helpers'
import {Button} from 'components'
import withBaseComponent from 'hocs/withBaseComponent'
import { useSelector } from 'react-redux'
const OrderManagement = ({dispatch}) => {
  // const {orders} = useSelector(state => state.orders)
  // const {register, formState: {errors}, handleSubmit, reset, watch} = useForm()
  // const q = watch('q')
  const [orders, setOrders] = useState([])
  const [update, setUpdate] = useState(false)
  const fetchOrders = async (params) => {
    const response = await apiGetOrders(params)
    if (response.success) {
      setOrders(response.orders)
    }
  }


  

  const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const formattedEndDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const [startDate, setStartDate] = useState('2024-06-01');
   const [endDate, setEndDate] = useState(formattedEndDate);


  const handleUpdateStatus = async({oid, status}) => {
    setUpdate(!update)
    // dispatch(updateOrder({oid, status}))
    await apiUpdateStatus({oid, status})

  }


  useEffect(() => {
    fetchOrders({startDate, endDate})
  }, [update, endDate, startDate])
  
  // useEffect(() => {
  //   dispatch(getOrders())
  // }, [])
  
  console.log(orders)
  return (
    <div className='w-full relative px-4'>
      <header className='text-3xl font-semibold py-4 border-b border-b-gray-200'>
        Order Manangement
      </header>

      <div className='flex w-full justify-end items-center p-5 '>
        {/* <form className='w-[45%]'>

          <InputForm 
            id='q'
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search"
          />
        </form> */}

      <div className='flex items-center gap-3'>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max={formattedEndDate}
          min={startDate}
        />
      </div>
      </div>

      <table className='table-auto w-full'>

        <thead>
          <tr className='border bg-background py-2'>
            <th className='text-center'>STT</th>
            <th className='text-center'>Products</th>
            <th className='text-center'>Total</th>
            <th className='text-center'>Status</th>
            <th className='text-center'>OrderBy</th>
            <th className='text-center'>CreatedAt</th>
            <th className='text-center'>UpdatedAt</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((el, indx) => (
            <tr key={el._id}>
              <td className='text-center py-2'>{indx+1}</td>
            <td className='text-center py-2'>
                <span className='flex flex-col text-left pl-10'>
                  {el.products?.map(item => <span key={item._id}>
                      {`• ${item.product?.title}`}
                  </span>)}
                </span>
              </td>

              <td className='text-center'>{formatMoney(el.total)} VND</td>

              {
              (el.status === "Processing") && <Button handleOnClick={() => handleUpdateStatus({oid:el._id, status: 'Shipping'})} >Mark as Shipping</Button>} 

              {
              (el.status === "Shipping") && <Button handleOnClick={() => handleUpdateStatus({oid:el._id, status: 'Processing'})} style={"px-4 py-2 rounded-md text-white bg-[#008000] my-2 text-semibold"}>Shipping</Button>}
              
              {
              (el.status === "Success") &&  <td className='text-center '>{el.status}</td>}

              <td className='text-center py-2'>{el.orderBy?.lastname} {el.orderBy?.firstname}</td>
              <td className='text-center'>{el.createdAt}</td>
              <td className='text-center'>{el.updatedAt}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default withBaseComponent(OrderManagement)