import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getBlogs = createAsyncThunk('blog/blogs', async(data, {rejectWithValue}) => {
    const response = await apis.apiGetBlogs()

    if (!response.success) return rejectWithValue(response )
    return response.blogs
})