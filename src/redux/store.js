import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userAuthSlice } from "./slices";

const rootReducer = combineReducers({
  authReducer: userAuthSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
}
);
