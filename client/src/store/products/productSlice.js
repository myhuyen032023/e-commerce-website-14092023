import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        newProducts: [],
        searchProducts: [],
        discountProducts: [] 
    },
    reducers: {
        setSearchProducts: (state, action) => {
            state.searchProducts = action.payload
        },
        setDiscountProducts: (state, action) => {
            state.discountProducts = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getNewProducts.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload;
        });

        builder.addCase(actions.getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message
        })

    }
})


export const {setSearchProducts, setDiscountProducts} = productSlice.actions

export default productSlice.reducer