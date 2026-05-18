import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ─── Types ────────────────────────────────────────────────────────────────────
export type LightingType =
  | "Interior Lighting"
  | "Flood Lights"
  | "Wall / Coach Lights"
  | "Driveway Lighting"
  | "Pole / Area Lighting"
  | "Landscape"
  | null;

export type InstallType = "New Installation" | "Replacement" | null;
export type YesNo = "Yes" | "No" | null;
export type SwitchType =
  | "Standard (Toggle)"
  | "Smart"
  | "Standard (Rocker/Decorator)"
  | "Dimmer (Rocker/Decorator)"
  | "Dimmer (Toggle)"
  | "Motion"
  | "Timer"
  | "I'll provide my own"
  | "Other"
  | "Standard"
  | "Rocker (Decorator)"
  | "Dimmer"
  | null;
export type SwitchNewExisting = "New" | "Existing" | null;
export type PowerControl = "Switch" | "Dusk to dawn" | "Timer" | null;
export type FixtureWeight = "less than 15 lbs" | "greater than 15 lbs" | null;
export type FixtureKind =
  | "Surface Mount"
  | "Recessed"
  | "Chain hung chandelier"
  | "Pendant (Chain)"
  | "Crystal Chandelier"
  | "Pendant (Rod)"
  | "Pendant (Cord)"
  | null;
export type WallSurface =
  | "Brick"
  | "Siding"
  | "Stucco"
  | "Concrete"
  | "Wood"
  | "Metal"
  | null;
export type VoltageType = "Line Voltage" | "Low Voltage" | null;

// ─── Sub-State Interfaces ─────────────────────────────────────────────────────

export interface InteriorState {
  fixtureWeight: FixtureWeight;
  fixtureKind: FixtureKind;
  complexAssembly: YesNo;
  installType: InstallType;
  ceilingHeight: string;
  providing: YesNo;
  fixtureDetails: string;
  switchNewExisting: SwitchNewExisting;
  upgradeSwitch: YesNo;
  switchKind: SwitchType;
  multiSwitch: YesNo;
  photosNew: string[];
  photosCurrent: string[];
  photosFixtureNew: string[];
}

export interface FloodLightsState {
  installType: InstallType;
  installHeight: string;
  providing: YesNo;
  floodDetails: string;
  powerControl: string | null;
  switchNewExisting: SwitchNewExisting;
  upgradeSwitch: YesNo;
  switchKind: SwitchType;
  switchOtherText: string;
  multiSwitch: YesNo;
  photosNew: string[];
  photosCurrent: string[];
  photosFixtureNew: string[];
}

export interface WallCoachState {
  installType: InstallType;
  surface: WallSurface;
  providing: YesNo;
  newLightDetails: string;
  switchNewExisting: SwitchNewExisting;
  upgradeSwitch: YesNo;
  switchKind: SwitchType;
  multiSwitch: YesNo;
  photosNew: string[];
  photosCurrent: string[];
  photosFixtureNew: string[];
}

export interface DrivewayState {
  installType: InstallType;
  providing: YesNo;
  newLightDetails: string;
  distance: string;
  powerControl: PowerControl;
  switchNewExisting: SwitchNewExisting;
  upgradeSwitch: YesNo;
  switchKind: SwitchType;
  switchOtherText: string;
  multiSwitch: YesNo;
  photosNew: string[];
  photosCurrent: string[];
  photosFixtureNew: string[];
}

export interface PoleAreaState {
  installType: InstallType;
  providing: YesNo;
  lightDetails: string;
  distance: string;
  powerControl: PowerControl;
  switchNewExisting: SwitchNewExisting;
  upgradeSwitch: YesNo;
  switchKind: SwitchType;
  switchOtherText: string;
  multiSwitch: YesNo;
  photosNew: string[];
  photosCurrent: string[];
  photosFixtureNew: string[];
}

export interface LandscapeState {
  voltage: VoltageType;
}

// ─── Root State ───────────────────────────────────────────────────────────────
export interface LightingState {
  // Step 1
  lightingType: LightingType;
  interior: InteriorState;
  floodLights: FloodLightsState;
  wallCoach: WallCoachState;
  driveway: DrivewayState;
  poleArea: PoleAreaState;
  landscape: LandscapeState;
  // Step 2
  additionalNotes: string;
}

// ─── Initial State ────────────────────────────────────────────────────────────
const initialInterior: InteriorState = {
  fixtureWeight: null,
  fixtureKind: null,
  complexAssembly: null,
  installType: null,
  ceilingHeight: "",
  providing: null,
  fixtureDetails: "",
  switchNewExisting: null,
  upgradeSwitch: null,
  switchKind: null,
  multiSwitch: null,
  photosNew: [],
  photosCurrent: [],
  photosFixtureNew: [],
};

