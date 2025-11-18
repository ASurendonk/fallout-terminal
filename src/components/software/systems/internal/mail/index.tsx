import React, { useCallback, useContext, useMemo, useState } from 'react';
import './styles.scss';
import {Button, Line, Title} from 'components/software/elements';
import { SYSTEMS } from 'types';
import { navigate } from 'helpers';
import { Sequencer } from "components/sequencer";
import { SystemDataContext } from "components/software/elements/context/context";

export const Entries = () => {

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

    const onClickLog = useCallback(() => {
        systemData?.setData(securityWarning);
        navigate(SYSTEMS.LOG);
    }, [systemData]);

    const onClickLog2 = useCallback(() => {
        systemData?.setData(joinToday);
        navigate(SYSTEMS.LOG);
    }, [systemData]);

    return (
        <div className="entries screen" onClick={onScreenClick}>
            <Title loggedIn />

            <Line />
            {"HOME > LOGS!"}
            <Line />

            <Sequencer line order={0} msDelay={100} {...sequencerProps}>
                <Button label="SECURITY WARNING" fullWidth onClick={onClickLog}/>
            </Sequencer>

            <Sequencer line order={1} msDelay={100} {...sequencerProps}>
                <Button label="Join Today" fullWidth onClick={onClickLog2}/>
            </Sequencer>

            <div className="screen-spacer" />

            <Sequencer line order={2} {...sequencerProps}>
                <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.HOME)}/>
            </Sequencer>
        </div>
    );
}

const securityWarning = `
Log Entry #452 - Date: 10.23.2287

AUTOMATIC SECURITY WARNING

Vault Dweller 1514,

Immediate action required:

Refrain from using your name as a password.
Change it now! Don't be the weak link.

END OF MESSAGE`.trimStart();

const joinToday = `
Log Entry #453 - Date: 10.23.2287

Join the LOYALTY CORPS today!`.trimStart();
