import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "@/services/api";
import { SearchServicePayload } from "@/services/api/search/types";

export const search = createAsyncThunk(
  "pagoumorou/search",
  async (payload: SearchServicePayload, { rejectWithValue }) => {
    try {
      const response = await Api.searchService(payload)
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
