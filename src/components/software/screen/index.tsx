import React from 'react';
import './styles.scss';
import {useAppSelector} from 'redux/hooks';

type SystemProps = {
    children: React.ReactNode;
}

export const Screen = ({children}: SystemProps) => {
    const power = useAppSelector(state => state.power);

    return (
        <div className="system">
            <div className="system-screen">
                <div className="system-content">
                    {children}
                </div>
            </div>
            <div className="vignette" />
            <div className="glare" />
            <div className="shadow" />
            {power ?
            <>
                <div className="pixelation" />
                <div className="rolling-glitch" />
            </>
            : null}
        </div>
    );
}