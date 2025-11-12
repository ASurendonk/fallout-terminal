import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import './styles.scss';
import {Sequencer} from 'components';
import {Button, Input, Title} from 'components/software/elements';
import {navigate} from 'helpers';
import {SYSTEMS} from 'types';

export const Login = () => {
    const [index, setIndex] = useState(0);
    const [endLoad, setEndLoad] = useState(false);
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');
    const passRef = useRef(password);

    const sequencerProps = useMemo(() => ({
        onComplete: setIndex,
        index: index,
        end: endLoad,
    }), [setIndex, index, endLoad]);

    const onScreenClick = useCallback(() => {
        setEndLoad(true);
    }, []);

    useEffect(() => {
        passRef.current = password;
    }, [password]);

    const eventFunction = useCallback((event: any) => {
        if (event.key === 'Enter') {
            if (passRef.current === 'adam') {
                setNotification('> Password accepted.');
                setTimeout(() => navigate(SYSTEMS.HOME), 1000);
            } else {
                setNotification('> Login failed. Try again...');
                setTimeout(() => setNotification(''), 2000);
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', eventFunction);
        return () => window.removeEventListener('keydown', eventFunction);
    }, [eventFunction]);

    const banner = useMemo(() => {
        if (notification) return <Sequencer key="notification">{notification}</Sequencer>;
        else return <Sequencer key="standard" order={4} {...sequencerProps}>{'> Enter password to access mainframe...'}</Sequencer>;
    }, [notification, sequencerProps]);

    return (
        <div className="login screen" onClick={onScreenClick}>
            <Title />
            <div className="screen-content">
                <br/>
                <br/>
                <Sequencer className="line spacer" order={0} {...sequencerProps}>{"> LOGIN ADMIN"}</Sequencer>
                <Sequencer className="line spacer" order={1} {...sequencerProps}>
                    <Input value={password} onTextChange={setPassword} type="password" />
                </Sequencer>
                <br/>
                <br/>
                <Sequencer className="line spacer" order={2} {...sequencerProps} onComplete={undefined}>
                    {'> '}<Button label={<Sequencer order={2} {...sequencerProps}>REBOOT</Sequencer>} onClick={() => navigate(SYSTEMS.BOOT)} />
                </Sequencer>
                <Sequencer className="line" order={3} {...sequencerProps} onComplete={undefined}>
                    {'> '}<Button label={<Sequencer order={3} {...sequencerProps}>@*0#.EXE/RUN</Sequencer>} onClick={() => navigate(SYSTEMS.HACK)} />
                </Sequencer>
            </div>
            {banner}
        </div>
    );
}