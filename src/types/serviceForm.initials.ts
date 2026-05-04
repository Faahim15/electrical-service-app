import type {
  AccessoryBuildingDetails,
  DockPowerDetails,
  ElectricalInspectionDetails,
  EVChargerDetails,
  GeneratorDetails,
  HotTubDetails,
  NewConstructionDetails,
  PanelUpgradeDetails,
  RemodelingDetails,
  ServiceCallDetails,
} from "./serviceForm.types";

export const initialServiceCallDetails: ServiceCallDetails = {
  projectDetails: "",
  preferredTime: "",
  schedulingDays: [],
  additionalNotes: "",
  quickTags: [],
  panelPhotos: [],
  workAreaPhotos: [],
  referencePhotos: [],
};

export const initialEVChargerDetails: EVChargerDetails = {
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

export const initialPanelUpgradeDetails: PanelUpgradeDetails = {
  serviceType: "",
  upgradeAmps: "",
  currentAmperage: "",
  powerType: "",
  panelLocation: "",
  additionalInfo: "",
  meterPhotos: [],
  panelPhotos: [],
};

export const initialRemodelingDetails: RemodelingDetails = {
  panelLocation: "",
  remodlingArea: "",
  hasPlans: "",
  planPhotos: [],
  electricalNeeds: "",
  hasPermit: "",
  permitNumber: "",
  additionalInfo: "",
  existingSpacePhotos: [],
  panelPhotos: [],
};

export const initialAccessoryBuildingDetails: AccessoryBuildingDetails = {
  squareFootage: "",
  intendedUse: "",
  buildingStatus: "",
  constructionType: "",
  floorType: "",
  electricalNeeds: "",
  hasHeatingCooling: "",
  serviceType: "",
  newServiceSize: "",
  subPanelSize: "",
  circuitCount: "",
  ampRating: "",
  panelLocation: "",
  panelPhotos: [],
  privateUtilities: "",
  routeDistance: "",
  existingSpacePhotos: [],
  hasPlans: "",
  planDrawingPhotos: [],
  hasPermit: "",
  permitNumber: "",
  additionalInfo: "",
};

export const initialHotTubDetails: HotTubDetails = {
  hasUserManual: "",
  userManualPhotos: [],
  manufacturer: "",
  modelNumber: "",
  amperage: "",
  placement: "",
  panelLocation: "",
  panelDistance: "",
  additionalInfo: "",
  panelPhotos: [],
  installLocationPhotos: [],
  receptaclePhotos: [],
};

export const initialDockPowerDetails: DockPowerDetails = {
  dockBuilt: "",
  electricalNeeds: "",
  receptacleCount: "",
  serviceType: "",
  newServiceSize: "",
  subPanelSize: "",
  circuitCount: "",
  ampRating: "",
  panelLocation: "",
  panelPhotos: [],
  privateUtilities: "",
  routeDistance: "",
  existingSpacePhotos: [],
  hasPlans: "",
  planDrawingPhotos: [],
  hasPermit: "",
  permitNumber: "",
  additionalInfo: "",
};

export const initialElectricalInspectionDetails: ElectricalInspectionDetails = {
  inspectionType: "",
  squareFootage: "",
  panelCount: "",
  panelPhotos: [],
  additionalInfo: "",
};

export const initialGeneratorDetails: GeneratorDetails = {
  generatorType: "",
  hasGenerator: "",
  kwOutput: "",
  backupInstallation: "",
  generatorPhotos: [],
  panelDistance: "",
  panelLocation: "",
  purchaseSize: "",
  backedUpCircuits: "",
  hasPropane: "",

  panelPhotos: [],
  installLocationPhotos: [],
};

export const initialNewConstructionDetails: NewConstructionDetails = {
  constructionBegun: "",
  constructionStage: "",
  buildingPlanPhotos: [],
  hasBuildingPlans: "",
  buildingPlanPhotos2: [],
};
