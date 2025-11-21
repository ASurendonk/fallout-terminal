import React, { useCallback, useMemo, useState } from "react";
import {Button, Line, Title} from "components/software/elements";
import { Sequencer } from "components/sequencer";
import { navigate } from "helpers";
import { SYSTEMS } from "types";
import { RepairGame } from "components/software/games/repair";

export const Repair = () => {

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

            <Line />
            {"HOME > REPAIR (WORK_IN_PROGRESS)"}
            <Line />

            <RepairGame />

            <div className="screen-spacer"/>

            <Sequencer line order={0} delay {...sequencerProps}>
                <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.HOME)}/>
            </Sequencer>
        </div>
    );
}
