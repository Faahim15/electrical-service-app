import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InstallationType = "replacement" | "new_install" | null;
type YesNo = "yes" | "no" | null;
type YesNoUnsure = "yes" | "no" | "unsure" | null;
type SwitchConnection = "new" | "existing" | "remote" | null;

interface CeilingFanDataState {
  // St1
  installationType: InstallationType;
  replacementPhotos: string[];
  selectedAreas: string[];
  hasLightFixture: YesNo;
  preWired: YesNoUnsure;

  // St2
  providingFan: YesNo;
  fanPhotos: string[];
  fanDescription: string;
  ceilingHeight: string;

  // St3
  switchConnection: SwitchConnection;
  selectedSwitchKind: string | null;
  upgradeSwitch: YesNo;

  // St4
  additionalNotes: string;
}

const initialState: CeilingFanDataState = {
  // St1
  installationType: null,
  replacementPhotos: [],
  selectedAreas: [],
  hasLightFixture: null,
  preWired: null,

  // St2
  providingFan: null,
  fanPhotos: [],
  fanDescription: "",
  ceilingHeight: "",

  // St3
  switchConnection: null,
  selectedSwitchKind: null,
  upgradeSwitch: null,

  // St4
  additionalNotes: "",
};

const ceilingFanDataSlice = createSlice({
  name: "ceilingFanData",
  initialState,
  reducers: {
    // ── St1 ──────────────────────────────────────────
    setInstallationType(state, action: PayloadAction<InstallationType>) {
      state.installationType = action.payload;
      // reset dependent fields when type changes
      state.replacementPhotos = [];
      state.selectedAreas = [];
      state.hasLightFixture = null;
      state.preWired = null;
    },
    addReplacementPhotos(state, action: PayloadAction<string[]>) {
      state.replacementPhotos = [...state.replacementPhotos, ...action.payload];
    },
    removeReplacementPhoto(state, action: PayloadAction<string>) {
      state.replacementPhotos = state.replacementPhotos.filter(
        (uri) => uri !== action.payload,
      );
    },
    toggleSelectedArea(state, action: PayloadAction<string>) {
      const area = action.payload;
      if (state.selectedAreas.includes(area)) {
        state.selectedAreas = state.selectedAreas.filter((a) => a !== area);
      } else {
        state.selectedAreas.push(area);
      }
    },
    setHasLightFixture(state, action: PayloadAction<YesNo>) {
      state.hasLightFixture = action.payload;
    },
    setPreWired(state, action: PayloadAction<YesNoUnsure>) {
      state.preWired = action.payload;
    },

    // ── St2 ──────────────────────────────────────────
    setProvidingFan(state, action: PayloadAction<YesNo>) {
      state.providingFan = action.payload;
      // reset dependent fields
      state.fanPhotos = [];
      state.fanDescription = "";
    },
    addFanPhotos(state, action: PayloadAction<string[]>) {
      state.fanPhotos = [...state.fanPhotos, ...action.payload];
    },
    removeFanPhoto(state, action: PayloadAction<string>) {
      state.fanPhotos = state.fanPhotos.filter((uri) => uri !== action.payload);
    },
    setFanDescription(state, action: PayloadAction<string>) {
      state.fanDescription = action.payload;
    },
    setCeilingHeight(state, action: PayloadAction<string>) {
      state.ceilingHeight = action.payload;
    },

    // ── St3 ──────────────────────────────────────────
    setSwitchConnection(state, action: PayloadAction<SwitchConnection>) {
      state.switchConnection = action.payload;
      // reset dependent fields
      state.selectedSwitchKind = null;
      state.upgradeSwitch = null;
    },
    setSelectedSwitchKind(state, action: PayloadAction<string | null>) {
      state.selectedSwitchKind = action.payload;
    },
    setUpgradeSwitch(state, action: PayloadAction<YesNo>) {
      state.upgradeSwitch = action.payload;
      if (action.payload === "no") {
        state.selectedSwitchKind = null;
      }
    },

    // ── St4 ──────────────────────────────────────────
    setAdditionalNotes(state, action: PayloadAction<string>) {
      state.additionalNotes = action.payload;
    },

    // ── Reset ─────────────────────────────────────────
    resetCeilingFanData() {
      return initialState;
    },
  },
});

export const {
  setInstallationType,
  addReplacementPhotos,
  removeReplacementPhoto,
  toggleSelectedArea,
  setHasLightFixture,
  setPreWired,
  setProvidingFan,
  addFanPhotos,
  removeFanPhoto,
  setFanDescription,
  setCeilingHeight,
  setSwitchConnection,
  setSelectedSwitchKind,
  setUpgradeSwitch,
  setAdditionalNotes,
  resetCeilingFanData,
} = ceilingFanDataSlice.actions;

export default ceilingFanDataSlice.reducer;
