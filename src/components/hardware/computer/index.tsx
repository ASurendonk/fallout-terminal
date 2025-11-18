import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import ComputerCutOut from 'assets/images/computer/background.png';
import ComputerOffScreen from 'assets/images/computer/screen.png';
import './styles.scss';
import { CalculateScale } from 'helpers';
import { Power } from '../power';
import { LoadingOverlay } from '../loading';
import { AudioManager, sounds } from 'helpers/sounds';
import { useSelector } from "react-redux";
import { getPower, setColor } from "store/mainframeSlice";
import { StorageCode, StorageManager } from "helpers/storage";
import { useDispatch } from "hooks/dispatch";

type ComputerProps = {
    children?: ReactNode;
};

export const Computer = ({children}: ComputerProps) => {
    const [scale, setScale] = useState(0);
    const ref = useRef<any>();
    const power = useSelector(getPower);
    const dispatch = useDispatch();

    const [sittingScale, setSittingScale] = useState(0.9); // default sitting scale
    const [isLoading, setIsLoading] = useState(true);

    const updateScale = useCallback((delta?: number) => {
        delta = delta ? delta : 0;
        let newSittingScale = sittingScale + delta;

        const aspectRatio = window.innerWidth / window.innerHeight;
        const lowerBound = 0.6 / aspectRatio; // zoomed out
        const upperBound = 1; // zoomed in
        newSittingScale = Math.min(Math.max(newSittingScale, lowerBound), upperBound);

        setSittingScale(newSittingScale);
    }, [sittingScale]);

    const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        updateScale(delta);
    };

    useEffect(() => {
        updateScale();
    }, [updateScale]);

    const scaleBox = useCallback(() => {
        const mf = ref.current;
        const calculatedScale = CalculateScale(mf.clientHeight, mf.clientWidth);
        setScale(calculatedScale);
    }, []);

    useEffect(() => {
        scaleBox();
        window.addEventListener('resize', scaleBox);
    }, [scaleBox]);

    useEffect(() => {
        window.addEventListener('keydown', event => {
            if (event.repeat) {
                return;
            }
            window.audioManager.playRandomKey();
        });
    }, []);

    const loadState = useCallback(() => {
        const color = window.storageManager.getItem(StorageCode.color);
        if (color) {
            dispatch(setColor(color));
        }
    }, [dispatch]);

    useEffect(() => {
        // preload the background image
        const img = new Image();
        img.src = ComputerCutOut;
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setTimeout(() => setIsLoading(false), 3000);
        };

        // audio
        const audioManager = new AudioManager();
        audioManager.loadSounds(sounds).then(() => {
            window.audioManager = audioManager;
        });

        // storage
        window.storageManager = new StorageManager();
        loadState()
    }, [loadState]);

    return (
        <>
            <LoadingOverlay isLoading={isLoading} />
            <div className="computer sitting" ref={ref} onWheel={handleScroll}>
                <div className="computer-content" style={{ transform: `scale(${sittingScale})` }}>
                    {children}
                    <div className="computer-hardware">
                        <div className="computer-box" style={{transform: `scale(${scale})`}}>
                            <img className="computer-cut-out" src={ComputerCutOut} alt=""/>
                            <Power/>
                            <img className={`computer-off-screen ${power ? "on" : "off"}`} src={ComputerOffScreen} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
