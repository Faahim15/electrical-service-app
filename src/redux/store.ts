import { configureStore } from "@reduxjs/toolkit";
import partnerDetailsReducer from "./slices/parnerDetailsSlice";
import partnersReducer from "./slices/partnersRouterSlice";
import troubleshootRouteReducer from "./slices/troubleshootRouteSlice";
export const store = configureStore({
  reducer: {
    partners: partnersReducer,
    partnerDetails: partnerDetailsReducer,
    troubleshootRoute: troubleshootRouteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
