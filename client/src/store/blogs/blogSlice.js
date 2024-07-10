import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions';

export const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        blogs: []
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getBlogs.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.getBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = action.payload;
        });

        builder.addCase(actions.getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message
        })

    }
})


export const {getBlogs} = blogSlice.actions

export default blogSlice.reducer