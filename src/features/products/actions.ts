import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsApi } from '../../utils/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const products = await getProductsApi();
      return products;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      return rejectWithValue(errorMessage);
    }
  }
);