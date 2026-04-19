import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './actions';
import type { TProduct } from '../../utils/types';

interface ProductsState {
  items: TProduct[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
  reducers: {
    deleteProduct: (state, action: { payload: number }) => {
      state.items = state.items.filter((product) => product.id !== action.payload);
    },
    toggleFavorite: (state, action: { payload: number }) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    },
    addProduct: (state, action: { payload: TProduct }) => {
      state.items.unshift(action.payload);
    },
  },
  selectors:{
    getProductById: (state, id: number | undefined) => {
      return state.items.find(p => p.id === id)
    }
  },
});

export const { deleteProduct, toggleFavorite, addProduct } = productsSlice.actions;
export const { getProductById } = productsSlice.selectors;
export default productsSlice.reducer;
