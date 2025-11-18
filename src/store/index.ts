import { configureStore } from "@reduxjs/toolkit";
import mainframeReducer from "./mainframeSlice";

export const store = configureStore({
    reducer: {
        mainframe: mainframeReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
