import React, {useCallback, useMemo, useState} from 'react';
import './styles.scss';
import {Sequencer} from 'components/sequencer';
import {Button, Line, Title} from 'components/software/elements';
import {navigate} from 'helpers';
import {SYSTEMS} from 'types';
import {Notification} from "components/software/elements/notification";

export const Maintenance = () => {

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
    <div className="maintenance screen" onClick={onScreenClick}>
      <Title loggedIn/>

      <Line />
      {"HOME > MAINTENANCE"}
      <Line />

      <Sequencer line order={0} msDelay={100} {...sequencerProps}>
        <Button label="LIGHTS" fullWidth onClick={() => navigate(SYSTEMS.LIGHTS)}/>
      </Sequencer>

      <div className="screen-spacer"/>

      <Sequencer line order={1} msDelay={100} {...sequencerProps}>
        <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.HOME)}/>
      </Sequencer>

      <Notification/>
    </div>
  );
}
