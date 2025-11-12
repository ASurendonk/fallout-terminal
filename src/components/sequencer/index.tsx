import React, {useCallback, useEffect, useState} from 'react';
import { playAudio, tick } from 'helpers/sounds';
import {useAppSelector} from 'redux/hooks';

interface SequencerProps {
    children: string | React.ReactNode;
    className?: string;
    order?: number;
    index?: number;
    onComplete?(index: number): void;
    end?: boolean;
}

const isValidNumber: (number?: any) => boolean = (number) => {
    return number !== undefined && !isNaN(number);
}

export const Sequencer = ({children, className, onComplete, order, index, end}: SequencerProps) => {
    const [output, setOutput] = useState<string | React.ReactNode>('');
    const [timer, setTimer] = useState<any>();
    const power = useAppSelector(state => state.power);

    const loadNext = useCallback((iteration: number) => {
        let timeout: any;

        if (typeof children !== 'string') {
            setOutput(children);
            if (onComplete) {
                if (order !== undefined && order >= 0) {
                    onComplete(order + 1);
                } else {
                    onComplete(0);
                }
            }
            return;
        }

        if (iteration < children.length) {
            timeout = setTimeout(() => {
                if (children[iteration] !== '~') {
                    setOutput(v => v + children[iteration]);
                    playAudio(tick, 0.01);
                }
                loadNext(iteration + 1);
            }, 20);
            setTimer(timeout);
        } else {
            if (onComplete) {
                if (order !== undefined && order >= 0) {
                    onComplete(order + 1);
                } else {
                    onComplete(0);
                }
            }
        }
    }, [children, order, onComplete]);

    useEffect(() => {
        if (isValidNumber(order) || isValidNumber(index)) {
            if (order === index) {
                loadNext(0);
            }
        } else {
            loadNext(0);
        }
        return () => clearTimeout(timer);
    }, [loadNext, order, index]);

    useEffect(() => {
        if (end || !power) {
            clearTimeout(timer);
            setOutput(typeof children === 'string' ? children.replaceAll('~', '') : children);
        }
    }, [children, timer, end, power]);

    if (className) {
        return <div className={className}>{output}</div>;
    }

    return <>{output}</>;
};
