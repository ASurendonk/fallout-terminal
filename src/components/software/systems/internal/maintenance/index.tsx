import React from 'react';
import './styles.scss';
import {SequenceGroup, Sequencer} from 'components/sequencer';
import {Button, Line, Title} from 'components/software/elements';
import {navigate} from 'helpers';
import {SYSTEMS} from 'types';
import {Notification} from "components/software/elements/notification";

export const Maintenance = () => {
  return (
    <div className="maintenance screen">
      <Title loggedIn/>

      <Line />
      {"HOME > MAINTENANCE"}
      <Line />

      <SequenceGroup>
        <Sequencer line delay>
          <Button label="NETWORK MAP" fullWidth onClick={() => navigate(SYSTEMS.NETWORK_MAP)}/>
        </Sequencer>

        <Sequencer line delay>
          <Button label="NETWORK SCANNER" fullWidth onClick={() => navigate(SYSTEMS.NETWORK_SEARCH)}/>
        </Sequencer>

        <Sequencer line delay>
          <Button label="POWER DISTRIBUTOR" fullWidth onClick={() => navigate(SYSTEMS.POWER_DISTRIBUTOR)}/>
        </Sequencer>

        <Sequencer line delay>
          <Button label="LIGHTS" fullWidth onClick={() => navigate(SYSTEMS.LIGHTS)}/>
        </Sequencer>

        <div className="screen-spacer"/>

        <Sequencer line delay>
          <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.HOME)}/>
        </Sequencer>
      </SequenceGroup>

      <Notification/>
    </div>
  );
}
