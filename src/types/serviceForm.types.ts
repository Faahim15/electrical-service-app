// ============================================
// COMMON TYPES
// ============================================
export interface ContactDetails {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: "Call" | "Text" | "Email";
}

export interface ServiceAddress {
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  isHomeAddress: boolean;
}

export interface ProjectBasics {
  propertyType: "House" | "Condo" | "Apartment" | "Commercial" | "";
  ownershipStatus: "Owner" | "Tenant" | "Property Manager" | "Other" | "";
  timeline:
    | "As soon as possible"
    | "This week"
    | "This month"
    | "Flexible"
    | "";
  ownershipStatusOther: string; // এটা add করো
}

// ============================================
// id: "1" - Service Call
// ============================================
export interface ServiceCallDetails {
  projectDetails: string;
  preferredTime: "AM (8-11)" | "PM (12-2)" | "";
  schedulingDays: string[];
  additionalNotes: string;
  quickTags: string[];
  panelPhotos: string[];
  workAreaPhotos: string[];
  referencePhotos: string[];
}

// ============================================
// id: "2" - EV Charger
// ============================================
export type ChargerType = "Plug-in" | "Hardwired" | "I want help deciding" | "";
export type ProvidingCharger = "Yes" | "No" | "";
export type ChargerStatus =
  | "Currently have the charger"
  | "Ordered and waiting on delivery"
  | "Need to place order"
  | "Need help choosing a charger"
  | "";
export type InstallationLocation =
  | "Garage"
  | "Carport"
  | "Driveway"
  | "Other"
  | "";
export type PanelLocation =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other (please specify)"
  | "";
export type PanelDistance =
  | "Less than 25 ft"
  | "25–50 ft"
  | "50–100 ft"
  | "More than 100 ft"
  | "Unsure"
  | "";

export interface EVChargerDetails {
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
  panelLocationOther: string;
  installationLocationOther: string;
}

// ============================================
// id: "3" - Panel Upgrade
// ============================================
export type ServiceType = "Replacement" | "Upgrade" | "";
export type UpgradeAmps = "100" | "150" | "200" | "300" | "350" | "400" | "";
export type CurrentAmperage =
  | "50"
  | "60"
  | "100"
  | "150"
  | "200"
  | "Unsure"
  | "Other"
  | "";
export type PowerType = "Overhead" | "Underground" | "Unsure" | "";
export type PanelLocationUpgrade =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other (please specify)"
  | "";

export interface PanelUpgradeDetails {
  serviceType: ServiceType;
  upgradeAmps: UpgradeAmps;
  currentAmperage: CurrentAmperage;
  powerType: PowerType;
  panelLocation: PanelLocationUpgrade;
  additionalInfo: string;
  meterPhotos: string[];
  panelPhotos: string[];
  currentAmperageOther: string;
  panelLocationOther: string;
}

// ============================================
// id: "4" - Remodeling
// ============================================
export type Remodeling_PanelLocation =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other (please specify)"
  | "";
export type HasPlans = "Yes" | "No" | "";

export interface RemodelingDetails {
  panelLocation: Remodeling_PanelLocation;
  remodlingArea: string;
  hasPlans: HasPlans;
  planPhotos: string[];
  electricalNeeds: string;
  hasPermit: "Yes" | "No" | "";
  permitNumber: string;
  additionalInfo: string;
  existingSpacePhotos: string[];
  panelPhotos: string[];
  panelLocationOther: string;
}

// ============================================
// id: "5" - Accessory Building
// ============================================
export type BuildingStatus =
  | "Yes"
  | "No"
  | "Will be delivered / built soon"
  | "";
export type ConstructionType =
  | "Metal/Steel"
  | "Pole Barn"
  | "Wood (Pre-fabricated)"
  | "Wood (built on site)"
  | "";
export type FloorType = "Dirt" | "Stone" | "Wood" | "Concrete" | "";
export type HeatingCooling = "Yes" | "No" | "";
export type ServiceType_5 =
  | "New Service"
  | "Sub-panel"
  | "1-2 dedicated circuits"
  | "";
export type NewServiceSize =
  | "100 amp"
  | "125 amp"
  | "150 amp"
  | "200 amp"
  | "300 amp"
  | "350 amp"
  | "400 amp"
  | "Unsure"
  | "Other"
  | "";
