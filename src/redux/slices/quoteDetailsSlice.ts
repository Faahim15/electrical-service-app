import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuoteDetail {
  id: string;
  title: string;
  date: string;
  description: string;
  status: string;
}

interface QuoteDetailsState {
  selectedQuote: QuoteDetail | null;
}

const initialState: QuoteDetailsState = {
  selectedQuote: null,
};

const quoteDetailsSlice = createSlice({
  name: "quoteDetails",
  initialState,
  reducers: {
    setSelectedQuote: (state, action: PayloadAction<QuoteDetail>) => {
      state.selectedQuote = action.payload;
    },
    clearSelectedQuote: (state) => {
      state.selectedQuote = null;
    },
  },
});

export const { setSelectedQuote, clearSelectedQuote } =
  quoteDetailsSlice.actions;
export default quoteDetailsSlice.reducer;
