import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './styles.scss';
import {SYSTEMS} from 'types';
import {Sequencer} from 'components';
import {navigate} from 'helpers';
import {Button, Title} from 'components/software/elements';

export const Boot = () => {
    const [index, setIndex] = useState(0);
    const [endLoad, setEndLoad] = useState(false);
    const [bios, setBios] = useState(false);

    const sequencerProps = useMemo(() => ({
        onComplete: setIndex,
        index: index,
        end: endLoad,
    }), [setIndex, index, endLoad]);

    const onScreenClick = useCallback(() => {
        setEndLoad(true);
        setIndex(99);
    }, []);

    useEffect(() => {
        if (index > 7) {
            if (bios) {
                navigate(SYSTEMS.BIOS);
            } else {
                navigate(SYSTEMS.LOGIN);
            }
        }
    }, [index, bios]);

    const onBiosClick = useCallback(() => {
        setBios(true);
    }, []);

    return (
        <div className="boot screen" onClick={onScreenClick}>
            <Title />
            <div className="screen-content">
                <Sequencer className="line" order={0} {...sequencerProps}>CPU: Ar-Co(R) CPU AC80 @ 2.04MHz</Sequencer>
                <Sequencer className="line spacer" order={1} {...sequencerProps}>BIOS Ver: 01.00.11</Sequencer>
                <Sequencer className="line spacer" order={2} {...sequencerProps} onComplete={undefined}>
                    <Button label={<Sequencer order={2} {...sequencerProps}>Press for BIOS</Sequencer>} onClick={onBiosClick} />
                </Sequencer>
                <Sequencer className="line" order={3} {...sequencerProps}>MEMORY: 128KB RAM</Sequencer>
                <Sequencer className="line" order={4} {...sequencerProps}>MEMORY CHECK: 055062A ... ~~~~~~~~~~ OK</Sequencer>
                <Sequencer className="line" order={5} {...sequencerProps}>DRIVE CHECK: 131072B ... ~~~~~ OK</Sequencer>
                <Sequencer className="line spacer" order={6} {...sequencerProps}>CARD CHECK: 234712C ... ~~~~~~~~~~ OK</Sequencer>
            </div>
            <Sequencer className="line spacer" order={7} {...sequencerProps}>{'> Accessing system. Please wait... ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~done.~~~~~~~~~~'}</Sequencer>
        </div>
    );
};
