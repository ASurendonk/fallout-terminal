import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SYSTEMS } from "types/index";
import { RootState } from "store/index.ts";

interface MainframeState {
    power: boolean;
    system: SYSTEMS;
    title: string;
    notification: string;
    hackLoaded: boolean;
    color: {
        red: number;
        green: number;
        blue: number;
    }
}

const initialState: MainframeState = {
    power: false,
    system: SYSTEMS.BOOT,
    title: "Welcome to ROBCO Industries (TM) Termlink",
    notification: "",
    hackLoaded: true,
    color: {
        red: 30,
        green: 138,
        blue: 30,
    },
    // color: {
    //     red: 8,
    //     green: 137,
    //     blue: 10,
    // },
};

export const notify = createAsyncThunk(
    "mainframe/notifyWithTimeout",
    async (notification: string, { dispatch, getState }) => {
        dispatch(setNotification(notification));

        await new Promise(resolve => setTimeout(resolve, 3000));

        const currentNotification = (getState() as RootState).mainframe.notification;
        if (currentNotification === notification) {
            dispatch(setNotification(''));
        }
    }
);

export const mainframeSlice = createSlice({
    name: "mainframe",
    initialState: initialState,
    reducers: {
        powerOn: (state) => {
            state.power = true;
        },
        powerOff: (state) => {
            state.power = false;
        },
        boot: (state, action) => {
            state.system = action.payload;
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        loadHack: (state) => {
            state.hackLoaded = true;
        },
        setColor: (state, action: PayloadAction<SetColorActionPayload>) => {
            state.color = action.payload;
            const { red, green, blue } = action.payload;

            const brightnessFactor = 2;
            const redHighlight = Math.min(red * brightnessFactor, 255);
            const greenHighlight = Math.min(green * brightnessFactor, 255);
            const blueHighlight = Math.min(blue * brightnessFactor, 255);

            const root = document.documentElement;
            root.style.setProperty('--color', `rgb(${red},${green},${blue})`);
            root.style.setProperty('--color-shadow', `rgba(${red},${green},${blue},0.35)`);
            root.style.setProperty('--color-highlight', `rgb(${redHighlight},${greenHighlight},${blueHighlight})`);
        },
    },
});

export const {
    powerOn,
    powerOff,
    boot,
    setNotification,
    loadHack,
    setColor,
} = mainframeSlice.actions

export const getPower = (state: RootState) => state.mainframe.power;
export const getNotification = (state: RootState) => state.mainframe.notification;
export const getHackLoaded = (state: RootState) => state.mainframe.hackLoaded;
export const getColor = (state: RootState) => state.mainframe.color;

export default mainframeSlice.reducer

interface SetColorActionPayload {
    red: number;
    green: number;
    blue: number;
}
