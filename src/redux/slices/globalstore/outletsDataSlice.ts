import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ─── Types ────────────────────────────────────────────────────────────────────

export type IntendedUse =
  | "General Use"
  | "Freezer"
  | "Tools / Equipment"
  | "Other";
export type InstallType = "New install" | "Replacement";
export type AmpOption = "15" | "20" | "30" | "50";
export type VoltOption = "110 or 120" | "220 or 240" | "110/220 or 120/240";

export type OutletType =
  | "Standard (Rounded)"
  | "Decorator (Rectangle)"
  | "GFI"
  | "Surge protected"
  | "Floor"
  | "Smart"
  | "Night light"
  | "I'll provide my own";

export type AboveBelowOption =
  | "Attic above"
  | "Occupied space above"
  | "Crawlspace (unfinished)"
  | "Crawlspace (finished)"
  | "Basement (unfinished)"
  | "Basement (finished)";

export type DistanceOption =
  | "Less than 25 ft"
  | "25 – 50 ft"
  | "50 – 100 ft"
  | "More than 100 ft"
  | "Unsure"
  | "Other";

// ─── Step State Interfaces ────────────────────────────────────────────────────

/** OutletsSt1 — intended use & quantity */
export interface OutletsSt1State {
  intendedUse: IntendedUse;
  otherUseText: string;
  quantity: string;
}

/** OutletsSt2 — installation type, photos, amps, volts, NEMA (standard outlets) */
export interface OutletsSt2State {
  installType: InstallType;
  photos: string[];
  selectedAmp: AmpOption;
  selectedVolt: VoltOption;
  nemaConfig: string;
}

/** OutletsSt3 — installation type (replacement flow), photo */
export interface OutletsSt3State {
  installType: InstallType;
  photo: string | null;
}

/** OutletsSt4 — outlet types */
export interface OutletsSt4State {
  selectedTypes: OutletType[];
}

/** OutletsSt5 — additional notes */
export interface OutletsSt5State {
  additionalNotes: string;
}

/** OutletsDedicatedCircuitSt2 — panel and location */
export interface OutletsDedicatedCircuitSt2State {
  installLocation: string;
  aboveBelow: AboveBelowOption[];
  distance: DistanceOption | null;
  otherDistanceText: string;
}

/** OutletsDedicatedCircuitSt3 — electrical specifications */
export interface OutletsDedicatedCircuitSt3State {
  selectedAmp: number | null;
  selectedVolt: VoltOption | null;
  nemaConfig: string;
}

/** OutletsDedicatedCircuitSt4 — photo uploads */
export interface OutletsDedicatedCircuitSt4State {
  electricalMeterPhotos: string[];
  pathPhotos: string[];
}

// ─── Root State ───────────────────────────────────────────────────────────────

export interface OutletsDataState {
  // Standard outlet steps
  st1: OutletsSt1State;
  st2: OutletsSt2State;
  st3: OutletsSt3State;
  st4: OutletsSt4State;
  st5: OutletsSt5State;

