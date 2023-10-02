import { createSlice, Slice } from '@reduxjs/toolkit';
import { Cruise } from './types';

export type MainSliceState = {
  cruises: Cruise[];
};

const initialState: MainSliceState = {
  cruises: [],
};

export const mainSlice: Slice<MainSliceState> = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCruises: (state, action) => {
      state.cruises = action.payload;
    }
  },
});
