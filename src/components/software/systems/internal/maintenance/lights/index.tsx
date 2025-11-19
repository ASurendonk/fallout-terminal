import React, { useCallback, useMemo, useState } from 'react';
import './styles.scss';
import { Sequencer } from 'components/sequencer';
import {Button, Line, Title} from 'components/software/elements';
import { navigate } from 'helpers';
import { SYSTEMS } from 'types';
import { Notification } from "components/software/elements/notification";
import {setLight} from "store/mainframeSlice.ts";
import {useDispatch} from "hooks/dispatch.ts";

export const Lights = () => {
  const dispatch = useDispatch();

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
    <div className="lights screen" onClick={onScreenClick}>
      <Title loggedIn/>

      <Line />
      {"HOME > MAINTENANCE > LIGHTS"}
      <Line />

      <Sequencer line order={0} msDelay={100} {...sequencerProps}>
        <Button label="ON" fullWidth onClick={() => dispatch(setLight(0.8))}/>
      </Sequencer>
      <Sequencer line order={0} msDelay={100} {...sequencerProps}>
        <Button label="OFF" fullWidth onClick={() => dispatch(setLight(0.1))}/>
      </Sequencer>

      <div className="screen-spacer"/>

      <Sequencer line order={1} msDelay={100} {...sequencerProps}>
        <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.MAINTENANCE)}/>
      </Sequencer>

      <Notification/>
    </div>
  );
}
