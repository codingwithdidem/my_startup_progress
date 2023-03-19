import { writePhasesToLocalStorage } from "@/utils/storage";
import { configureStore } from "@reduxjs/toolkit";
import trackerReducer from "../features/tracker/trackerSlice";

export const store = configureStore({
  reducer: {
    tracker: trackerReducer,
  },
});

store.subscribe(() => {
  writePhasesToLocalStorage(store.getState().tracker.phases);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
