// src/redux/slices/servicDetailSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceDetailsState {
  // Step 1 - Contact Details
  fullName: string;
  email: string;
  phone: string;
  preferredContact: "Call" | "Text" | "Email";

  // Step 2 - Service Address
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  isHomeAddress: boolean;

  // Step 3 - Project Basics
  propertyType: "House" | "Condo" | "Apartment" | "Commercial" | "";
  ownershipStatus: "Owner" | "Tenant" | "Property Manager" | "Other" | "";
  timeline:
    | "As soon as possible"
    | "This week"
    | "This month"
    | "Flexible"
    | "";

  // Step 4 - Job Details
  projectDetails: string;

  preferredTime: "AM (8-11)" | "PM (12-2)" | "";
  schedulingDays: string[];
  additionalNotes: string;
  quickTags: string[];
  panelPhotos: string[];
  workAreaPhotos: string[];
  referencePhotos: string[];
}

const initialState: ServiceDetailsState = {
  fullName: "",
  email: "",
  phone: "",
  preferredContact: "Call",

  streetAddress: "",
  apartment: "",
  city: "",
  state: "",
  zipCode: "",
  isHomeAddress: false,

  propertyType: "",
  ownershipStatus: "",
  timeline: "",

  projectDetails: "",

  preferredTime: "",
  schedulingDays: [],
  additionalNotes: "",
  quickTags: [],
  panelPhotos: [],
  workAreaPhotos: [],
  referencePhotos: [],
};

const serviceDetailsSlice = createSlice({
  name: "serviceDetails",
  initialState,
  reducers: {
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setPreferredContact: (
      state,
      action: PayloadAction<ServiceDetailsState["preferredContact"]>,
    ) => {
      state.preferredContact = action.payload;
    },
    setStreetAddress: (state, action: PayloadAction<string>) => {
      state.streetAddress = action.payload;
    },
    setApartment: (state, action: PayloadAction<string>) => {
      state.apartment = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setZipCode: (state, action: PayloadAction<string>) => {
      state.zipCode = action.payload;
    },
    setIsHomeAddress: (state, action: PayloadAction<boolean>) => {
      state.isHomeAddress = action.payload;
    },
    setPropertyType: (
      state,
      action: PayloadAction<ServiceDetailsState["propertyType"]>,
    ) => {
      state.propertyType = action.payload;
    },
    setOwnershipStatus: (
      state,
      action: PayloadAction<ServiceDetailsState["ownershipStatus"]>,
    ) => {
      state.ownershipStatus = action.payload;
    },
    setTimeline: (
      state,
      action: PayloadAction<ServiceDetailsState["timeline"]>,
    ) => {
      state.timeline = action.payload;
    },
    setProjectDetails: (state, action: PayloadAction<string>) => {
      state.projectDetails = action.payload;
    },
    setPreferredTime: (
      state,
      action: PayloadAction<ServiceDetailsState["preferredTime"]>,
    ) => {
      state.preferredTime = action.payload;
    },
    toggleSchedulingDay: (state, action: PayloadAction<string>) => {
      const day = action.payload;
      const exists = state.schedulingDays.includes(day);
      state.schedulingDays = exists
        ? state.schedulingDays.filter((d) => d !== day)
        : [...state.schedulingDays, day];
    },
    setAdditionalNotes: (state, action: PayloadAction<string>) => {
      state.additionalNotes = action.payload;
    },
    toggleQuickTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload;
      const exists = state.quickTags.includes(tag);
      state.quickTags = exists
        ? state.quickTags.filter((t) => t !== tag)
        : [...state.quickTags, tag];
    },
    setPanelPhotos: (state, action: PayloadAction<string[]>) => {
      state.panelPhotos = action.payload;
    },
    setWorkAreaPhotos: (state, action: PayloadAction<string[]>) => {
      state.workAreaPhotos = action.payload;
    },
    setReferencePhotos: (state, action: PayloadAction<string[]>) => {
      state.referencePhotos = action.payload;
    },
    clearServiceDetails: () => initialState,
  },
});

export const {
  setFullName,
  setEmail,
  setPhone,
  setPreferredContact,
  setStreetAddress,
  setApartment,
  setCity,
  setState,
  setZipCode,
  setIsHomeAddress,
  setPropertyType,
  setOwnershipStatus,
  setTimeline,
  clearServiceDetails,
  setProjectDetails,
  setPreferredTime,
  toggleSchedulingDay,
  setAdditionalNotes,
  toggleQuickTag,
  setPanelPhotos,
  setWorkAreaPhotos,
  setReferencePhotos,
} = serviceDetailsSlice.actions;

export default serviceDetailsSlice.reducer;
