import React, {useCallback, useMemo, useState} from 'react';
import './styles.scss';
import {Sequencer} from 'components';
import {Button, Title} from 'components/software/elements';
import {navigate} from 'helpers';
import {SYSTEMS} from 'types';

export const Home = () => {
    const [index, setIndex] = useState(0);
    const [endLoad, setEndLoad] = useState(false);

    const sequencerProps = useMemo(() => ({
        onComplete: setIndex,
        index: index,
        end: endLoad,
    }), [setIndex, index, endLoad]);

    const onScreenClick = useCallback(() => {
        setEndLoad(true);
    }, []);

    return (
        <div className="home screen" onClick={onScreenClick}>
            <Title />
            <Sequencer className="line spacer" order={0} {...sequencerProps}>HOME</Sequencer>
            <Sequencer className="line" order={1} {...sequencerProps}>
                {'> '}<Button label="MAP" onClick={() => navigate(SYSTEMS.MAP)} />
            </Sequencer>
            <Sequencer className="line" order={2} {...sequencerProps}>
                {'> '}<Button label="RESET" onClick={() => navigate(SYSTEMS.BOOT)} />
            </Sequencer>
        </div>
    );
}