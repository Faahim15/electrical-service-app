import { configureStore } from "@reduxjs/toolkit";
import categoryRouteReducer from "./slices/categoryRouteSlice";
import partnerDetailsReducer from "./slices/parnerDetailsSlice";
import partnersReducer from "./slices/partnersRouterSlice";
import safetyMaintenanceReducer from "./slices/seftymaintanceSlice";
import serviceDetailsReducer from "./slices/servicDetailSlice";
import troubleshootRouteReducer from "./slices/troubleshootRouteSlice";
export const store = configureStore({
  reducer: {
    partners: partnersReducer,
    partnerDetails: partnerDetailsReducer,
    troubleshootRoute: troubleshootRouteReducer,
    categoryRoute: categoryRouteReducer,
    safetyMaintenance: safetyMaintenanceReducer,
    serviceDetails: serviceDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
