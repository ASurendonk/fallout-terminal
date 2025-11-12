import {SYSTEMS} from 'types';
import {createStore} from 'redux';
import {SystemActionTypes} from './actions';

const initialState = {
    power: false,
    system: SYSTEMS.BOOT,
    title: 'Welcome to ARCO Industries (TM) MainFrame',
}

interface Action {
    type: string;
    payload: any;
}

function systemReducer(state = initialState, action: Action) {
    switch (action.type) {
        case SystemActionTypes.SET_POWER:
            return { ...state, power: action.payload };
        case SystemActionTypes.SET_SYSTEM:
            return { ...state, system: action.payload }
        default:
            return state
    }
}

export const store = createStore(
    systemReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;