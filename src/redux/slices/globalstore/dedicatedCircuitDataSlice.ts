import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DedicatedCircuitDataState {
  // St1
  selectedCircuit: string | null;
  otherCircuitText: string;
  selectedPanel: string | null;
  otherPanelText: string;

  // St2
  installLocation: string;
  selectedAboveBelow: string[];
  selectedDistance: string | null;
  otherDistanceText: string;

  // St3
  selectedAmp: number | null;
  selectedVolt: string | null;
  nemaConfig: string;

  // St4
  electricalMeterPhotos: string[];
  pathPhotos: string[];

  // St5
  additionalNotes: string;
}

const initialState: DedicatedCircuitDataState = {
  // St1
  selectedCircuit: null,
  otherCircuitText: "",
  selectedPanel: null,
  otherPanelText: "",

  // St2
  installLocation: "",
  selectedAboveBelow: [],
  selectedDistance: null,
  otherDistanceText: "",

  // St3
  selectedAmp: null,
  selectedVolt: null,
  nemaConfig: "",

  // St4
  electricalMeterPhotos: [],
  pathPhotos: [],

  // St5
  additionalNotes: "",
};

const dedicatedCircuitDataSlice = createSlice({
  name: "dedicatedCircuitData",
  initialState,
  reducers: {
    // ── St1 ──────────────────────────────────────────
    setSelectedCircuit(state, action: PayloadAction<string>) {
      state.selectedCircuit = action.payload;
      if (action.payload !== "Other") {
        state.otherCircuitText = "";
      }
    },
    setOtherCircuitText(state, action: PayloadAction<string>) {
      state.otherCircuitText = action.payload;
    },
    setSelectedPanel(state, action: PayloadAction<string>) {
      state.selectedPanel = action.payload;
      if (action.payload !== "Other (please specify)") {
        state.otherPanelText = "";
      }
    },
    setOtherPanelText(state, action: PayloadAction<string>) {
      state.otherPanelText = action.payload;
    },

    // ── St2 ──────────────────────────────────────────
    setInstallLocation(state, action: PayloadAction<string>) {
      state.installLocation = action.payload;
    },
    toggleAboveBelow(state, action: PayloadAction<string>) {
      const opt = action.payload;
      if (state.selectedAboveBelow.includes(opt)) {
        state.selectedAboveBelow = state.selectedAboveBelow.filter(
          (o) => o !== opt,
        );
      } else {
        state.selectedAboveBelow.push(opt);
      }
    },
    setSelectedDistance(state, action: PayloadAction<string>) {
      state.selectedDistance = action.payload;
      if (action.payload !== "Other") {
        state.otherDistanceText = "";
      }
    },
    setOtherDistanceText(state, action: PayloadAction<string>) {
      state.otherDistanceText = action.payload;
    },

    // ── St3 ──────────────────────────────────────────
    setSelectedAmp(state, action: PayloadAction<number | null>) {
      state.selectedAmp = action.payload;
    },
    setSelectedVolt(state, action: PayloadAction<string | null>) {
      state.selectedVolt = action.payload;
    },
    setNemaConfig(state, action: PayloadAction<string>) {
      state.nemaConfig = action.payload;
    },

    // ── St4 ──────────────────────────────────────────
    addElectricalMeterPhotos(state, action: PayloadAction<string[]>) {
      state.electricalMeterPhotos = [
        ...state.electricalMeterPhotos,
        ...action.payload,
      ];
    },
    removeElectricalMeterPhoto(state, action: PayloadAction<string>) {
      state.electricalMeterPhotos = state.electricalMeterPhotos.filter(
        (uri) => uri !== action.payload,
      );
    },
    addPathPhotos(state, action: PayloadAction<string[]>) {
      state.pathPhotos = [...state.pathPhotos, ...action.payload];
    },
    removePathPhoto(state, action: PayloadAction<string>) {
      state.pathPhotos = state.pathPhotos.filter(
        (uri) => uri !== action.payload,
      );
    },

    // ── St5 ──────────────────────────────────────────
    setAdditionalNotes(state, action: PayloadAction<string>) {
      state.additionalNotes = action.payload;
    },

    // ── Reset ─────────────────────────────────────────
    resetDedicatedCircuitData() {
      return initialState;
    },
  },
});

export const {
  setSelectedCircuit,
  setOtherCircuitText,
  setSelectedPanel,
  setOtherPanelText,
  setInstallLocation,
  toggleAboveBelow,
  setSelectedDistance,
  setOtherDistanceText,
  setSelectedAmp,
  setSelectedVolt,
  setNemaConfig,
  addElectricalMeterPhotos,
  removeElectricalMeterPhoto,
  addPathPhotos,
  removePathPhoto,
  setAdditionalNotes,
  resetDedicatedCircuitData,
} = dedicatedCircuitDataSlice.actions;

export default dedicatedCircuitDataSlice.reducer;
