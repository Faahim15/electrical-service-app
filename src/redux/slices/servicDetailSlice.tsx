// src/store/slices/serviceDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface serviceDetailsState {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: "Call" | "Text" | "Email";
}

const initialState: serviceDetailsState = {
  fullName: "",
  email: "",
  phone: "",
  preferredContact: "Call",
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
      action: PayloadAction<"Call" | "Text" | "Email">,
    ) => {
      state.preferredContact = action.payload;
    },
    clearserviceDetails: () => initialState,
  },
});

export const {
  setFullName,
  setEmail,
  setPhone,
  setPreferredContact,
  clearserviceDetails,
} = serviceDetailsSlice.actions;

export default serviceDetailsSlice.reducer;
