import React, {useCallback, useMemo, useState} from 'react';
import './styles.scss';
import {SYSTEMS} from 'types';
import {Sequencer} from 'components';
import {navigate} from 'helpers';
import {Title} from 'components/software/elements';

export const Bios = () => {
    const [index, setIndex] = useState(0);
    const [endLoad, setEndLoad] = useState(false);

    const sequencerProps = useMemo(() => ({
        onComplete: setIndex,
        index: index,
        end: endLoad,
    }), [setIndex, index, endLoad]);

    const onScreenClick = useCallback(() => {
        setEndLoad(true);
        setIndex(99);
        navigate(SYSTEMS.BOOT);
    }, []);

    return (
        <div className="boot screen" onClick={onScreenClick}>
            <Title />
            <Sequencer className="line" order={0} {...sequencerProps}>BIOS Ver: 01.00.11</Sequencer>
            <Sequencer className="line" order={1} {...sequencerProps}>BIOS Date: 03/21/1989 10:27:53</Sequencer>
        </div>
    );
};
