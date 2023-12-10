import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        categories: [],
        isLoading: false,
        isShowModal: false,
        modalChildren: null
    },
    reducers: {
        showCart: (state) => {
            state.isShowCart = !state.isShowCart
        },
        showModal: (state, action) => {
            state.isShowModal = action.payload.isShowModal
            state.modalChildren = action.payload.modalChildren
        
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            //Khi thuc hien action thi no se luu payload vao trong state.categories
            //Khi goi selector(state => state.app) thi minh se lay duoc state nay de lay du lieu
            state.categories = action.payload;
        });

        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message
        })

    }
})

export const {showCart, showModal} = appSlice.actions


export default appSlice.reducer