import React, { useCallback, useMemo, useState } from 'react';
import './styles.scss';
import { Sequencer } from 'components/sequencer';
import { Button, Title } from 'components/software/elements';
import { navigate } from 'helpers';
import { SYSTEMS } from 'types';
import { Notification } from "components/software/elements/notification";

export const Home = () => {

    const [index, setIndex] = useState(0);
    const [skip, setSkip] = useState(false);

    const sequencerProps = useMemo(() => ({
        onComplete: setIndex,
        index: index,
        skip: skip,
    }), [setIndex, index, skip]);

    const onScreenClick = useCallback(() => {
        setSkip(true);
    }, []);

    return (
        <div className="home screen" onClick={onScreenClick}>
            <Title loggedIn/>
            <br/>
            <br/>hi
            <div>{"HOME"}</div>
            <br/>

            <Sequencer art order={0} {...sequencerProps}>{artTitle}</Sequencer>
            <br/>

            <div><Sequencer order={1} {...sequencerProps}>Welcome VD#1514</Sequencer></div>
            <br/>

            <Sequencer line order={2} msDelay={100} {...sequencerProps}>
                <Button label="LOGS" fullWidth onClick={() => navigate(SYSTEMS.ENTRIES)}/>
            </Sequencer>

            <Sequencer line order={3} msDelay={100} {...sequencerProps}>
                <Button label="MAP" fullWidth onClick={() => navigate(SYSTEMS.MAP)}/>
            </Sequencer>

            <Sequencer line order={4} msDelay={100} {...sequencerProps}>
                <Button label="REPAIR" fullWidth onClick={() => navigate(SYSTEMS.REPAIR)}/>
            </Sequencer>

            <div className="screen-spacer"/>

            <Sequencer line order={5} msDelay={100} {...sequencerProps}>
                <Button label="LOGOUT" fullWidth onClick={() => navigate(SYSTEMS.LOGIN)}/>
            </Sequencer>

            <Notification/>
        </div>
    );
}

// Vault-Tec: Keeping the fallout, out.
// Vault-Tec: You're not 6 feet under, you're 300!


// Ascii Font: pagga
const artTitle = `
░█░█░█▀█░█░█░█░░░▀█▀░░░█░█░█░█
░█░█░█▀█░█░█░█░░░░█░░░░▀▀█░▀▀█
░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░░░░░▀░░░▀
`.trimStart();
