import { Ionicons } from "@expo/vector-icons";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Category {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
}

interface CategoryState {
  selectedCategory: Category | null;
}

const initialState: CategoryState = {
  selectedCategory: null,
};

const categoryRouteSlice = createSlice({
  name: "categoryRoute",
  initialState,

  reducers: {
    setSelectedRouteCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setSelectedRouteCategory, clearSelectedCategory } =
  categoryRouteSlice.actions;
export default categoryRouteSlice.reducer;
