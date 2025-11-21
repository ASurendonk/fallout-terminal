import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './styles.scss';
import { Sequencer } from 'components/sequencer';
import { Button, Title } from 'components/software/elements';
import { navigate } from 'helpers';
import { SYSTEMS } from 'types';
import { PasswordInput } from "components/software/elements/passwordInput";
import { getHackLoaded } from "store/mainframeSlice";
import { useSelector } from "react-redux";

export const Login = () => {
    const [index, setIndex] = useState(0);
    const [skip, setSkip] = useState(false);
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');
    const passRef = useRef(password);
    const hackLoaded = useSelector(getHackLoaded);

    const sequencerProps = useMemo(() => ({
        onComplete: setIndex,
        index: index,
        skip: skip,
    }), [setIndex, index, skip]);

    const onScreenClick = useCallback(() => {
        setSkip(true);
        setIndex(99);
    }, []);

    useEffect(() => {
        passRef.current = password;
    }, [password]);

    const attemptLogin = useCallback(() => {
        if (passRef.current.toLowerCase() === 'adam') {
            setNotification('> Password accepted.');
            setTimeout(() => navigate(SYSTEMS.HOME), 1000);
        } else {
            setNotification('> Login failed. Try again...');
            setTimeout(() => setNotification(''), 2000);
        }
    }, []);

    const eventFunction = useCallback((event: any) => {
        if (event.key === 'Enter') {
            attemptLogin();
        }
    }, [attemptLogin]);

    useEffect(() => {
        window.addEventListener('keydown', eventFunction);
        return () => window.removeEventListener('keydown', eventFunction);
    }, [eventFunction]);

    const banner = useMemo(() => {
        if (notification) return <Sequencer key="notification">{notification}</Sequencer>;
        else return <Sequencer key="standard" order={5} {...sequencerProps}>{'> Enter password to access terminal...'}</Sequencer>;
    }, [notification, sequencerProps]);

    const onPasswordChange = useCallback((value: string) => {
        setPassword(value);
    }, []);

    return (
        <div className="login screen" onClick={onScreenClick}>
            <Title />
            <div className="screen-content">
                <Sequencer art order={0} {...sequencerProps}>{artTitle}</Sequencer>
                <br/>
                <Sequencer line order={1} {...sequencerProps}>{"LOGIN ADMIN"}</Sequencer>
                <Sequencer line smSpacer order={2} {...sequencerProps}>
                    <PasswordInput value={password} onTextChange={onPasswordChange} />
                </Sequencer>
                <Sequencer line order={2} delay {...sequencerProps}>
                    <Button label="LOGIN" fullWidth onClick={() => attemptLogin()}/>
                </Sequencer>
                <br/>
                <Sequencer line order={3} delay {...sequencerProps}>
                    <Button label="INFORMATION" fullWidth onClick={() => navigate(SYSTEMS.BIOS)}/>
                </Sequencer>
                <Sequencer line order={4} delay {...sequencerProps}>
                    {hackLoaded ? (
                        <Button label="/HACK/" fullWidth onClick={() => navigate(SYSTEMS.HACK)}/>
                    ) : ""}
                </Sequencer>
            </div>
            {banner}
        </div>
    );
}

// Ascii Font: ANSI Shadow
const artTitle = `
██████╗  ██████╗ ██████╗  ██████╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗██╔════╝██╔═══██╗
██████╔╝██║   ██║██████╔╝██║     ██║   ██║
██╔══██╗██║   ██║██╔══██╗██║     ██║   ██║
██║  ██║╚██████╔╝██████╔╝╚██████╗╚██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═════╝
`.trimStart();
