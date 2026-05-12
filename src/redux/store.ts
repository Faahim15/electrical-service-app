import { configureStore } from "@reduxjs/toolkit";
import categoryRouteReducer from "./slices/categoryRouteSlice";

import otherCategoryRouteSlice from "./slices/otherRouteSlice";
import partnerDetailsReducer from "./slices/parnerDetailsSlice";
import partnersReducer from "./slices/partnersRouterSlice";
import safetyMaintenanceReducer from "./slices/seftymaintanceSlice";
import serviceFormReducer from "./slices/serviceFormSlice";
import starlinkRouteReducer from "./slices/starlinkTheRouteSlice";
import troubleshootRouteReducer from "./slices/troubleshootRouteSlice";

export const store = configureStore({
  reducer: {
    partners: partnersReducer,
    partnerDetails: partnerDetailsReducer,
    troubleshootRoute: troubleshootRouteReducer,
    categoryRoute: categoryRouteReducer,
    safetyMaintenance: safetyMaintenanceReducer,
    serviceForm: serviceFormReducer,

    starlinkRoute: starlinkRouteReducer,
    otherCategoryRoute: otherCategoryRouteSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
