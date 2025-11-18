import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from "react-redux";
import { getPower } from "store/mainframeSlice";
import { SoundCode } from "helpers/sounds";

export interface SequencerProps {
    children: string | React.ReactNode;
    className?: string;
    line?: boolean;
    spacer?: boolean;
    order?: number;
    index?: number;
    onComplete?(index: number): void;
    skip?: boolean;
    reserveSpace?: boolean;
    art?: boolean;
    speed?: number;
    volume?: number;
    msDelay?: number;
}

const isValidNumber: (number?: any) => boolean = (number) => {
    return number !== undefined && !isNaN(number);
}

export const Sequencer = ({children, className, line, spacer, onComplete, order, index, skip, reserveSpace, art, speed = 20, volume = 0.01, msDelay}: SequencerProps) => {

    const power = useSelector(getPower);
    const [output, setOutput] = useState<string | React.ReactNode>('');

    const onFinish = useCallback(() => {
        if (!onComplete) {
            return;
        }

        if (msDelay && msDelay > 0) {
            window.audioManager.play(SoundCode.tick, volume);
            setTimeout(() => {
                onComplete(order !== undefined && order >= 0 ? order + 1 : 0);
            }, msDelay);
            return;
        }

        onComplete(order !== undefined && order >= 0 ? order + 1 : 0);
    }, [onComplete, msDelay, order, volume]);

    useEffect(() => {
        let timeout: any;

        const loadNext = (iteration: number) => {
            if (typeof children !== 'string') {
                setOutput(children);
                if (!onComplete) {
                    return;
                }
                onFinish();
                return;
            }

            if (art) {
                const lines = children.split("\n").length;
                if (iteration < lines) {
                    timeout = setTimeout(() => {
                        setOutput(children.split("\n").splice(0, iteration + 1).join("\n"));
                        window.audioManager.play(SoundCode.tick, volume);
                        loadNext(iteration + 1);
                    }, 100);
                } else {
                    onFinish();
                }
                return;
            }

            if (iteration < children.length) {
                timeout = setTimeout(() => {
                    if (children[iteration] !== '~') {
                        setOutput(prevOutput => prevOutput + children[iteration]);
                        iteration % 2 ? window.audioManager.play(SoundCode.tick, volume) : null;
                    }
                    loadNext(iteration + 1);
                }, speed);
            } else {
                onFinish();
            }
        };

        if (isValidNumber(order) || isValidNumber(index)) {
            if (order === index) {
                loadNext(0);
            }
        } else {
            loadNext(0);
        }

        if (skip) {
            clearTimeout(timeout);
        }

        return () => clearTimeout(timeout);
    }, [children, order, index, onComplete, skip, speed, volume, onFinish, art]);

    useEffect(() => {
        if (skip || !power) {
            setOutput(typeof children === 'string' ? children.replaceAll('~', '') : children);
        }
    }, [children, skip, power]);

    if (art) {
        return <pre style={{ fontFamily: "monospace" }}>{output}</pre>;
    }

    if (line || spacer || className) {
        return (
            <pre style={{ whiteSpace: "pre-line" }}>
                <div className={`${line && 'line'} ${spacer && 'spacer'} ${className}`}>
                    {reserveSpace && !output && <pre> </pre>}
                    {output}
                </div>
            </pre>
        );
    }

    if (reserveSpace) {
        return <pre><div className="line">{output ?? " "}</div></pre>;
    }

    return <>{output}</>;
};
