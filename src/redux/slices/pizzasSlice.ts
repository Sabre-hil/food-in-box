import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store'; 

export type PizzaItem = {
  id: string,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  category: number,
  rating: number
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzasSlicesState {
  items: PizzaItem[],
  status: 'loading' | 'success' | 'error'
}

const initialState: PizzasSlicesState = {
  items: [],
  status: Status.LOADING,
};

export type SearchPizzaParams = {
  sortBy: string,
  order: string,
  searchPizzas: string,
  pageNumber: string,
  categotyId: string,
}

export const fethPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const {
      sortBy, order, searchPizzas, pageNumber, categotyId,
    } = params;
    const { data } = await axios.get<PizzaItem[]>(`https://634954060b382d796c8383ef.mockapi.io/pizzas?${pageNumber}${+categotyId > 0 ? `category=${categotyId}` : ''}&sortBy=${sortBy}&order=${order}&${searchPizzas}`);
    return data;
  },
);

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fethPizzas.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });

    builder.addCase(fethPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fethPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    })
  }
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