const initialFloodLights: FloodLightsState = {
  installType: null,
  installHeight: "",
  providing: null,
  floodDetails: "",
  powerControl: null,
  switchNewExisting: null,
  upgradeSwitch: null,
  switchKind: null,
  switchOtherText: "",
  multiSwitch: null,
  photosNew: [],
  photosCurrent: [],
  photosFixtureNew: [],
};

const initialWallCoach: WallCoachState = {
  installType: null,
  surface: null,
  providing: null,
  newLightDetails: "",
  switchNewExisting: null,
  upgradeSwitch: null,
  switchKind: null,
  multiSwitch: null,
  photosNew: [],
  photosCurrent: [],
  photosFixtureNew: [],
};

const initialDriveway: DrivewayState = {
  installType: null,
  providing: null,
  newLightDetails: "",
  distance: "",
  powerControl: null,
  switchNewExisting: null,
  upgradeSwitch: null,
  switchKind: null,
  switchOtherText: "",
  multiSwitch: null,
  photosNew: [],
  photosCurrent: [],
  photosFixtureNew: [],
};

const initialPoleArea: PoleAreaState = {
  installType: null,
  providing: null,
  lightDetails: "",
  distance: "",
  powerControl: null,
  switchNewExisting: null,
  upgradeSwitch: null,
  switchKind: null,
  switchOtherText: "",
  multiSwitch: null,
  photosNew: [],
  photosCurrent: [],
  photosFixtureNew: [],
};

const initialState: LightingState = {
  lightingType: null,
  interior: initialInterior,
  floodLights: initialFloodLights,
  wallCoach: initialWallCoach,
  driveway: initialDriveway,
  poleArea: initialPoleArea,
  landscape: { voltage: null },
  additionalNotes: "",
};

