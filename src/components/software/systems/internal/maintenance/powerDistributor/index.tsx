import React from 'react';
import './styles.scss';
import {SequenceGroup, Sequencer} from 'components/sequencer';
import {Button, Line, Title} from 'components/software/elements';
import { navigate } from 'helpers';
import { SYSTEMS } from 'types';
import { Notification } from "components/software/elements/notification";
import {useDispatch} from "hooks/dispatch.ts";

export const PowerDistributor = () => {
  const dispatch = useDispatch();

  return (
    <div className="power-distributor screen">
      <Title loggedIn/>

      <Line />
      {"HOME > MAINTENANCE > POWER DISTRIBUTOR"}
      <Line />

      <SequenceGroup>
        Test

        <div className="screen-spacer"/>

        <Sequencer line delay>
          <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.MAINTENANCE)}/>
        </Sequencer>
      </SequenceGroup>

      <Notification/>
    </div>
  );
}
