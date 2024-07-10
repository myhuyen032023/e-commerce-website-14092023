import axios from '../axios'

export const apiGetProducts = (params) => axios({
    url: '/product/',
    method: 'get',
    params
})

export const apiGetProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'get',
    
})

export const apiCreateProduct = (data) => axios({
    url: '/product/',
    method: 'post',
    data
})

export const apiUpdateProduct = (data, pid) => axios({
    url: '/product/' + pid,
    method: 'put',
    data
})

export const apiDeleteProduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'delete'
})

export const apiRatingProduct = (data) => axios({
    url: '/product/ratings',
    method: 'put',
    data
})


export const apiCreateOrder = (data) => axios({
    url: '/order/',
    method: 'post',
    data
})
export const apiGetUserOrders = (params) => axios({
    url: '/order/',
    method: 'get',
    params
})
export const apiGetOrders = (params) => axios({
    url: '/order/admin',
    method: 'get',
    params
})

export const apiGetIncomeInDays = (params) => axios({
    url: '/order/incomesindays',
    method: 'get',
    params
})
export const apiGetIncomeInMonths = (params) => axios({
    url: '/order/incomesinmonths',
    method: 'get',
    params
})

export const apiUpdateStatus = (data) => axios({
    url: '/order/status',
    method: 'put',
    data
})