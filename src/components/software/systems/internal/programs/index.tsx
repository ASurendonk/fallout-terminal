import React from 'react';
import './styles.scss';
import {SequenceGroup, Sequencer} from 'components/sequencer';
import {Button, Line, Title} from 'components/software/elements';
import {navigate} from 'helpers';
import {SYSTEMS} from 'types';
import {Notification} from "components/software/elements/notification";

export const Programs = () => {
  return (
    <div className="programs screen">
      <Title loggedIn/>

      <Line />
      {"HOME > PROGRAMS"}
      <Line />

      <SequenceGroup>
        <Sequencer line msDelay={100}>
          <Button label="NETWORK MAP" fullWidth onClick={() => navigate(SYSTEMS.NETWORK_MAP)}/>
        </Sequencer>

        <Sequencer line msDelay={100}>
          <Button label="NETWORK SEARCH" fullWidth onClick={() => navigate(SYSTEMS.NETWORK_SEARCH)}/>
        </Sequencer>

        <div className="screen-spacer"/>

        <Sequencer line msDelay={100}>
          <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.HOME)}/>
        </Sequencer>
      </SequenceGroup>

      <Notification/>
    </div>
  );
}
