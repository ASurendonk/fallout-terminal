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
        <Sequencer line delay>
          <Button label="WORK_IN_PROGRESS" fullWidth onClick={() => null}/>
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
