import React, { useCallback, useEffect, useState } from 'react'
import payment from 'assets/payment.svg'
import { useSelector } from 'react-redux'
import { formatMoney } from 'utils/helpers'
import { AddressForm, Congrat, InputForm, Paypal } from 'components'
import { useForm } from 'react-hook-form'
import withBaseComponent from 'hocs/withBaseComponent'
import { getCurrent } from 'store/user/asyncActions'
import {locationData} from "location_data";
import { apiGetDistricts, apiGetProvinces, apiGetServices, apiGetShippingFee, apiGetWards } from 'apis'
const Checkout = ({dispatch}) => {
  const { register, formState: {errors}, watch} = useForm()
  const [shippingFee, setShippingFee] = useState(0)
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState('');

  const {currentCart, current} = useSelector(state => state.user )
  const address = watch('address')
  const [isSuccess, setIsSuccess] = useState(false)
  // Fetch provinces from API
  const fetchProvinces = async () => {
      const response = await apiGetProvinces();
      setProvinces(response.data);
  }

  const fetchDistricts = async() => {
    const response = await apiGetDistricts(selectedProvince);
      setDistricts(response.data);
  }

  const fetchWards = async() => {
    const response = await apiGetWards(selectedDistrict);
      setWards(response.data);
  }

  const calShippingFee = async() => {
    //Goi api lay service_id
    const services = await apiGetServices(selectedDistrict)
    const {service_id, service_type_id} = services.data[0]

    const response = await apiGetShippingFee(selectedDistrict, selectedWard, service_id, service_type_id)
    const fee = response.data.total
    console.log(typeof(fee))
    setShippingFee(response.data.total)
  }
  useEffect(() => {
    fetchProvinces();
    
  }, []);

  const handleProvinceChange = async (e) => {
    const selectedProvince = e.target.value;
    setSelectedProvince(selectedProvince);
  };

  const handleDistrictChange = async (e) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
  };
  const handleWardChange = async (e) => {
    const selectedWard = e.target.value;
    setSelectedWard(selectedWard);
  };

  

  useEffect(() => {
    fetchDistricts()
  }, [selectedProvince])

  useEffect(() => {
    if (selectedDistrict) {
      fetchWards()
    }
  }, [selectedDistrict])

  useEffect(() => {
    //Goi api tinh tien ship
    if (selectedWard) {
      calShippingFee()
    }
  }, [selectedWard])
  
  console.log(wards)
  
  useEffect(() => {
    if(isSuccess) dispatch(getCurrent())

  }, [isSuccess])

  console.log(selectedDistrict, selectedWard)
  return (
    
    <div className='w-full p-8 gap-5 grid grid-cols-10 h-full max-h-screen overflow-y-auto'>
      {isSuccess && <Congrat />}
      <div className='w-full flex items-center col-span-5'><img src={payment} alt="payment"  className=' object-contain h-[70%]'/></div>
      
      <div className='w-full flex flex-col justify-center col-span-5 gap-3'>
        <h2 className='text-3xl mb-6 font-bold'>Checkout Your Order</h2>
        <div className='flex flex-col gap-6 '>
          <div className='flex-1'>
          <table className='table-auto h-fit'>
            <thead>
              <tr className='w-full border bg-gray-200'>
                <th className='text-left p-2'>Product</th>
                <th className='text-center p-2'>Quantity</th>
                <th className='text-right p-2'>Price</th>
              </tr>
            </thead>
            <tbody>
              {currentCart?.map(el => (<tr className='border' key={el.product?._id}>
                  <td className='text-left p-2'>{el.product?.title}</td>
                  <td className='text-center p-2'>{el.quantity}</td>
                  <td className='text-right p-2'>{formatMoney(el.product?.price)} VND</td>
              </tr>))}
            </tbody>
          </table>
          </div>
          <div className='flex-1 flex flex-col justify-between gap-[45px]  w-[50%]'>
            <div className='flex flex-col gap-3'>
            

            <div className="flex flex-col gap-3">
            <select value={selectedProvince} onChange={handleProvinceChange} id='province'>
        <option value="">Choose your Province</option>
        {provinces.map((province) => (
          <option key={province.Code} value={province.ProvinceID}>
            {province.ProvinceName}
          </option>
        ))}
      </select>

      <select value={selectedDistrict} onChange={handleDistrictChange} id='district' >
        <option value="">Choose your District</option>
        {districts.map((district) => (
          <option key={district.Code} value={district.DistrictID}>
            {district.DistrictName}
          </option>
        ))}
      </select>

      <select value={selectedWard} onChange={handleWardChange} id='ward' >
        <option value="">Choose your Ward</option>
        {wards?.map((ward) => (
          <option key={ward.WardCode} value={ward.WardCode}>
            {ward.WardName}
          </option>
        ))}
      </select>
      
            </div>
            <InputForm 
              label='Your Adress'
              id='address'
              register={register}
              errors={errors}
              validate={{
                required: 'Require this field'
  
              }}
              fullWidth
              placeholder='Enter Your Address'
            />

            
            {
              address && <div className='flex flex-col gap-3 text-main'>
                  <span>**Shipping Fee: {formatMoney(shippingFee)} VND</span>
                  <span >
                  <span>Total: </span>
                  <span>{formatMoney(currentCart?.reduce((sum, el) =>  +el?.product?.price * el.quantity + sum, 0) + shippingFee) } VND</span>
                </span>
                </div>
            }
            
          {address && selectedProvince && selectedDistrict && <Paypal className="w-full"
            setIsSuccess={setIsSuccess}
            payload={{
              products: currentCart,
              total: Math.round(+currentCart?.reduce((sum, el) =>  +el?.product?.price * el.quantity + sum, 0) + shippingFee),
              address: `
              ${address}, ${document.getElementById("ward")?.options[document.getElementById("ward")?.selectedIndex]?.text},  ${document.getElementById("district")?.options[document.getElementById("district")?.selectedIndex]?.text}, ${document.getElementById("province")?.options[document.getElementById("province")?.selectedIndex]?.text}, 
              `
            }}
            amount={Math.round(+currentCart?.reduce((sum, el) =>  +el?.product?.price * el.quantity + sum, 0) / 23500)}/>}
          </div>

            </div>
            </div>

         

          </div>
        </div>


        
  )
}

export default withBaseComponent(Checkout)