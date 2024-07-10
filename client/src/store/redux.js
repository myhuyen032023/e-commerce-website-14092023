import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import productSlice from './products/productSlice';
import userSlice from './user/userSlice';
import blogSlice from './blogs/blogSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore}  from 'redux-persist';


const commonConfig = {
  
  key: 'shop/user',
  storage
}

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token', 'current', 'currentCart']
}

export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice,
    blogs: blogSlice,
    user: persistReducer(userConfig, userSlice),
  },
});


export const persistor = persistStore(store)