export type SubPanelSize =
  | "30 amp"
  | "50 amp"
  | "60 amp"
  | "100 amp"
  | "125 amp"
  | "Unsure"
  | "Other"
  | "";
export type CircuitCount = "1" | "2" | "";
export type AmpRating = "15" | "20" | "";
export type AccessoryPanelLocation =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other (please specify)"
  | "";

export interface AccessoryBuildingDetails {
  squareFootage: string;
  intendedUse: string;
  buildingStatus: BuildingStatus;
  constructionType: ConstructionType;
  floorType: FloorType;
  electricalNeeds: string;
  hasHeatingCooling: HeatingCooling;
  serviceType: ServiceType_5;
  newServiceSize: NewServiceSize;
  subPanelSize: SubPanelSize;
  circuitCount: CircuitCount;
  ampRating: AmpRating;
  panelLocation: AccessoryPanelLocation;
  panelPhotos: string[];
  privateUtilities: string;
  routeDistance: string;
  existingSpacePhotos: string[];
  hasPlans: "Yes" | "No" | "";
  planDrawingPhotos: string[];
  hasPermit: "Yes" | "No" | "";
  permitNumber: string;
  additionalInfo: string;

  panelLocationOther: string; // add করো
  newServiceSizeOther: string; // add করো
  subPanelSizeOther: string; // add করো
}

// ============================================
// id: "6" - Hot Tub Installation
// ============================================
export type HasUserManual = "Yes" | "No" | "";
export type HotTubAmperage =
  | "20 amps"
  | "30 amps"
  | "40 amps"
  | "50 amps"
  | "60 amps"
  | "I'm not sure"
  | "";
export type HotTubPlacement =
  | "Ground"
  | "Concrete pad"
  | "Concrete patio"
  | "Deck (wood)"
  | "Deck (composite)"
  | "Other"
  | "";
export type HotTub_PanelLocation =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other (please specify)"
  | "";
export type HotTub_PanelDistance =
  | "Less than 25 ft"
  | "25 - 50 ft"
  | "50 - 100 ft"
  | "More than 100 ft"
  | "Unsure"
  | "";

export interface HotTubDetails {
  hasUserManual: HasUserManual;
  userManualPhotos: string[];
  manufacturer: string;
  modelNumber: string;
  amperage: HotTubAmperage;
  placement: HotTubPlacement;
  panelLocation: HotTub_PanelLocation;
  panelDistance: HotTub_PanelDistance;
  additionalInfo: string;
  panelPhotos: string[];
  installLocationPhotos: string[];
  receptaclePhotos: string[];

  placementOther: string; // add করো
  panelLocationOther: string; // add করো
}

// ============================================
// id: "7" - Dock Power
// ============================================
export type DockBuilt = "Yes" | "No" | "";
export type DockServiceType =
  | "New service"
  | "Sub-panel"
  | "1-2 dedicated circuits"
  | "";
export type DockNewServiceSize =
  | "100 amp"
  | "125 amp"
  | "150 amp"
  | "200 amp"
  | "300 amp"
  | "350 amp"
  | "400 amp"
  | "Unsure"
  | "Other"
  | "";
export type DockSubPanelSize =
  | "30 amp"
  | "50 amp"
  | "60 amp"
  | "100 amp"
  | "125 amp"
  | "Unsure"
  | "Other"
  | "";
export type DockCircuitCount = "1" | "2" | "";
export type DockAmpRating = "15" | "20" | "";
export type Dock_PanelLocation =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other (please specify)"
  | "";

export interface DockPowerDetails {
  dockBuilt: DockBuilt;
  electricalNeeds: string;
  receptacleCount: string;
  serviceType: DockServiceType;
  newServiceSize: DockNewServiceSize;
  subPanelSize: DockSubPanelSize;
  circuitCount: DockCircuitCount;
  ampRating: DockAmpRating;
  panelLocation: Dock_PanelLocation;
  panelPhotos: string[];
  privateUtilities: string;
  routeDistance: string;
  existingSpacePhotos: string[];
  hasPlans: "Yes" | "No" | "";
  planDrawingPhotos: string[];
  hasPermit: "Yes" | "No" | "";
  permitNumber: string;
  additionalInfo: string;
  panelLocationOther: string; // add করো
  newServiceSizeOther: string; // add করো
  subPanelSizeOther: string; // add করো
}

