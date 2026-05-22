import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ─── Types ────────────────────────────────────────────────────────────────────
type InstallType = "New Installation" | "Replacement";
type FanLocation = "Attic" | "Kitchen" | "Bathroom";
type AtticFanType = "Roof fan" | "Gable (wall) fan";
type Stories = "1" | "2";
type PanelLocation =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other";
type YesNo = "Yes" | "No";
type AreaOption =
  | "Attic above"
  | "Occupied space above"
  | "Crawlspace (unfinished)"
  | "Crawlspace (finished)"
  | "Basement (unfinished)"
  | "Basement (finished)"
  | "Other";
type Distance =
  | "Less than 25 ft"
  | "25 – 50 ft"
  | "50 – 100 ft"
  | "More than 100 ft"
  | "Unsure";
type BathroomFanType =
  | "Standard"
  | "Quiet operation"
  | "Bluetooth speaker"
  | "Light/fan combo"
  | "Heater/light fan combo"
  | "Heater/fan (no light) combo";
type SpecialtyControl =
  | "No specialty control"
  | "Speed control"
  | "Humidity sensor"
  | "Timer";
type KitchenFanType =
  | "Hood fan over range / stove"
  | "Over the range microwave"
  | "Through the wall vent"
  | "Through the ceiling (commonly over an Island)";

// ─── State Interface ──────────────────────────────────────────────────────────
interface ExhaustFanState {
  // ── Step 1: General ────────────────────────────────────────────────────────
  installType: InstallType;
  fanLocation: FanLocation;

  // ── Step 1: Attic ──────────────────────────────────────────────────────────
  atticFanType: AtticFanType;
  supplyingAtticFan: YesNo;
  atticStories: Stories;
  photosNewFan: string[];
  photosAtticLocation: string[];

  // ── Step 1: Kitchen ────────────────────────────────────────────────────────
  kitchenYesNo: YesNo;
  kitchenFanType: KitchenFanType | null;
  kitchenAreas: AreaOption[];
  kitchenAreaOther: string;
  kitchenDist: Distance | null;
  kitchenDuctInfo: string;
  photosKitchenCurrentFan: string[];
  photosKitchenNewFan: string[];
  photosKitchenLocation: string[];

  // ── Step 1: Bathroom ───────────────────────────────────────────────────────
  bathroomYesNo: YesNo;
  bathroomFanType: BathroomFanType | null;
  specialtyControl: SpecialtyControl;
  bathroomAreas: AreaOption[];
  bathroomAreaOther: string;
  bathroomDist: Distance | null;
  bathroomDuctInfo: string;
  photosBathroomCurrentFan: string[];
  photosBathroomNewFan: string[];
  photosBathromlocation: string[];

  // ── Step 1: Electrical Panel ───────────────────────────────────────────────
  panelLocation: PanelLocation;
  panelLocationOther: string;
  photosPanelClose: string[];
  photosPanelWide: string[];

  // ── Step 2: Additional Notes ───────────────────────────────────────────────
  additionalNotes: string;
}

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState: ExhaustFanState = {
  // General
  installType: "Replacement",
  fanLocation: "Bathroom",

  // Attic
  atticFanType: "Gable (wall) fan",
  supplyingAtticFan: "Yes",
  atticStories: "1",
  photosNewFan: [],
  photosAtticLocation: [],

  // Kitchen
  kitchenYesNo: "No",
  kitchenFanType: null,
  kitchenAreas: [],
  kitchenAreaOther: "",
  kitchenDist: null,
  kitchenDuctInfo: "",
  photosKitchenCurrentFan: [],
  photosKitchenNewFan: [],
  photosKitchenLocation: [],

  // Bathroom
  bathroomYesNo: "Yes",
  bathroomFanType: null,
  specialtyControl: "No specialty control",
  bathroomAreas: [],
  bathroomAreaOther: "",
  bathroomDist: null,
  bathroomDuctInfo: "",
  photosBathroomCurrentFan: [],
  photosBathroomNewFan: [],
  photosBathromlocation: [],

  // Electrical Panel
  panelLocation: "Basement (Finished)",
  panelLocationOther: "",
  photosPanelClose: [],
  photosPanelWide: [],

  // Step 2
  additionalNotes: "",
};

