import { createSlice } from "@reduxjs/toolkit";
import { search } from "../services";
import { PagouMorouStateProps } from "./types";

export const initialState: PagouMorouStateProps = {
  isLoadingSearch: false,
  rooms: [],
};

export const PagouMorouSlice = createSlice({
  name: "pagoumorou",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    {/* search api */}
    builder.addCase(search.pending, (state) => {
      state.isLoadingSearch = true;
    });
    builder.addCase(search.rejected, (state) => {
      state.isLoadingSearch = false;
    });
    builder.addCase(search.fulfilled, (state, { payload }) => {
      state.isLoadingSearch = false;
    });
  },
});

export const PagouMorouActions = PagouMorouSlice.actions;

export const pagouMorouReducer = PagouMorouSlice.reducer;
