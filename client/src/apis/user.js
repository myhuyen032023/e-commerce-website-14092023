import axios from '../axios'

export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data,
    withCredentials: true
})

export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    data
})

export const apiForgotPassword = (data) => axios({
    url: '/user/forgotpassword',
    method: 'post',
    data
})
export const apiResetPassword = (data) => axios({
    url: '/user/resetpassword',
    method: 'put',
    data
})

export const apiGetCurrent = () => axios({
    url: '/user/currentUser ',
    method: 'get'
})

export const apiGetUsers = (params) => axios({
    url: '/user/',
    method: 'get',
    params
})

export const apiUpdateUserByAdmin = (data, uid) => axios({
    url: '/user/' + uid,
    method: 'put',
    data
})

export const apiDeleteUserByAdmin = ( uid) => axios({
    url: '/user/' + uid,
    method: 'delete'
})

export const apiUpdateCurrent = ( data) => axios({
    url: '/user/currentUser',
    method: 'put',
    data
})

export const apiUpdateCart = ( data) => axios({
    url: '/user/cart',
    method: 'put',
    data
})

export const apiRemoveCart = ( pid) => axios({
    url: '/user/remove-cart' + pid,
    method: 'delete',
})