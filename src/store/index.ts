import { configureStore } from "@reduxjs/toolkit";
import mainframeReducer from "./mainframeSlice";
import networkReducer from "./networkSlice";

export const store = configureStore({
  reducer: {
    mainframe: mainframeReducer,
    network: networkReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
