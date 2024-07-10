import axios from '../axios'

export const apiGetCategories = () => axios({
    url: '/productCategory/',
    method: 'get'
})

export const apiGetProvinces = () => fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
    method: 'GET',
    headers: {
        Token: "205f8bde-3759-11ef-a00a-7e341200dfc2"
    }
  })
  .then(response => response.json())


  export const apiGetDistricts = (province_id) => fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${province_id}`, {
    method: 'GET',
    headers: {
        Token: "205f8bde-3759-11ef-a00a-7e341200dfc2"
    }
  })
  .then(response => response.json())

  export const apiGetWards = (district_id) => fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district_id}`, {
    method: 'GET',
    headers: {
        Token: "205f8bde-3759-11ef-a00a-7e341200dfc2"
    }
  })
  .then(response => response.json())

  export const apiGetServices = (district_id) => fetch(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services`, {
    method: 'POST',
    headers: {
        Token: "205f8bde-3759-11ef-a00a-7e341200dfc2",
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "shop_id":5167460,
	    "from_district": 3695,
      "to_district": +district_id
    })
  })
  .then(response => response.json())

  export const apiGetShippingFee = (district_id, ward_code, service_id, service_type_id) => fetch(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`, {
    method: 'POST',
    headers: {
        Token: "205f8bde-3759-11ef-a00a-7e341200dfc2",
        ShopId: "5167460",
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "to_district_id": +district_id,
      "to_ward_code": `${ward_code}`,
      "weight": 50,
      "service_id":service_id,
      "service_type_id":service_type_id
  })
  })
  .then(response => response.json())