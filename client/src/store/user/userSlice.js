import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        currentCart: []
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = null
            state.current = null
            state.isLoading = false
        },
        updateCart: (state, action) => {
             const {pid, quantity} = action.payload
             const updatingCart = JSON.parse(JSON.stringify(state.currentCart))
             const updatedCart = updatingCart.map(el => {
                if(el.product?._id === pid) {
                    return {...el, quantity}
                } else return el
             })

             state.currentCart = updatedCart
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload; //save data to current
            state.isLoggedIn = true;
            state.currentCart = action.payload.cart
        });

        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = null;
        })

    }
})

export const {login, logout, updateCart} = userSlice.actions



export default userSlice.reducer