// ─── Slice ────────────────────────────────────────────────────────────────────
const lightingDataSlice = createSlice({
  name: "lighting",
  initialState,
  reducers: {
    // ── Step 1: Lighting type ──────────────────────────────────────────────
    setLightingType(state, action: PayloadAction<LightingType>) {
      state.lightingType = action.payload;
    },

    // ── Interior ──────────────────────────────────────────────────────────
    setInteriorFixtureWeight(state, action: PayloadAction<FixtureWeight>) {
      state.interior.fixtureWeight = action.payload;
    },
    setInteriorFixtureKind(state, action: PayloadAction<FixtureKind>) {
      state.interior.fixtureKind = action.payload;
    },
    setInteriorComplexAssembly(state, action: PayloadAction<YesNo>) {
      state.interior.complexAssembly = action.payload;
    },
    setInteriorInstallType(state, action: PayloadAction<InstallType>) {
      state.interior.installType = action.payload;
    },
    setInteriorCeilingHeight(state, action: PayloadAction<string>) {
      state.interior.ceilingHeight = action.payload;
    },
    setInteriorProviding(state, action: PayloadAction<YesNo>) {
      state.interior.providing = action.payload;
    },
    setInteriorFixtureDetails(state, action: PayloadAction<string>) {
      state.interior.fixtureDetails = action.payload;
    },
    setInteriorSwitchNewExisting(
      state,
      action: PayloadAction<SwitchNewExisting>,
    ) {
      state.interior.switchNewExisting = action.payload;
    },
    setInteriorUpgradeSwitch(state, action: PayloadAction<YesNo>) {
      state.interior.upgradeSwitch = action.payload;
    },
    setInteriorSwitchKind(state, action: PayloadAction<SwitchType>) {
      state.interior.switchKind = action.payload;
    },
    setInteriorMultiSwitch(state, action: PayloadAction<YesNo>) {
      state.interior.multiSwitch = action.payload;
    },
    setInteriorPhotosNew(state, action: PayloadAction<string[]>) {
      state.interior.photosNew = action.payload;
    },
    setInteriorPhotosCurrent(state, action: PayloadAction<string[]>) {
      state.interior.photosCurrent = action.payload;
    },
    setInteriorPhotosFixtureNew(state, action: PayloadAction<string[]>) {
      state.interior.photosFixtureNew = action.payload;
    },

    // ── Flood Lights ──────────────────────────────────────────────────────
    setFloodInstallType(state, action: PayloadAction<InstallType>) {
      state.floodLights.installType = action.payload;
    },
    setFloodInstallHeight(state, action: PayloadAction<string>) {
      state.floodLights.installHeight = action.payload;
    },
    setFloodProviding(state, action: PayloadAction<YesNo>) {
      state.floodLights.providing = action.payload;
    },
    setFloodDetails(state, action: PayloadAction<string>) {
      state.floodLights.floodDetails = action.payload;
    },
    setFloodPowerControl(state, action: PayloadAction<string | null>) {
      state.floodLights.powerControl = action.payload;
    },
    setFloodSwitchNewExisting(state, action: PayloadAction<SwitchNewExisting>) {
      state.floodLights.switchNewExisting = action.payload;
    },
    setFloodUpgradeSwitch(state, action: PayloadAction<YesNo>) {
      state.floodLights.upgradeSwitch = action.payload;
    },
    setFloodSwitchKind(state, action: PayloadAction<SwitchType>) {
      state.floodLights.switchKind = action.payload;
    },
    setFloodSwitchOtherText(state, action: PayloadAction<string>) {
      state.floodLights.switchOtherText = action.payload;
    },
    setFloodMultiSwitch(state, action: PayloadAction<YesNo>) {
      state.floodLights.multiSwitch = action.payload;
    },
    setFloodPhotosNew(state, action: PayloadAction<string[]>) {
      state.floodLights.photosNew = action.payload;
    },
    setFloodPhotosCurrent(state, action: PayloadAction<string[]>) {
      state.floodLights.photosCurrent = action.payload;
    },
    setFloodPhotosFixtureNew(state, action: PayloadAction<string[]>) {
      state.floodLights.photosFixtureNew = action.payload;
    },

    // ── Wall / Coach ──────────────────────────────────────────────────────
    setWallInstallType(state, action: PayloadAction<InstallType>) {
      state.wallCoach.installType = action.payload;
    },
    setWallSurface(state, action: PayloadAction<WallSurface>) {
      state.wallCoach.surface = action.payload;
    },
    setWallProviding(state, action: PayloadAction<YesNo>) {
      state.wallCoach.providing = action.payload;
    },
    setWallNewLightDetails(state, action: PayloadAction<string>) {
      state.wallCoach.newLightDetails = action.payload;
    },
    setWallSwitchNewExisting(state, action: PayloadAction<SwitchNewExisting>) {
      state.wallCoach.switchNewExisting = action.payload;
    },
    setWallUpgradeSwitch(state, action: PayloadAction<YesNo>) {
      state.wallCoach.upgradeSwitch = action.payload;
    },
    setWallSwitchKind(state, action: PayloadAction<SwitchType>) {
      state.wallCoach.switchKind = action.payload;
    },
    setWallMultiSwitch(state, action: PayloadAction<YesNo>) {
      state.wallCoach.multiSwitch = action.payload;
    },
    setWallPhotosNew(state, action: PayloadAction<string[]>) {
      state.wallCoach.photosNew = action.payload;
    },
    setWallPhotosCurrent(state, action: PayloadAction<string[]>) {
      state.wallCoach.photosCurrent = action.payload;
    },
    setWallPhotosFixtureNew(state, action: PayloadAction<string[]>) {
      state.wallCoach.photosFixtureNew = action.payload;
    },

    // ── Driveway ──────────────────────────────────────────────────────────
    setDrivewayInstallType(state, action: PayloadAction<InstallType>) {
      state.driveway.installType = action.payload;
    },
    setDrivewayProviding(state, action: PayloadAction<YesNo>) {
      state.driveway.providing = action.payload;
    },
    setDrivewayNewLightDetails(state, action: PayloadAction<string>) {
      state.driveway.newLightDetails = action.payload;
    },
    setDrivewayDistance(state, action: PayloadAction<string>) {
      state.driveway.distance = action.payload;
    },
    setDrivewayPowerControl(state, action: PayloadAction<PowerControl>) {
      state.driveway.powerControl = action.payload;
    },
    setDrivewaySwitchNewExisting(
      state,
      action: PayloadAction<SwitchNewExisting>,
    ) {
      state.driveway.switchNewExisting = action.payload;
    },
    setDrivewayUpgradeSwitch(state, action: PayloadAction<YesNo>) {
      state.driveway.upgradeSwitch = action.payload;
    },
    setDrivewaySwitchKind(state, action: PayloadAction<SwitchType>) {
      state.driveway.switchKind = action.payload;
    },
    setDrivewaySwitchOtherText(state, action: PayloadAction<string>) {
      state.driveway.switchOtherText = action.payload;
    },
    setDrivewayMultiSwitch(state, action: PayloadAction<YesNo>) {
      state.driveway.multiSwitch = action.payload;
    },
    setDrivewayPhotosNew(state, action: PayloadAction<string[]>) {
      state.driveway.photosNew = action.payload;
    },
    setDrivewayPhotosCurrent(state, action: PayloadAction<string[]>) {
      state.driveway.photosCurrent = action.payload;
    },
    setDrivewayPhotosFixtureNew(state, action: PayloadAction<string[]>) {
      state.driveway.photosFixtureNew = action.payload;
    },

    // ── Pole / Area ───────────────────────────────────────────────────────
    setPoleInstallType(state, action: PayloadAction<InstallType>) {
      state.poleArea.installType = action.payload;
    },
    setPoleProviding(state, action: PayloadAction<YesNo>) {
      state.poleArea.providing = action.payload;
    },
    setPoleLightDetails(state, action: PayloadAction<string>) {
      state.poleArea.lightDetails = action.payload;
    },
    setPoleDistance(state, action: PayloadAction<string>) {
      state.poleArea.distance = action.payload;
    },
    setPolePowerControl(state, action: PayloadAction<PowerControl>) {
      state.poleArea.powerControl = action.payload;
    },
    setPoleSwitchNewExisting(state, action: PayloadAction<SwitchNewExisting>) {
      state.poleArea.switchNewExisting = action.payload;
    },
    setPoleUpgradeSwitch(state, action: PayloadAction<YesNo>) {
      state.poleArea.upgradeSwitch = action.payload;
    },
    setPoleSwitchKind(state, action: PayloadAction<SwitchType>) {
      state.poleArea.switchKind = action.payload;
    },
    setPoleSwitchOtherText(state, action: PayloadAction<string>) {
      state.poleArea.switchOtherText = action.payload;
    },
    setPoleMultiSwitch(state, action: PayloadAction<YesNo>) {
      state.poleArea.multiSwitch = action.payload;
    },
    setPolePhotosNew(state, action: PayloadAction<string[]>) {
      state.poleArea.photosNew = action.payload;
    },
    setPolePhotosCurrent(state, action: PayloadAction<string[]>) {
      state.poleArea.photosCurrent = action.payload;
    },
    setPolePhotosFixtureNew(state, action: PayloadAction<string[]>) {
      state.poleArea.photosFixtureNew = action.payload;
    },

    // ── Landscape ─────────────────────────────────────────────────────────
    setLandscapeVoltage(state, action: PayloadAction<VoltageType>) {
      state.landscape.voltage = action.payload;
    },

    // ── Step 2 ────────────────────────────────────────────────────────────
    setAdditionalNotes(state, action: PayloadAction<string>) {
      state.additionalNotes = action.payload;
    },

    // ── Reset ─────────────────────────────────────────────────────────────
    resetLightingData() {
      return initialState;
    },
  },
});

