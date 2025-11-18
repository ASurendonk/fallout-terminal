import React, { useCallback, useContext, useMemo, useState } from 'react';
import './styles.scss';
import { Button, Title } from 'components/software/elements';
import { SYSTEMS } from 'types';
import { navigate } from 'helpers';
import { Sequencer } from "components/sequencer";
import { SystemDataContext } from "components/software/elements/context/context.tsx";

export const Log = () => {

    const [index, setIndex] = useState(0);
    const [skip, setSkip] = useState(false);

    const systemData = useContext(SystemDataContext);

    const sequencerProps = useMemo(() => ({
        onComplete: setIndex,
        index: index,
        skip: skip,
    }), [setIndex, index, skip]);

    const onScreenClick = useCallback(() => {
        setSkip(true);
    }, []);

    return (
        <div className="log screen" onClick={onScreenClick}>
            <Title loggedIn />
            <div>{"HOME > LOGS > LOG"}</div>
            <br/>

            <Sequencer line order={0} {...sequencerProps}>
                {systemData?.data ?? ""}
            </Sequencer>

            <div className="screen-spacer"/>

            <Sequencer line order={1} {...sequencerProps}>
                <Button label="DONE" fullWidth onClick={() => navigate(SYSTEMS.ENTRIES)}/>
            </Sequencer>
        </div>
    );
}