// ============================================
// id: "8" - Electrical Inspection
// ============================================
export type InspectionType =
  | "Whole House"
  | "Accessory Building"
  | "Partial House"
  | "Electrical Service only"
  | "";

export interface ElectricalInspectionDetails {
  inspectionType: InspectionType;
  squareFootage: string;
  panelCount: string;
  panelPhotos: string[];
  additionalInfo: string;
}

// ============================================
// id: "9" - Generator Installation
// ============================================
export type GeneratorType = "Portable" | "Whole Home Standby" | "";
export type HasGenerator = "Yes" | "No" | "";
export type GeneratorKWOutput =
  | "Small (2kW - 4kW)"
  | "Medium (4kW – 7kW)"
  | "Large (7kW – 10kW+)"
  | "I'm not sure"
  | "";
export type BackupInstallation =
  | "Whole panel with interlock"
  | "Dedicated generator panel"
  | "Unsure"
  | "";
export type Generator_PanelDistance =
  | "Less than 25 ft"
  | "25 – 55 ft"
  | "50 – 100 ft"
  | "More than 100 ft"
  | "Unsure"
  | "";
export type Generator_PanelLocation =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other (please specify)"
  | "";
export type GeneratorPurchaseSize =
  | "Small (2kW - 4kW)"
  | "Medium (4kW – 7kW)"
  | "Large (7kW – 10kW+)"
  | "I'm not sure"
  | "";
export type HasPropane = "Yes" | "No" | "";

export interface GeneratorDetails {
  generatorType: GeneratorType;
  // Portable specific
  hasGenerator: HasGenerator;
  // Yes — already have
  kwOutput: GeneratorKWOutput;
  backupInstallation: BackupInstallation;
  generatorPhotos: string[];
  panelDistance: Generator_PanelDistance;
  panelLocation: Generator_PanelLocation;
  // No — purchasing
  purchaseSize: GeneratorPurchaseSize;
  // Whole Home Standby specific
  backedUpCircuits: string;
  hasPropane: HasPropane;

  panelPhotos: string[];
  installLocationPhotos: string[];
}

// ============================================
// id: "10" - New Construction
// ============================================
export type ConstructionBegun = "Yes" | "No" | "";
export type ConstructionStage =
  | "Preliminary"
  | "Foundation in"
  | "Framing complete"
  | "Plumbing and/or HVAC installed"
  | "Ready for electrical now"
  | "";
export type HasBuildingPlans = "Yes" | "No" | "";

export interface NewConstructionDetails {
  constructionBegun: ConstructionBegun;
  constructionStage: ConstructionStage;
  buildingPlanPhotos: string[];
  hasBuildingPlans: HasBuildingPlans;
  buildingPlanPhotos2: string[];
}

// ============================================
// CATEGORY DATA CONTAINERS
// ============================================
export interface CategoryData_1 {
  categoryId: "1";
  details: ServiceCallDetails;
}
export interface CategoryData_2 {
  categoryId: "2";
  details: EVChargerDetails;
}
export interface CategoryData_3 {
  categoryId: "3";
  details: PanelUpgradeDetails;
}
export interface CategoryData_4 {
  categoryId: "4";
  details: RemodelingDetails;
}
export interface CategoryData_5 {
  categoryId: "5";
  details: AccessoryBuildingDetails;
}

export interface CategoryData_6 {
  categoryId: "6";
  details: HotTubDetails;
}

export interface CategoryData_7 {
  categoryId: "7";
  details: DockPowerDetails;
}

export interface CategoryData_8 {
  categoryId: "8";
  details: ElectricalInspectionDetails;
}

export interface CategoryData_9 {
  categoryId: "9";
  details: GeneratorDetails;
}
export interface CategoryData_10 {
  categoryId: "10";
  details: NewConstructionDetails;
}

export interface CategoryData_Other {
  categoryId: string;
  details: null;
}
export type CategorySpecificData =
  | CategoryData_1
  | CategoryData_2
  | CategoryData_3
  | CategoryData_4
  | CategoryData_5
  | CategoryData_6
  | CategoryData_7
  | CategoryData_8
  | CategoryData_9
  | CategoryData_10
  | CategoryData_Other;
