import { configureStore } from "@reduxjs/toolkit";
import partnerDetailsReducer from "./slices/parnerDetailsSlice";
import partnersReducer from "./slices/partnersRouterSlice";
import safetyMaintenanceReducer from "./slices/seftymaintanceSlice";
import troubleshootRouteReducer from "./slices/troubleshootRouteSlice";
export const store = configureStore({
  reducer: {
    partners: partnersReducer,
    partnerDetails: partnerDetailsReducer,
    troubleshootRoute: troubleshootRouteReducer,
    safetyMaintenance: safetyMaintenanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
