import React, { useCallback, useMemo } from 'react';
import './styles.scss';
import { Color } from "helpers/globals.ts";
import { SoundCode } from "helpers/sounds.ts";

type SliderProps = {
    label: React.ReactNode;
    value: number;
    onValueChange(value: number): void;
};

export const Slider = ({ label, value, onValueChange }: SliderProps) => {

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        window.audioManager.play(SoundCode.tick, 0.005);
        onValueChange(parseInt(e.target.value));
    }, [onValueChange]);

    const displayValue = useMemo(() => {
        const percentage = (value - Color.COLOR_MINIMUM) / (Color.COLOR_MAXIMUM - Color.COLOR_MINIMUM);
        return Math.ceil(percentage * 100);
    }, [value]);

    return (
        <div className="slider">
            <div className="slider-label">{label}</div> <input value={value} onChange={onChange} type="range" min={Color.COLOR_MINIMUM} max={Color.COLOR_MAXIMUM} /> {displayValue}
        </div>
    );
}
