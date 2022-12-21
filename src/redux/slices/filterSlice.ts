import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title ',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type transSort = {
  name: string,
  sortProperty: SortPropertyEnum
}

export enum forPageCount {
  pageCount = 1
}

export interface FilterSliceState {
  searchValue: string,
  categotyId: number,
  pageCount: number,
  sort: transSort,
}

const initialState: FilterSliceState = {
  searchValue: '',
  categotyId: 0,
  pageCount: 1,
  sort: { name: 'популярности', sortProperty: SortPropertyEnum.RATING_DESC },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategotyId: (state, action: PayloadAction<number>) => {
      state.categotyId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    changeSortProperty: (state, action: PayloadAction<transSort>) => {
      state.sort = action.payload;
    },
    setPageCount: (state, action: PayloadAction<number>) => {
      state.pageCount = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.pageCount = +action.payload.pageCount;
      state.sort = action.payload.sort;
      state.categotyId = action.payload.categotyId;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const searchValueChange = (state: RootState) => state.filter.searchValue;

export const {
  setCategotyId, changeSortProperty, setPageCount, setFilters, setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
