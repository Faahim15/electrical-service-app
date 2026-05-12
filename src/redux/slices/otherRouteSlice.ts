import { Ionicons } from "@expo/vector-icons";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OtherCategory {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
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
    setSelectedRouteOtherCategory: (
      state,
      action: PayloadAction<OtherCategory>,
    ) => {
      state.selectedOtherCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedOtherCategory = null;
    },
  },
});

export const { setSelectedRouteOtherCategory, clearSelectedCategory } =
  otherCategoryRouteSlice.actions;
export default otherCategoryRouteSlice.reducer;
