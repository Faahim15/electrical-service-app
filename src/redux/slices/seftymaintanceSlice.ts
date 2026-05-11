import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MaintenanceDetail {
  title: string;
  body: string;
  icon: string;
}

export interface SafetyItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
  pageTitle: string;
  details: MaintenanceDetail[];
}

interface SafetyMaintenanceState {
  items: SafetyItem[];
  selectedItemId: string | null;
}

const initialState: SafetyMaintenanceState = {
  selectedItemId: null,
  items: [
    {
      id: "1",
      icon: "clock",
      title: "Smoke Detector\nBatteries",
      description: "Replace batteries annually.",
      enabled: true,
      pageTitle: "Smoke Detector Batteries",
      details: [
        {
          title: "Why Important",
          body: "Smoke detectors save lives by alerting you to fires early. Dead batteries mean no protection.",
          icon: "alert-circle",
        },
        {
          title: "Instructions",
          body: "Press the test button monthly. Replace batteries annually. Replace the entire unit every 10 years.",
          icon: "tool",
        },
        {
          title: "Recommended Frequency",
          body: "Annually",
          icon: "calendar",
        },
        {
          title: "Safety Notes",
          body: "Use the same type of battery that came with your detector. Never disable a smoke detector.",
          icon: "shield",
        },
      ],
    },
    {
      id: "2",
      icon: "zap",
      title: "Test GFCI Outlets",
      description: "Ensure outlets are working properly",
      enabled: true,
      pageTitle: "Test GFCI Outlets",
      details: [
        {
          title: "Why Important",
          body: "GFCI outlets prevent electrical shock in wet areas like bathrooms and kitchens.",
          icon: "alert-circle",
        },
        {
          title: "Instructions",
          body: "Press the TEST button — power should cut off. Press RESET to restore power. If it doesn't trip, call our trained professionals.",
          icon: "tool",
        },
        {
          title: "Recommended Frequency",
          body: "Monthly",
          icon: "calendar",
        },
        {
          title: "Safety Notes",
          body: "GFCI outlets are required by code in bathrooms, kitchens, garages, and outdoor areas.",
          icon: "shield",
        },
      ],
    },
    {
      id: "3",
      icon: "clock",
      title: "Carbon Monoxide\nDetector",
      description: "Replace batteries annually",
      enabled: true,
      pageTitle: "Carbon Monoxide Detector",
      details: [
        {
          title: "Why Important",
          body: "Carbon monoxide is odorless and colorless. Detectors provide the only warning before dangerous levels build up.",
          icon: "alert-circle",
        },
        {
          title: "Instructions",
          body: "Test the detector monthly using the test button. Replace batteries annually. Replace the unit every 5–7 years.",
          icon: "tool",
        },
        {
          title: "Recommended Frequency",
          body: "annually",
          icon: "calendar",
        },
        {
          title: "Safety Notes",
          body: "If the alarm sounds, leave immediately and call 911. Never ignore a CO alarm.",
          icon: "shield",
        },
      ],
    },
    {
      id: "4",
      icon: "home",
      title: "Septic\nSystem Alarm",
      description: "Check alarm battery and function",
      enabled: true,
      pageTitle: "Septic System Alarm",
      details: [
        {
          title: "Why Important",
          body: "Early detection of septic problems prevents costly repairs and health hazards.",
          icon: "alert-circle",
        },
        {
          title: "Instructions",
          body: "Check that the alarm is powered. Test the alarm if it has a test button. Replace battery monthly.",
          icon: "tool",
        },
        {
          title: "Recommended Frequency",
          body: "monthly",
          icon: "calendar",
        },
        {
          title: "Safety Notes",
          body: "If the alarm sounds, call a septic professional immediately.",
          icon: "shield",
        },
      ],
    },
    {
      id: "5",
      icon: "wind",
      title: "Clean Dryer\nVent",
      description: "Prevent fire hazards",
      enabled: true,
      pageTitle: "Clean Dryer Vent",
      details: [
        {
          title: "Why Important",
          body: "Clogged dryer vents are a leading cause of house fires.",
          icon: "alert-circle",
        },
        {
          title: "Instructions",
          body: "Disconnect the dryer. Remove lint from the vent pipe. Use a dryer vent brush if needed. Reconnect securely.",
          icon: "tool",
        },
        {
          title: "Recommended Frequency",
          body: "Seasonally",
          icon: "calendar",
        },
        {
          title: "Safety Notes",
          body: "Also clean the lint trap after every load. Professional cleaning recommended annually.",
          icon: "shield",
        },
      ],
    },
    {
      id: "6",
      icon: "zap",
      title: "Inspect\nElectrical Cords",
      description: "Check for damage or wear",
      enabled: true,
      pageTitle: "Inspect Electrical Cords",
      details: [
        {
          title: "Why Important",
          body: "Damaged cords can cause fires and electrical shock.",
          icon: "alert-circle",
        },
        {
          title: "Instructions",
          body: "Check all cords for fraying, cracks, or damage. Replace damaged cords immediately. Ensure plugs fit snugly.",
          icon: "tool",
        },
        {
          title: "Recommended Frequency",
          body: "Seasonally",
          icon: "calendar",
        },
        {
          title: "Safety Notes",
          body: "Never run cords under rugs or furniture. Don't overload outlets.",
          icon: "shield",
        },
      ],
    },
    {
      id: "7",
      icon: "shield",
      title: "Test AFCI\nBreakers",
      description: "Test arc-fault circuit interrupters",
      enabled: true,
      pageTitle: "Test AFCI Breakers",
      details: [
        {
          title: "Why Important",
          body: "AFCI breakers prevent electrical fires caused by arc faults.",
          icon: "alert-circle",
        },
        {
          title: "Instructions",
          body: "Locate AFCI breakers in your panel. Press the test button on each AFCI breaker. Reset if it trips.",
          icon: "tool",
        },
        {
          title: "Recommended Frequency",
          body: "Monthly",
          icon: "calendar",
        },
        {
          title: "Safety Notes",
          body: "If a breaker won't reset or trips frequently, call our trained professionals.",
          icon: "shield",
        },
      ],
    },
  ],
};

const safetyMaintenanceSlice = createSlice({
  name: "safetyMaintenance",
  initialState,
  reducers: {
    setSelectedItem: (state, action: PayloadAction<string>) => {
      state.selectedItemId = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItemId = null;
    },
    toggleItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.enabled = !item.enabled;
    },
  },
});

export const { setSelectedItem, clearSelectedItem, toggleItem } =
  safetyMaintenanceSlice.actions;

// Selectors
export const selectAllItems = (state: {
  safetyMaintenance: SafetyMaintenanceState;
}) => state.safetyMaintenance.items;

export const selectSelectedItem = (state: {
  safetyMaintenance: SafetyMaintenanceState;
}) =>
  state.safetyMaintenance.items.find(
    (i) => i.id === state.safetyMaintenance.selectedItemId,
  ) ?? null;

export default safetyMaintenanceSlice.reducer;