export const {
  // Step 1 - lighting type
  setLightingType,
  // Interior
  setInteriorFixtureWeight,
  setInteriorFixtureKind,
  setInteriorComplexAssembly,
  setInteriorInstallType,
  setInteriorCeilingHeight,
  setInteriorProviding,
  setInteriorFixtureDetails,
  setInteriorSwitchNewExisting,
  setInteriorUpgradeSwitch,
  setInteriorSwitchKind,
  setInteriorMultiSwitch,
  setInteriorPhotosNew,
  setInteriorPhotosCurrent,
  setInteriorPhotosFixtureNew,
  // Flood Lights
  setFloodInstallType,
  setFloodInstallHeight,
  setFloodProviding,
  setFloodDetails,
  setFloodPowerControl,
  setFloodSwitchNewExisting,
  setFloodUpgradeSwitch,
  setFloodSwitchKind,
  setFloodSwitchOtherText,
  setFloodMultiSwitch,
  setFloodPhotosNew,
  setFloodPhotosCurrent,
  setFloodPhotosFixtureNew,
  // Wall / Coach
  setWallInstallType,
  setWallSurface,
  setWallProviding,
  setWallNewLightDetails,
  setWallSwitchNewExisting,
  setWallUpgradeSwitch,
  setWallSwitchKind,
  setWallMultiSwitch,
  setWallPhotosNew,
  setWallPhotosCurrent,
  setWallPhotosFixtureNew,
  // Driveway
  setDrivewayInstallType,
  setDrivewayProviding,
  setDrivewayNewLightDetails,
  setDrivewayDistance,
  setDrivewayPowerControl,
  setDrivewaySwitchNewExisting,
  setDrivewayUpgradeSwitch,
  setDrivewaySwitchKind,
  setDrivewaySwitchOtherText,
  setDrivewayMultiSwitch,
  setDrivewayPhotosNew,
  setDrivewayPhotosCurrent,
  setDrivewayPhotosFixtureNew,
  // Pole / Area
  setPoleInstallType,
  setPoleProviding,
  setPoleLightDetails,
  setPoleDistance,
  setPolePowerControl,
  setPoleSwitchNewExisting,
  setPoleUpgradeSwitch,
  setPoleSwitchKind,
  setPoleSwitchOtherText,
  setPoleMultiSwitch,
  setPolePhotosNew,
  setPolePhotosCurrent,
  setPolePhotosFixtureNew,
  // Landscape
  setLandscapeVoltage,
  // Step 2
  setAdditionalNotes,
  // Reset
  resetLightingData,
} = lightingDataSlice.actions;

export default lightingDataSlice.reducer;