  // Dedicated circuit steps
  dedicatedCircuitSt2: OutletsDedicatedCircuitSt2State;
  dedicatedCircuitSt3: OutletsDedicatedCircuitSt3State;
  dedicatedCircuitSt4: OutletsDedicatedCircuitSt4State;
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: OutletsDataState = {
  st1: {
    intendedUse: "General Use",
    otherUseText: "",
    quantity: "",
  },

  st2: {
    installType: "New install",
    photos: [],
    selectedAmp: "15",
    selectedVolt: "110 or 120",
    nemaConfig: "",
  },

  st3: {
    installType: "Replacement",
    photo: null,
  },

  st4: {
    selectedTypes: [],
  },

  st5: {
    additionalNotes: "",
  },

  dedicatedCircuitSt2: {
    installLocation: "",
    aboveBelow: [],
    distance: null,
    otherDistanceText: "",
  },

  dedicatedCircuitSt3: {
    selectedAmp: null,
    selectedVolt: null,
    nemaConfig: "",
  },

  dedicatedCircuitSt4: {
    electricalMeterPhotos: [],
    pathPhotos: [],
  },
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const outletsDataSlice = createSlice({
  name: "outletsData",
  initialState,
  reducers: {
    // ── St1 ──────────────────────────────────────────────────────────────────
    setIntendedUse(state, action: PayloadAction<IntendedUse>) {
      state.st1.intendedUse = action.payload;
    },
    setOtherUseText(state, action: PayloadAction<string>) {
      state.st1.otherUseText = action.payload;
    },
    setQuantity(state, action: PayloadAction<string>) {
      state.st1.quantity = action.payload;
    },

    // ── St2 ──────────────────────────────────────────────────────────────────
    setSt2InstallType(state, action: PayloadAction<InstallType>) {
      state.st2.installType = action.payload;
    },
    setSt2Photos(state, action: PayloadAction<string[]>) {
      state.st2.photos = action.payload;
    },
    setSt2SelectedAmp(state, action: PayloadAction<AmpOption>) {
      state.st2.selectedAmp = action.payload;
    },
    setSt2SelectedVolt(state, action: PayloadAction<VoltOption>) {
      state.st2.selectedVolt = action.payload;
    },
    setSt2NemaConfig(state, action: PayloadAction<string>) {
      state.st2.nemaConfig = action.payload;
    },

    // ── St3 ──────────────────────────────────────────────────────────────────
    setSt3InstallType(state, action: PayloadAction<InstallType>) {
      state.st3.installType = action.payload;
    },
    setSt3Photo(state, action: PayloadAction<string | null>) {
      state.st3.photo = action.payload;
    },

    // ── St4 ──────────────────────────────────────────────────────────────────
    toggleOutletType(state, action: PayloadAction<OutletType>) {
      const type = action.payload;
      const idx = state.st4.selectedTypes.indexOf(type);
      if (idx === -1) {
        state.st4.selectedTypes.push(type);
      } else {
        state.st4.selectedTypes.splice(idx, 1);
      }
    },
    setSelectedOutletTypes(state, action: PayloadAction<OutletType[]>) {
      state.st4.selectedTypes = action.payload;
    },

    // ── St5 ──────────────────────────────────────────────────────────────────
    setAdditionalNotes(state, action: PayloadAction<string>) {
      state.st5.additionalNotes = action.payload;
    },

    // ── Dedicated Circuit St2 ─────────────────────────────────────────────────
    setInstallLocation(state, action: PayloadAction<string>) {
      state.dedicatedCircuitSt2.installLocation = action.payload;
    },
    toggleAboveBelow(state, action: PayloadAction<AboveBelowOption>) {
      const opt = action.payload;
      const idx = state.dedicatedCircuitSt2.aboveBelow.indexOf(opt);
      if (idx === -1) {
        state.dedicatedCircuitSt2.aboveBelow.push(opt);
      } else {
        state.dedicatedCircuitSt2.aboveBelow.splice(idx, 1);
      }
    },
    setDistance(state, action: PayloadAction<DistanceOption | null>) {
      state.dedicatedCircuitSt2.distance = action.payload;
    },
    setOtherDistanceText(state, action: PayloadAction<string>) {
      state.dedicatedCircuitSt2.otherDistanceText = action.payload;
    },

    // ── Dedicated Circuit St3 ─────────────────────────────────────────────────
    setDedicatedAmp(state, action: PayloadAction<number | null>) {
      state.dedicatedCircuitSt3.selectedAmp = action.payload;
    },
    setDedicatedVolt(state, action: PayloadAction<VoltOption | null>) {
      state.dedicatedCircuitSt3.selectedVolt = action.payload;
    },
    setDedicatedNemaConfig(state, action: PayloadAction<string>) {
      state.dedicatedCircuitSt3.nemaConfig = action.payload;
    },

    // ── Dedicated Circuit St4 ─────────────────────────────────────────────────
    setElectricalMeterPhotos(state, action: PayloadAction<string[]>) {
      state.dedicatedCircuitSt4.electricalMeterPhotos = action.payload;
    },
    setPathPhotos(state, action: PayloadAction<string[]>) {
      state.dedicatedCircuitSt4.pathPhotos = action.payload;
    },

    // ── Reset ─────────────────────────────────────────────────────────────────
    resetOutletsData() {
      return initialState;
    },
  },
});

// ─── Exports ──────────────────────────────────────────────────────────────────

export const {
  // St1
  setIntendedUse,
  setOtherUseText,
  setQuantity,
  // St2
  setSt2InstallType,
  setSt2Photos,
  setSt2SelectedAmp,
  setSt2SelectedVolt,
  setSt2NemaConfig,
  // St3
  setSt3InstallType,
  setSt3Photo,
  // St4
  toggleOutletType,
  setSelectedOutletTypes,
  // St5
  setAdditionalNotes,
  // Dedicated Circuit St2
  setInstallLocation,
  toggleAboveBelow,
  setDistance,
  setOtherDistanceText,
  // Dedicated Circuit St3
  setDedicatedAmp,
  setDedicatedVolt,
  setDedicatedNemaConfig,
  // Dedicated Circuit St4
  setElectricalMeterPhotos,
  setPathPhotos,
  // Reset
  resetOutletsData,
} = outletsDataSlice.actions;

export default outletsDataSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectOutletsSt1 = (state: { outletsData: OutletsDataState }) =>
  state.outletsData.st1;

export const selectOutletsSt2 = (state: { outletsData: OutletsDataState }) =>
  state.outletsData.st2;

export const selectOutletsSt3 = (state: { outletsData: OutletsDataState }) =>
  state.outletsData.st3;

export const selectOutletsSt4 = (state: { outletsData: OutletsDataState }) =>
  state.outletsData.st4;

export const selectOutletsSt5 = (state: { outletsData: OutletsDataState }) =>
  state.outletsData.st5;

export const selectDedicatedCircuitSt2 = (state: {
  outletsData: OutletsDataState;
}) => state.outletsData.dedicatedCircuitSt2;

export const selectDedicatedCircuitSt3 = (state: {
  outletsData: OutletsDataState;
}) => state.outletsData.dedicatedCircuitSt3;

export const selectDedicatedCircuitSt4 = (state: {
  outletsData: OutletsDataState;
}) => state.outletsData.dedicatedCircuitSt4;
