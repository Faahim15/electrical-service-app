// src/redux/slices/serviceFormSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ============================================
// COMMON TYPES (id 1-10 shared)
// ============================================
interface ContactDetails {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: "Call" | "Text" | "Email";
}

interface ServiceAddress {
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  isHomeAddress: boolean;
}

interface ProjectBasics {
  propertyType: "House" | "Condo" | "Apartment" | "Commercial" | "";
  ownershipStatus: "Owner" | "Tenant" | "Property Manager" | "Other" | "";
  timeline:
    | "As soon as possible"
    | "This week"
    | "This month"
    | "Flexible"
    | "";
}

// ============================================
// CATEGORY-SPECIFIC TYPES
// ============================================

// id: "1" - Service Call
interface ServiceCallDetails {
  projectDetails: string;
  preferredTime: "AM (8-11)" | "PM (12-2)" | "";
  schedulingDays: string[];
  additionalNotes: string;
  quickTags: string[];
  panelPhotos: string[];
  workAreaPhotos: string[];
  referencePhotos: string[];
}

// id: "2" - EV Charger
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

interface EVChargerDetails {
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

// id: "3" - Panel Upgrade
type CurrentAmperage =
  | "50"
  | "60"
  | "100"
  | "150"
  | "200"
  | "Unsure"
  | "Other"
  | "";
type ServiceType = "Replacement" | "Upgrade" | "";
type PowerType = "Overhead" | "Underground" | "Unsure" | "";
type PanelLocationUpgrade =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other (please specify)"
  | "";
type UpgradeAmps = "100" | "150" | "200" | "300" | "350" | "400" | "";
interface PanelUpgradeDetails {
  serviceType: ServiceType;
  upgradeAmps: UpgradeAmps;
  // নতুন fields
  currentAmperage: CurrentAmperage;
  powerType: PowerType;
  panelLocation: PanelLocationUpgrade;
  additionalInfo: string;
  meterPhotos: string[];
  panelPhotos: string[];
}

const initialPanelUpgradeDetails: PanelUpgradeDetails = {
  serviceType: "",
  upgradeAmps: "",
  currentAmperage: "",
  powerType: "",
  panelLocation: "",
  additionalInfo: "",
  meterPhotos: [],
  panelPhotos: [],
};
// ============================================
// CATEGORY DATA — আলাদা typed container
// ============================================
interface CategoryData_1 {
  categoryId: "1";
  details: ServiceCallDetails;
}
interface CategoryData_2 {
  categoryId: "2";
  details: EVChargerDetails;
}
interface CategoryData_Other {
  categoryId: string;
  details: null;
}

interface CategoryData_3 {
  categoryId: "3";
  details: PanelUpgradeDetails;
}

type CategorySpecificData =
  | CategoryData_1
  | CategoryData_2
  | CategoryData_3 // ← নতুন
  | CategoryData_Other;

// ============================================
// MAIN STATE
// ============================================
interface ServiceFormState {
  selectedCategoryId: string | null;
  currentStep: number;
  contactDetails: ContactDetails;
  serviceAddress: ServiceAddress;
  projectBasics: ProjectBasics;
  categoryData: CategorySpecificData | null;
}

// ============================================
// INITIAL STATES
// ============================================
const initialContactDetails: ContactDetails = {
  fullName: "",
  email: "",
  phone: "",
  preferredContact: "Call",
};

const initialServiceAddress: ServiceAddress = {
  streetAddress: "",
  apartment: "",
  city: "",
  state: "",
  zipCode: "",
  isHomeAddress: false,
};

const initialProjectBasics: ProjectBasics = {
  propertyType: "",
  ownershipStatus: "",
  timeline: "",
};

const initialServiceCallDetails: ServiceCallDetails = {
  projectDetails: "",
  preferredTime: "",
  schedulingDays: [],
  additionalNotes: "",
  quickTags: [],
  panelPhotos: [],
  workAreaPhotos: [],
  referencePhotos: [],
};

const initialEVChargerDetails: EVChargerDetails = {
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

const initialState: ServiceFormState = {
  selectedCategoryId: null,
  currentStep: 0,
  contactDetails: initialContactDetails,
  serviceAddress: initialServiceAddress,
  projectBasics: initialProjectBasics,
  categoryData: null,
};

// ============================================
// HELPER
// ============================================
const getCategoryInitialData = (categoryId: string): CategorySpecificData => {
  switch (categoryId) {
    case "1":
      return { categoryId: "1", details: { ...initialServiceCallDetails } };
    case "2":
      return { categoryId: "2", details: { ...initialEVChargerDetails } };
    case "3":
      return { categoryId: "3", details: { ...initialPanelUpgradeDetails } };
    default:
      return { categoryId, details: null };
  }
};

// ============================================
// TYPE GUARDS — এটাই মূল fix
// ============================================
function isServiceCall(data: CategorySpecificData): data is CategoryData_1 {
  return data.categoryId === "1";
}

function isEVCharger(data: CategorySpecificData): data is CategoryData_2 {
  return data.categoryId === "2";
}

// ============================================
// SLICE
// ============================================
const serviceFormSlice = createSlice({
  name: "serviceForm",
  initialState,
  reducers: {
    // --- Navigation ---
    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategoryId = action.payload;
      state.currentStep = 0;
      state.categoryData = getCategoryInitialData(action.payload);
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      if (state.currentStep > 0) state.currentStep -= 1;
    },

    // --- Common ---
    updateContactDetails: (
      state,
      action: PayloadAction<Partial<ContactDetails>>,
    ) => {
      state.contactDetails = { ...state.contactDetails, ...action.payload };
    },
    updateServiceAddress: (
      state,
      action: PayloadAction<Partial<ServiceAddress>>,
    ) => {
      state.serviceAddress = { ...state.serviceAddress, ...action.payload };
    },
    updateProjectBasics: (
      state,
      action: PayloadAction<Partial<ProjectBasics>>,
    ) => {
      state.projectBasics = { ...state.projectBasics, ...action.payload };
    },

    // --- Service Call (id: "1") ---
    updateServiceCallDetails: (
      state,
      action: PayloadAction<Partial<ServiceCallDetails>>,
    ) => {
      if (state.categoryData && isServiceCall(state.categoryData)) {
        Object.assign(state.categoryData.details, action.payload);
      }
    },
    toggleServiceCallTag: (state, action: PayloadAction<string>) => {
      if (state.categoryData && isServiceCall(state.categoryData)) {
        const tag = action.payload;
        const tags = state.categoryData.details.quickTags;
        state.categoryData.details.quickTags = tags.includes(tag)
          ? tags.filter((t) => t !== tag)
          : [...tags, tag];
      }
    },
    toggleSchedulingDay: (state, action: PayloadAction<string>) => {
      if (state.categoryData && isServiceCall(state.categoryData)) {
        const day = action.payload;
        const days = state.categoryData.details.schedulingDays;
        state.categoryData.details.schedulingDays = days.includes(day)
          ? days.filter((d) => d !== day)
          : [...days, day];
      }
    },

    // --- EV Charger (id: "2") ---
    updateEVChargerDetails: (
      state,
      action: PayloadAction<Partial<EVChargerDetails>>,
    ) => {
      if (state.categoryData && isEVCharger(state.categoryData)) {
        Object.assign(state.categoryData.details, action.payload);
      }
    },
    setEVChargerType: (state, action: PayloadAction<ChargerType>) => {
      if (state.categoryData && isEVCharger(state.categoryData)) {
        state.categoryData.details.chargerType = action.payload;
        if (action.payload === "I want help deciding") {
          state.categoryData.details.nemaConfig = "";
          state.categoryData.details.providingCharger = "";
          state.categoryData.details.chargerStatus = "";
        }
        if (action.payload !== "Plug-in") {
          state.categoryData.details.nemaConfig = "";
        }
      }
    },
    setEVProvidingCharger: (state, action: PayloadAction<ProvidingCharger>) => {
      if (state.categoryData && isEVCharger(state.categoryData)) {
        state.categoryData.details.providingCharger = action.payload;
        if (action.payload === "No") {
          state.categoryData.details.chargerStatus = "";
        }
      }
    },

    updatePanelUpgradeDetails: (
      state,
      action: PayloadAction<Partial<PanelUpgradeDetails>>,
    ) => {
      if (
        state.categoryData?.categoryId === "3" &&
        state.categoryData.details
      ) {
        Object.assign(state.categoryData.details, action.payload);
      }
    },

    // --- Reset ---
    clearServiceForm: () => initialState,
    clearCategoryData: (state) => {
      if (state.selectedCategoryId) {
        state.categoryData = getCategoryInitialData(state.selectedCategoryId);
      }
    },
  },
});

export const {
  selectCategory,
  setCurrentStep,
  nextStep,
  prevStep,
  updateContactDetails,
  updateServiceAddress,
  updateProjectBasics,
  updateServiceCallDetails,
  toggleServiceCallTag,
  toggleSchedulingDay,
  updateEVChargerDetails,
  setEVChargerType,
  setEVProvidingCharger,
  clearServiceForm,
  clearCategoryData,
  updatePanelUpgradeDetails,
} = serviceFormSlice.actions;

export default serviceFormSlice.reducer;
