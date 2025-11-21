import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from "react-redux";
import './styles.scss';
import { SYSTEMS } from 'types';
import { Sequencer } from 'components/sequencer';
import { navigate } from 'helpers';
import {Button, Line, Title} from 'components/software/elements';
import { Notification } from "components/software/elements/notification";
import { useDispatch } from "hooks/dispatch";
import { getColor, getHackLoaded, loadHack, notify, setColor } from "store/mainframeSlice";
import { Slider } from "components/software/elements/slider";
import { SoundCode } from "helpers/sounds";
import { StorageCode } from "helpers/storage";
import useDebouncedEffect from "use-debounced-effect";

export const Bios = () => {

    const dispatch = useDispatch();
    const hackLoaded = useSelector(getHackLoaded);
    const color = useSelector(getColor);

    const [index, setIndex] = useState(0);
    const [skip, setSkip] = useState(false);

    const [localColor, setLocalColor] = useState(color);

    const sequencerProps = useMemo(() => ({
        onComplete: setIndex,
        index: index,
        skip: skip,
    }), [setIndex, index, skip]);

    const onScreenClick = useCallback(() => {
        if (!skip) {
            setSkip(true);
            setIndex(99);
        }
    }, [skip]);

    const onHashClick = useCallback(() => {
        if (hackLoaded) {
            dispatch(notify("/HACK/ Already Loaded..."));
            return;
        }
        dispatch(loadHack());
        dispatch(notify("/HACK/ Loaded..."));
        window.audioManager.play(SoundCode.slot, 0.5);
    }, [hackLoaded, dispatch]);

    const onColorChange = useCallback((name: "red" | "green" | "blue") => (value: number) => {
        setLocalColor(c => {
            const newColor = { ...c };
            newColor[name] = value;
            return newColor;
        });
    }, []);

    useDebouncedEffect(() => {
        dispatch(setColor(localColor));
        window.storageManager.setItem(StorageCode.color, localColor);
    }, 10, [dispatch, localColor]);

    return (
        <div className="boot screen" onClick={onScreenClick}>
            <Title/>
            <Sequencer art order={0} {...sequencerProps}>{artTitle}</Sequencer>
            <Line />

            <Sequencer line order={1} {...sequencerProps}>Mainframe Ver: 02.00.02</Sequencer>
            <Sequencer line order={2} {...sequencerProps}>Mainframe Date: 03/21/1989 10:27:53</Sequencer>
            <Line />

            <Sequencer line order={3} {...sequencerProps}>Drives:</Sequencer>
            <Sequencer line order={4} delay {...sequencerProps}>
                <Button label="MAIN" fullWidth onClick={() => dispatch(notify("MAIN Already Loaded..."))} />
            </Sequencer>
            <Sequencer line order={5} delay {...sequencerProps}>
                <Button label="/HACK/ (UNKNOWN)" fullWidth onClick={onHashClick} />
            </Sequencer>
            <Line />

            <Sequencer line order={6} {...sequencerProps}>Color:</Sequencer>
            <Sequencer line order={7} delay {...sequencerProps}>
                <Slider label="RED" value={localColor.red} onValueChange={onColorChange("red")} />
            </Sequencer>
            <Sequencer line order={8} delay {...sequencerProps}>
                <Slider label="GREEN" value={localColor.green} onValueChange={onColorChange("green")} />
            </Sequencer>
            <Sequencer line order={9} delay {...sequencerProps}>
                <Slider label="BLUE" value={localColor.blue} onValueChange={onColorChange("blue")} />
            </Sequencer>

            <div className="screen-spacer"/>

            <Sequencer line order={10} delay {...sequencerProps} onComplete={onScreenClick}>
                <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.LOGIN)}/>
            </Sequencer>

            <Notification/>
        </div>
    );
};


// Ascii Font: pagga
const artTitle = `
░█▄█░█▀█░▀█▀░█▀█░█▀▀░█▀▄░█▀█░█▄█░█▀▀
░█░█░█▀█░░█░░█░█░█▀▀░█▀▄░█▀█░█░█░█▀▀
░▀░▀░▀░▀░▀▀▀░▀░▀░▀░░░▀░▀░▀░▀░▀░▀░▀▀▀
`.trimStart();
