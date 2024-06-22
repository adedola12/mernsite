import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewData: null,
  error: null,
  loading: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    createReviewStart: (state) => {
        state.loading = true;
    },
    createReviewFailed: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },
    createReviewSuccess: (state, action) => {
        state.reviewData = action.payload;
        state.loading = false;
        state.error = null;
    }
  },
});

export const {
    createReviewStart,
    createReviewFailed,
    createReviewSuccess,
} = reviewSlice.actions;

export default reviewSlice.reducer;
