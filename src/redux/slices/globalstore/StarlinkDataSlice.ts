import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type EquipmentAnswer = "yes" | "no" | null;

interface StarlinkDataState {
  // St1
  hasEquipment: EquipmentAnswer;
  expectedDate: string;

  // St2
  dishLocation: "roof" | "eave" | "ground" | null;
  hasMounting: "yes" | "no" | null;
  dishPhotos: string[];

  // St3
  routerRoom: string;
  aboveOptions: string[];
  routerPhotos: string[];

  // St4
  additionalNotes: string;
}

const initialState: StarlinkDataState = {
  // St1
  hasEquipment: null,
  expectedDate: "",

  // St2
  dishLocation: null,
  hasMounting: null,
  dishPhotos: [],

  // St3
  routerRoom: "",
  aboveOptions: [],
  routerPhotos: [],

  // St4
  additionalNotes: "",
};

const starlinkDataSlice = createSlice({
  name: "starlinkData",
  initialState,
  reducers: {
    // ── St1 ──────────────────────────────────────────
    setHasEquipment(state, action: PayloadAction<EquipmentAnswer>) {
      state.hasEquipment = action.payload;
      if (action.payload === "yes") {
        state.expectedDate = ""; // clear date if they switch to yes
      }
    },
    setExpectedDate(state, action: PayloadAction<string>) {
      state.expectedDate = action.payload;
    },

    // ── St2 ──────────────────────────────────────────
    setDishLocationp(state, action: PayloadAction<"roof" | "eave" | "ground">) {
      state.dishLocation = action.payload;
      // reset dependent fields when location changes
      state.hasMounting = null;
      state.dishPhotos = [];
    },
    setHasMounting(state, action: PayloadAction<"yes" | "no">) {
      state.hasMounting = action.payload;
    },
    addDishPhotos(state, action: PayloadAction<string[]>) {
      state.dishPhotos = [...state.dishPhotos, ...action.payload];
    },
    removeDishPhoto(state, action: PayloadAction<string>) {
      state.dishPhotos = state.dishPhotos.filter(
        (uri) => uri !== action.payload,
      );
    },

    // ── St3 ──────────────────────────────────────────
    setRouterRoom(state, action: PayloadAction<string>) {
      state.routerRoom = action.payload;
    },
    toggleAboveOption(state, action: PayloadAction<string>) {
      const opt = action.payload;
      if (state.aboveOptions.includes(opt)) {
        state.aboveOptions = state.aboveOptions.filter((o) => o !== opt);
      } else {
        state.aboveOptions.push(opt);
      }
    },
    addRouterPhotos(state, action: PayloadAction<string[]>) {
      state.routerPhotos = [...state.routerPhotos, ...action.payload];
    },
    removeRouterPhoto(state, action: PayloadAction<string>) {
      state.routerPhotos = state.routerPhotos.filter(
        (uri) => uri !== action.payload,
      );
    },

    // ── St4 ──────────────────────────────────────────
    setAdditionalNotes(state, action: PayloadAction<string>) {
      state.additionalNotes = action.payload;
    },

    // ── Reset ─────────────────────────────────────────
    resetStarlinkData() {
      return initialState;
    },
  },
});

export const {
  setHasEquipment,
  setExpectedDate,
  setDishLocationp,
  setHasMounting,
  addDishPhotos,
  removeDishPhoto,
  setRouterRoom,
  toggleAboveOption,
  addRouterPhotos,
  removeRouterPhoto,
  setAdditionalNotes,
  resetStarlinkData,
} = starlinkDataSlice.actions;

export default starlinkDataSlice.reducer;
