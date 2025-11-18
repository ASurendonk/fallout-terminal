import { SYSTEMS } from 'types';
import { store } from 'store';
import { boot } from 'store/mainframeSlice';

// these represent the content size to scale
const width = 920;
const height = 520;

export const CalculateScale = (clientHeight: number, clientWidth: number) => {
    const isHeightRatioSmaller = clientHeight * width < clientWidth * height;
    return isHeightRatioSmaller ? clientHeight / height : clientWidth / width;
}

export const navigate = (location: SYSTEMS) => {
    store.dispatch(boot(location));
};
