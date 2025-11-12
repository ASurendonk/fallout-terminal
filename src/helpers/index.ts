import {SYSTEMS} from 'types';
import {store} from 'redux/store';
import {SystemActionTypes} from 'redux/actions';

// these represent the content size to scale
const width = 920;
const height = 520;

export const CalculateScale = (clientHeight: number, clientWidth: number) => {
    const isHeightRatioSmaller = clientHeight * width < clientWidth * height;
    return isHeightRatioSmaller ? clientHeight / height : clientWidth / width;
}

export const navigate = (location: SYSTEMS) => {
    store.dispatch({ type: SystemActionTypes.SET_SYSTEM, payload: location})
};