// ─── Slice ────────────────────────────────────────────────────────────────────
const exhaustFanSlice = createSlice({
  name: "exhaustFan",
  initialState,
  reducers: {
    // ── General ──────────────────────────────────────────────────────────────
    setInstallType(state, action: PayloadAction<InstallType>) {
      state.installType = action.payload;
    },
    setFanLocation(state, action: PayloadAction<FanLocation>) {
      state.fanLocation = action.payload;
    },

    // ── Attic ─────────────────────────────────────────────────────────────────
    setAtticFanType(state, action: PayloadAction<AtticFanType>) {
      state.atticFanType = action.payload;
    },
    setSupplyingAtticFan(state, action: PayloadAction<YesNo>) {
      state.supplyingAtticFan = action.payload;
    },
    setAtticStories(state, action: PayloadAction<Stories>) {
      state.atticStories = action.payload;
    },
    setPhotosNewFan(state, action: PayloadAction<string[]>) {
      state.photosNewFan = action.payload;
    },
    setPhotosAtticLocation(state, action: PayloadAction<string[]>) {
      state.photosAtticLocation = action.payload;
    },

    // ── Kitchen ───────────────────────────────────────────────────────────────
    setKitchenYesNo(state, action: PayloadAction<YesNo>) {
      state.kitchenYesNo = action.payload;
    },
    setKitchenFanType(state, action: PayloadAction<KitchenFanType | null>) {
      state.kitchenFanType = action.payload;
    },
    setKitchenAreas(state, action: PayloadAction<AreaOption[]>) {
      state.kitchenAreas = action.payload;
    },
    toggleKitchenArea(state, action: PayloadAction<AreaOption>) {
      const area = action.payload;
      const idx = state.kitchenAreas.indexOf(area);
      if (idx === -1) {
        state.kitchenAreas.push(area);
      } else {
        state.kitchenAreas.splice(idx, 1);
      }
    },
    setKitchenAreaOther(state, action: PayloadAction<string>) {
      state.kitchenAreaOther = action.payload;
    },
    setKitchenDist(state, action: PayloadAction<Distance | null>) {
      state.kitchenDist = action.payload;
    },
    setKitchenDuctInfo(state, action: PayloadAction<string>) {
      state.kitchenDuctInfo = action.payload;
    },
    setPhotosKitchenCurrentFan(state, action: PayloadAction<string[]>) {
      state.photosKitchenCurrentFan = action.payload;
    },
    setPhotosKitchenNewFan(state, action: PayloadAction<string[]>) {
      state.photosKitchenNewFan = action.payload;
    },
    setphotosKitchenLocation(state, action: PayloadAction<string[]>) {
      state.photosKitchenLocation = action.payload;
    },

    // ── Bathroom ──────────────────────────────────────────────────────────────
    setBathroomYesNo(state, action: PayloadAction<YesNo>) {
      state.bathroomYesNo = action.payload;
    },
    setBathroomFanType(state, action: PayloadAction<BathroomFanType | null>) {
      state.bathroomFanType = action.payload;
    },
    setSpecialtyControl(state, action: PayloadAction<SpecialtyControl>) {
      state.specialtyControl = action.payload;
    },
    setBathroomAreas(state, action: PayloadAction<AreaOption[]>) {
      state.bathroomAreas = action.payload;
    },
    toggleBathroomArea(state, action: PayloadAction<AreaOption>) {
      const area = action.payload;
      const idx = state.bathroomAreas.indexOf(area);
      if (idx === -1) {
        state.bathroomAreas.push(area);
      } else {
        state.bathroomAreas.splice(idx, 1);
      }
    },
    setBathroomAreaOther(state, action: PayloadAction<string>) {
      state.bathroomAreaOther = action.payload;
    },
    setBathroomDist(state, action: PayloadAction<Distance | null>) {
      state.bathroomDist = action.payload;
    },
    setBathroomDuctInfo(state, action: PayloadAction<string>) {
      state.bathroomDuctInfo = action.payload;
    },
    setPhotosBathroomCurrentFan(state, action: PayloadAction<string[]>) {
      state.photosBathroomCurrentFan = action.payload;
    },
    setPhotosBathroomNewFan(state, action: PayloadAction<string[]>) {
      state.photosBathroomNewFan = action.payload;
    },

    setphotosBathromlocation(state, action: PayloadAction<string[]>) {
      state.photosBathromlocation = action.payload;
    },

    // ── Electrical Panel ──────────────────────────────────────────────────────
    setPanelLocation(state, action: PayloadAction<PanelLocation>) {
      state.panelLocation = action.payload;
    },
    setPanelLocationOther(state, action: PayloadAction<string>) {
      state.panelLocationOther = action.payload;
    },
    setPhotosPanelClose(state, action: PayloadAction<string[]>) {
      state.photosPanelClose = action.payload;
    },
    setPhotosPanelWide(state, action: PayloadAction<string[]>) {
      state.photosPanelWide = action.payload;
    },

    // ── Step 2 ────────────────────────────────────────────────────────────────
    setAdditionalNotes(state, action: PayloadAction<string>) {
      state.additionalNotes = action.payload;
    },

    // ── Reset ─────────────────────────────────────────────────────────────────
    resetExhaustFan() {
      return initialState;
    },
  },
});

export const {
  // General
  setInstallType,
  setFanLocation,
  // Attic
  setAtticFanType,
  setSupplyingAtticFan,
  setAtticStories,
  setPhotosNewFan,
  setPhotosAtticLocation,
  // Kitchen
  setKitchenYesNo,
  setKitchenFanType,
  setKitchenAreas,
  toggleKitchenArea,
  setKitchenAreaOther,
  setKitchenDist,
  setKitchenDuctInfo,
  setPhotosKitchenCurrentFan,
  setPhotosKitchenNewFan,
  setphotosKitchenLocation,
  // Bathroom
  setBathroomYesNo,
  setBathroomFanType,
  setSpecialtyControl,
  setBathroomAreas,
  toggleBathroomArea,
  setBathroomAreaOther,
  setBathroomDist,
  setBathroomDuctInfo,
  setPhotosBathroomCurrentFan,
  setPhotosBathroomNewFan,
  setphotosBathromlocation,
  // Panel
  setPanelLocation,
  setPanelLocationOther,
  setPhotosPanelClose,
  setPhotosPanelWide,
  // Step 2
  setAdditionalNotes,
  // Reset
  resetExhaustFan,
} = exhaustFanSlice.actions;

export type { ExhaustFanState };
export default exhaustFanSlice.reducer;
