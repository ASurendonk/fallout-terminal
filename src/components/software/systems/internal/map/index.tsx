import React, { useCallback, useMemo, useState } from 'react';
import './styles.scss';
import {Button, Line, Title} from 'components/software/elements';
import { SYSTEMS } from 'types';
import { navigate } from 'helpers';
import { Sequencer } from "components/sequencer";

export const Map = () => {

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
        <div className="local-map screen" onClick={onScreenClick}>
            <Title loggedIn/>

            <Line />
            {"HOME > MAP"}

            <Sequencer art order={0} {...sequencerProps}>{artMap}</Sequencer>

            <div className="screen-spacer"/>

            <Sequencer line order={1} {...sequencerProps}>
                <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.HOME)}/>
            </Sequencer>
        </div>
    );
}

const artMap = `
        ╔══════════════════════════════════╗         
        ║                                  ║         
        ║          ╔════════════════════╗  ║         
  ╔═════╝          ║░░░░░░░░░░░░░░░░░░░░║  ║         
  #                ║░░░░░░░░░░░░░░░░░░░░║  ║         
  #                ║░░░░░░░░░░░░░░░░░░░░║  ║         
  ╚═════╗          ║░░░░░░░░░░░░░░░░░░░░║  ╠══════╗  
        ║          ╚════════════════════╝  ║    x ║  
        ║                                  |      ║  
        ╚══════════╦══------══╦═════════╗  ║      ║  
                   ║  x       ║         ║  ╠══════╣  
                   ║          ╚═┴═════┼═╝     ||||║  
                   ╚════════════┬═════┼════╩══════╝  
`;
