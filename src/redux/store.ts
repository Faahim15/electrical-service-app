import { configureStore } from "@reduxjs/toolkit";
import categoryRouteReducer from "./slices/categoryRouteSlice";

import commonContractdetails from "./slices/globalstore/commonContractdetailsStoreSlice";
import starlinkDataReducer from "./slices/globalstore/StarlinkDataSlice";
import wholeHomeDataReducer from "./slices/globalstore/wholeHomeDataSlice";
import reminderDetailsReducer from "./slices/myReminderSlice";
import otherCategoryRouteSlice from "./slices/otherRouteSlice";
import partnerDetailsReducer from "./slices/parnerDetailsSlice";
import partnersReducer from "./slices/partnersRouterSlice";
import quoteDetailsReducer from "./slices/quoteDetailsSlice";
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
    quoteDetails: quoteDetailsReducer,
    reminderDetails: reminderDetailsReducer,
    commonContractDetails: commonContractdetails,
    wholeHomeData: wholeHomeDataReducer,
    starlinkData: starlinkDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
