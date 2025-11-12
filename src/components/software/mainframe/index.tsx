import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useAppSelector} from 'redux/hooks';
import {Boot, Login, Home, Bios, Map, Hack} from '../systems';
import {Screen} from 'components/software';
import {CalculateScale} from 'helpers';
import './styles.scss';

// 20 lines
// 54 characters
// 1080 total
// █

const Systems = {
    bios: <Bios />,
    boot: <Boot />,
    login: <Login />,
    hack: <Hack />,
    home: <Home />,
    map: <Map />,
}

export const MainFrame = () => {
    const [system, setSystem] = useState<React.ReactNode | undefined>();
    const [scale, setScale] = useState(0);
    const ref = useRef<any>();
    const { power, system: systemName } = useAppSelector(state => state);

    const scaleMainframe = useCallback(() => {
        const mf = ref.current;
        const calculatedScale = CalculateScale(mf.clientHeight, mf.clientWidth);
        setScale(calculatedScale);
    }, []);

    useEffect(() => {
        scaleMainframe();
        window.addEventListener('resize', scaleMainframe);
    }, [scaleMainframe]);

    useEffect(() => {
        setTimeout(() => {
            if (power) {
                setSystem(Systems[systemName]);
            } else {
                setSystem(undefined);
            }
        }, 100);
    }, [power, systemName]);

    return (
        <div ref={ref} className="mainframe">
            <div className="mainframe-content" style={{transform: `translate(-50%, -50%) scale(${scale})`}}>
                <Screen>
                    {system}
                </Screen>
            </div>
        </div>
    );
}
