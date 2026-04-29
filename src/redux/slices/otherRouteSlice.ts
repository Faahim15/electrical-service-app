import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OtherCategory {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
}

interface OtherCategoryState {
  selectedOtherCategory: OtherCategory | null;
}

const initialState: OtherCategoryState = {
  selectedOtherCategory: null,
};

const otherCategoryRouteSlice = createSlice({
  name: "otherCategoryRoute",
  initialState,
  reducers: {
    setSelectedRouteCategory: (state, action: PayloadAction<OtherCategory>) => {
      state.selectedOtherCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedOtherCategory = null;
    },
  },
});

export const { setSelectedRouteCategory, clearSelectedCategory } =
  otherCategoryRouteSlice.actions;
export default otherCategoryRouteSlice.reducer;
