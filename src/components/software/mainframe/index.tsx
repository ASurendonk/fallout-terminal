import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { Boot, Login, Home, Bios, Map, Hack } from '../systems';
import  useDebouncedEffect  from  'use-debounced-effect';
import { Screen } from 'components/software';
import { CalculateScale } from 'helpers/index';
import './styles.scss';
import { useSelector } from "react-redux";
import { RootState } from "store/index";
import { Log } from "components/software/systems/log";
import { Entries } from "components/software/systems/entries";
import { SystemContext } from "components/software/elements/context/context.tsx";
import { Repair } from "components/software/systems/repair";

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
    entries: <Entries />,
    log: <Log />,
    repair: <Repair />,
}

export const MainFrame = () => {
    const [system, setSystem] = useState<React.ReactNode | undefined>();
    const [scale, setScale] = useState(0);
    const ref = useRef<any>();
    const { power, system: systemName, color } = useSelector((state: RootState) => state.mainframe);
    const [cursor, setCursor] = useState<string>();

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

    useDebouncedEffect(() => {
        if (power && color) {
            setCursor(makeCursor(`rgb(${color.red},${color.green},${color.blue})`));
        }
    }, 150, [color, power]);

    return (
        <div ref={ref} className="mainframe">
            <div className={`mainframe-content ${power ? "on" : "off"}`} style={{ transform: `translate(-50%, -50%) scale(${scale})`, cursor }}>
                <SystemContext>
                    <Screen>
                        {system}
                    </Screen>
                </SystemContext>
            </div>
        </div>
    );
}

function makeCursor(color: string) {

    const cursor = document.createElement('canvas');
    const ctx = cursor.getContext('2d');

    if (!ctx) {
        return;
    }

    cursor.width = 22;
    cursor.height = 22;

    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(22, 11);
    ctx.lineTo(11, 22);
    ctx.closePath();

    ctx.fillStyle = color;
    ctx.fill();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();

    return 'url(' + cursor.toDataURL() + '), auto';
}
