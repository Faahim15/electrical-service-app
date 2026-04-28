import { TroubleshootingCategory } from "@/assets/data/troubleshootData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TroubleshootRouteState {
  selectedCategory: TroubleshootingCategory | null;
}

const initialState: TroubleshootRouteState = {
  selectedCategory: null,
};

const troubleshootRouteSlice = createSlice({
  name: "troubleshootRoute",
  initialState,
  reducers: {
    setSelectedCategory: (
      state,
      action: PayloadAction<TroubleshootingCategory>,
    ) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setSelectedCategory, clearSelectedCategory } =
  troubleshootRouteSlice.actions;
export default troubleshootRouteSlice.reducer;
