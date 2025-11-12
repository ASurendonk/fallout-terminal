import { SYSTEMS } from 'types';

export enum SystemActionTypes {
    SET_POWER = 'set/power',
    SET_SYSTEM = 'set/system',
}

export interface SystemActionPower {
    type: SystemActionTypes,
    payload: boolean,
}

export interface SystemActionSystem {
    type: SystemActionTypes,
    payload: SYSTEMS,
}

export type SystemActionInterface = SystemActionPower | SystemActionSystem;

const setSystem: (payload: any) => SystemActionInterface = (payload) => ({
    type: SystemActionTypes.SET_SYSTEM,
    payload,
});
const setPower: (payload: any) => SystemActionInterface = (payload) => ({
    type: SystemActionTypes.SET_POWER,
    payload,
});

export const SystemActions = { setSystem, setPower };