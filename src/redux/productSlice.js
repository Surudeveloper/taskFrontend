import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], 
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    // Additional reducers like addProduct, updateProduct, deleteProduct can go here
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
