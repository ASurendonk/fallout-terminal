import React, {ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import ComputerCutOut from 'assets/images/computer-cut-out4.png';
import './styles.scss';
import {CalculateScale} from 'helpers';
import {Power} from '../power';
import {playRandomKey} from 'helpers/sounds';

type ComputerProps = {
    children?: ReactNode;
};

export const Computer = ({children}: ComputerProps) => {
    const [sit, setSit] = useState(false);
    const [scale, setScale] = useState(0);
    const ref = useRef<any>();

    const scaleBox = useCallback(() => {
        const mf = ref.current;
        const calculatedScale = CalculateScale(mf.clientHeight, mf.clientWidth);
        setScale(calculatedScale);
    }, []);

    useEffect(() => {
        scaleBox();
        window.addEventListener('resize', scaleBox);
    }, [scaleBox]);

    const sitDown = useCallback(() => {
        setSit(true);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', event => {
            if (event.repeat) {
                return;
            }
            playRandomKey();
        });
    }, []);

    return (
        <div className={`computer ${sit ? 'sitting' : ''}`} ref={ref} onClick={sitDown}>
            <div className="computer-content">
                {children}
                <div className="computer-hardware">
                    <div className="computer-box" style={{transform: `scale(${scale})`}}>
                        <img className="computer-cut-out" src={ComputerCutOut} alt="" />
                        <Power />
                    </div>
                </div>
            </div>
        </div>
    );
}
