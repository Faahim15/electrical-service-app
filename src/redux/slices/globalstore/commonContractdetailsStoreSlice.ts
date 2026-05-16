import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PreferredContact = "Call" | "Text" | "Email" | "";

export type PropertyType = "House" | "Condo" | "Apartment" | "Commercial" | "";

export type OwnershipStatus =
  | "Owner"
  | "Tenant"
  | "Property Manager"
  | "Other"
  | "";

export type Timeline =
  | "ASAP"
  | "Within a week"
  | "Within a month"
  | "Flexible"
  | "";

// ─── Step 1 – Contact Details ─────────────────────────────────────────────────

export interface ContactDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  preferredContact: PreferredContact;
  agreedToContact: boolean;
}

// ─── Step 2 – Service Address ─────────────────────────────────────────────────

export interface ServiceAddress {
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  isHomeAddress: boolean;
}

// ─── Step 3 – Project Basics ──────────────────────────────────────────────────

export interface ProjectBasics {
  propertyType: PropertyType;
  ownershipStatus: OwnershipStatus;
  ownershipStatusOther: string;
  timeline: Timeline;
  additionalNotes: string;
}

// ─── Root State ───────────────────────────────────────────────────────────────

export interface CommonContractDetailsState {
  contactDetails: ContactDetails;
  serviceAddress: ServiceAddress;
  projectBasics: ProjectBasics;
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: CommonContractDetailsState = {
  contactDetails: {
    fullName: "",
    email: "",
    phoneNumber: "",
    preferredContact: "",
    agreedToContact: false,
  },
  serviceAddress: {
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    isHomeAddress: false,
  },
  projectBasics: {
    propertyType: "",
    ownershipStatus: "",
    ownershipStatusOther: "",
    timeline: "",
    additionalNotes: "",
  },
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const commonContractDetailsSlice = createSlice({
  name: "commonContractDetails",
  initialState,
  reducers: {
    // ── Contact Details (Step 1) ──────────────────────────────────────────────
    updateContactDetails(
      state,
      action: PayloadAction<Partial<ContactDetails>>,
    ) {
      state.contactDetails = { ...state.contactDetails, ...action.payload };
    },

    resetContactDetails(state) {
      state.contactDetails = initialState.contactDetails;
    },

    // ── Service Address (Step 2) ──────────────────────────────────────────────
    updateServiceAddress(
      state,
      action: PayloadAction<Partial<ServiceAddress>>,
    ) {
      state.serviceAddress = { ...state.serviceAddress, ...action.payload };
    },

    resetServiceAddress(state) {
      state.serviceAddress = initialState.serviceAddress;
    },

    // ── Project Basics (Step 3) ───────────────────────────────────────────────
    updateProjectBasicsCommon(
      state,
      action: PayloadAction<Partial<ProjectBasics>>,
    ) {
      state.projectBasics = { ...state.projectBasics, ...action.payload };
    },

    resetProjectBasics(state) {
      state.projectBasics = initialState.projectBasics;
    },

    // ── Reset All ─────────────────────────────────────────────────────────────
    resetAllContractDetails() {
      return initialState;
    },
  },
});

export const {
  updateContactDetails,
  resetContactDetails,
  updateServiceAddress,
  resetServiceAddress,
  updateProjectBasicsCommon,
  resetProjectBasics,
  resetAllContractDetails,
} = commonContractDetailsSlice.actions;

export default commonContractDetailsSlice.reducer;
