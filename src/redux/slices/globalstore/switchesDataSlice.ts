import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../store";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InstallType = string;

export type SwitchType = string;

export interface SwitchesState {
  // Step 1 — Switch details
  quantity: string;
  installType: InstallType;

  // Step 2 — Photos
  photos: string[];

  // Step 3 — Switch type
  selectedTypes: SwitchType[];

  // Step 4 — Additional notes
  additionalNotes: string;
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: SwitchesState = {
  // Step 1
  quantity: "",
  installType: "New install",

  // Step 2
  photos: [],

  // Step 3
  selectedTypes: [],

  // Step 4
  additionalNotes: "",
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const switchesDataSlice = createSlice({
  name: "switchesData",
  initialState,
  reducers: {
    // Step 1
    setQuantity(state, action: PayloadAction<string>) {
      state.quantity = action.payload;
    },
    setInstallType(state, action: PayloadAction<InstallType>) {
      state.installType = action.payload;
    },

    // Step 2
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
    addPhoto(state, action: PayloadAction<string>) {
      state.photos.push(action.payload);
    },
    removePhoto(state, action: PayloadAction<string>) {
      state.photos = state.photos.filter((p) => p !== action.payload);
    },

    // Step 3
    setSelectedTypes(state, action: PayloadAction<SwitchType[]>) {
      state.selectedTypes = action.payload;
    },
    toggleSwitchType(state, action: PayloadAction<SwitchType>) {
      const type = action.payload;
      const exists = state.selectedTypes.includes(type);
      state.selectedTypes = exists
        ? state.selectedTypes.filter((t) => t !== type)
        : [...state.selectedTypes, type];
    },

    // Step 4
    setAdditionalNotes(state, action: PayloadAction<string>) {
      state.additionalNotes = action.payload;
    },

    // Global reset (e.g. after submission or on flow exit)
    resetSwitchesData() {
      return initialState;
    },
  },
});

// ─── Exports ──────────────────────────────────────────────────────────────────

export const {
  setQuantity,
  setInstallType,
  setPhotos,
  addPhoto,
  removePhoto,
  setSelectedTypes,
  toggleSwitchType,
  setAdditionalNotes,
  resetSwitchesData,
} = switchesDataSlice.actions;

export default switchesDataSlice.reducer;
export const selectSwitchesQuantity = (state: RootState) =>
  state.switchesData.quantity;

export const selectSwitchesInstallType = (state: RootState) =>
  state.switchesData.installType;

export const selectSwitchesPhotos = (state: RootState) =>
  state.switchesData.photos;

export const selectSwitchesSelectedTypes = (state: RootState) =>
  state.switchesData.selectedTypes;

export const selectSwitchesAdditionalNotes = (state: RootState) =>
  state.switchesData.additionalNotes;

/** Full switches payload — useful for form submission */
export const selectSwitchesPayload = (state: RootState): SwitchesState =>
  state.switchesData;
