import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  id: string;
  title: string;
  description: string;
  partners: number;
  emoji: string;
}

interface PartnersState {
  selectedCategory: Category | null;
}

const initialState: PartnersState = {
  selectedCategory: null,
};

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setSelectedCategory, clearSelectedCategory } =
  partnersSlice.actions;
export default partnersSlice.reducer;
