import axios from '../axios'

export const apiGetBlogs = () => axios({
    url: '/blog/',
    method: 'get',
})

export const apiGetBlog = (bid) => axios({
    url: '/blog/' + bid,
    method: 'get',
    
})

export const apiCreateBlog = (data) => axios({
    url: '/blog/',
    method: 'post',
    data
})

export const apiUpdateBlog = (data, pid) => axios({
    url: '/blog/' + pid,
    method: 'put',
    data
})

export const apiDeleteBlog = (pid) => axios({
    url: '/blog/' + pid,
    method: 'delete'
})