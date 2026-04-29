import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChargerType = "Plug-in" | "Hardwired" | "I want help deciding" | "";
type ProvidingCharger = "Yes" | "No" | "";
type ChargerStatus =
  | "Currently have the charger"
  | "Ordered and waiting on delivery"
  | "Need to place order"
  | "Need help choosing a charger"
  | "";
type InstallationLocation = "Garage" | "Carport" | "Driveway" | "Other" | "";
type PanelLocation =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other (please specify)"
  | "";
type PanelDistance =
  | "Less than 25 ft"
  | "25–50 ft"
  | "50–100 ft"
  | "More than 100 ft"
  | "Unsure"
  | "";

interface EVChargerState {
  chargerType: ChargerType;
  nemaConfig: string;
  providingCharger: ProvidingCharger;
  chargerStatus: ChargerStatus;
  installationLocation: InstallationLocation;
  panelLocation: PanelLocation;
  panelDistance: PanelDistance;
  additionalInfo: string;
  chargerAreaPhotos: string[];
  panelPhotos: string[];
}

const initialState: EVChargerState = {
  chargerType: "",
  nemaConfig: "",
  providingCharger: "",
  chargerStatus: "",
  installationLocation: "",
  panelLocation: "",
  panelDistance: "",
  additionalInfo: "",
  chargerAreaPhotos: [],
  panelPhotos: [],
};

const evChargerSlice = createSlice({
  name: "evCharger",
  initialState,
  reducers: {
    setChargerType: (state, action: PayloadAction<ChargerType>) => {
      state.chargerType = action.payload;
      if (action.payload === "I want help deciding") {
        state.nemaConfig = "";
        state.providingCharger = "";
        state.chargerStatus = "";
      }
      if (action.payload !== "Plug-in") {
        state.nemaConfig = "";
      }
    },
    setNemaConfig: (state, action: PayloadAction<string>) => {
      state.nemaConfig = action.payload;
    },
    setProvidingCharger: (state, action: PayloadAction<ProvidingCharger>) => {
      state.providingCharger = action.payload;
      if (action.payload === "No") {
        state.chargerStatus = "";
      }
    },
    setChargerStatus: (state, action: PayloadAction<ChargerStatus>) => {
      state.chargerStatus = action.payload;
    },
    setInstallationLocation: (
      state,
      action: PayloadAction<InstallationLocation>,
    ) => {
      state.installationLocation = action.payload;
    },
    setPanelLocation: (state, action: PayloadAction<PanelLocation>) => {
      state.panelLocation = action.payload;
    },
    setPanelDistance: (state, action: PayloadAction<PanelDistance>) => {
      state.panelDistance = action.payload;
    },
    setAdditionalInfo: (state, action: PayloadAction<string>) => {
      state.additionalInfo = action.payload;
    },
    setChargerAreaPhotos: (state, action: PayloadAction<string[]>) => {
      state.chargerAreaPhotos = action.payload;
    },
    setEVPanelPhotos: (state, action: PayloadAction<string[]>) => {
      state.panelPhotos = action.payload;
    },
    clearEVCharger: () => initialState,
  },
});

export const {
  setChargerType,
  setNemaConfig,
  setProvidingCharger,
  setChargerStatus,
  setInstallationLocation,
  setPanelLocation,
  setPanelDistance,
  setAdditionalInfo,
  setChargerAreaPhotos,
  setEVPanelPhotos,
  clearEVCharger,
} = evChargerSlice.actions;

export default evChargerSlice.reducer;
