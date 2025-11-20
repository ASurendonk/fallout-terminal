import React from 'react';
import './styles.scss';
import { Button, Line, Title } from 'components/software/elements';
import { SYSTEMS } from 'types';
import { navigate } from 'helpers';
import { Sequencer, SequenceGroup } from "components/sequencer";
import { NetworkMap } from "components/software/games/network/map.tsx";

export const Map = () => {
  return (
    <div className="local-map screen">
      <Title loggedIn/>

      <Line />
      {"HOME > PROGRAMS > MAP"}

      <SequenceGroup>
        <NetworkMap />

        <div className="screen-spacer"/>

        <Sequencer line>
          <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.HOME)}/>
        </Sequencer>
      </SequenceGroup>
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
