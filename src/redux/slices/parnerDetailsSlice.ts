import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface details {
  id: string;
  name: string;
  category: string;
  phone: string;
  website: string | null;
}

interface PartnersState {
  selectedDetail: details | null;
}

const initialState: PartnersState = {
  selectedDetail: null,
};

const parnerDetailsSlice = createSlice({
  name: "partnersdetails",
  initialState,
  reducers: {
    setSelectedDetail: (state, action: PayloadAction<details>) => {
      state.selectedDetail = action.payload;
    },
    clearSelectedDetail: (state) => {
      state.selectedDetail = null;
    },
  },
});

export const { setSelectedDetail, clearSelectedDetail } =
  parnerDetailsSlice.actions;
export default parnerDetailsSlice.reducer;
