// slices/starlinkTheRouteSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DishLocation = "roof" | "eave" | "ground" | null;
export type MountingAnswer = "yes" | "no" | null;

interface StarlinkRouteState {
  dishLocation: DishLocation;
  hasMounting: MountingAnswer;
  images: string[];
}

const initialState: StarlinkRouteState = {
  dishLocation: null,
  hasMounting: null,
  images: [],
};

const starlinkRouteSlice = createSlice({
  name: "starlinkRoute",
  initialState,
  reducers: {
    setDishLocation(state, action: PayloadAction<DishLocation>) {
      state.dishLocation = action.payload;
      // Reset downstream fields when location changes
      state.hasMounting = null;
      state.images = [];
    },
    setHasMounting(state, action: PayloadAction<MountingAnswer>) {
      state.hasMounting = action.payload;
    },
    addImages(state, action: PayloadAction<string[]>) {
      state.images = [...state.images, ...action.payload];
    },
    removeImage(state, action: PayloadAction<string>) {
      state.images = state.images.filter((uri) => uri !== action.payload);
    },
    resetStarlinkRoute(state) {
      state.dishLocation = null;
      state.hasMounting = null;
      state.images = [];
    },
  },
});

export const {
  setDishLocation,
  setHasMounting,
  addImages,
  removeImage,
  resetStarlinkRoute,
} = starlinkRouteSlice.actions;

export default starlinkRouteSlice.reducer;
