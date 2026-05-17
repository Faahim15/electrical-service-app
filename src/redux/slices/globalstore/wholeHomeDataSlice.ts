import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WholeHomeDataState {
  photos: string[];
  additionalNotes: string;
}

const initialState: WholeHomeDataState = {
  photos: [],
  additionalNotes: "",
};

const wholeHomeDataSlice = createSlice({
  name: "wholeHomeData",
  initialState,
  reducers: {
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
    setAdditionalNotes(state, action: PayloadAction<string>) {
      state.additionalNotes = action.payload;
    },
    resetWholeHomeData(state) {
      state.photos = [];
      state.additionalNotes = "";
    },
  },
});

export const { setPhotos, setAdditionalNotes, resetWholeHomeData } =
  wholeHomeDataSlice.actions;

export default wholeHomeDataSlice.reducer;
