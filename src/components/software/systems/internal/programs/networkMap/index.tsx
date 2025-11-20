import React from 'react';
import './styles.scss';
import { Button, Line, Title } from 'components/software/elements';
import { SYSTEMS } from 'types';
import { navigate } from 'helpers';
import { Sequencer, SequenceGroup } from "components/sequencer";
import { NetworkMap as NMap } from "components/software/games/network/map.tsx";

export const NetworkMap = () => {
  return (
    <div className="network-map screen">
      <Title loggedIn/>

      <Line />
      {"HOME > PROGRAMS > NETWORK MAP"}

      <SequenceGroup>
        <NMap />

        <div className="screen-spacer"/>

        <Sequencer line>
          <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.PROGRAMS)}/>
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
