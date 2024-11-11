import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/productSlice';
import authReducer from '../redux/authSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  },
});

export default store;
