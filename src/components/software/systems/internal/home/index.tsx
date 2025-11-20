import React, { useCallback, useMemo, useState } from 'react';
import './styles.scss';
import { Sequencer, SequenceGroup } from 'components/sequencer';
import {Button, Line, Title} from 'components/software/elements';
import { navigate } from 'helpers';
import { SYSTEMS } from 'types';
import { Notification } from "components/software/elements/notification";

export const Home = () => {

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
      HOME
      <Line />

      <SequenceGroup>
        <Sequencer art>{artTitle}</Sequencer>
        <Line />

        <Sequencer>{"Welcome VD#1514"}</Sequencer>
        <Line />

        <Sequencer line msDelay={100}>
          <Button label="LOGS" fullWidth onClick={() => navigate(SYSTEMS.ENTRIES)}/>
        </Sequencer>

        <Sequencer line msDelay={100}>
          <Button label="PROGRAMS" fullWidth onClick={() => navigate(SYSTEMS.PROGRAMS)}/>
        </Sequencer>

        {/*<Sequencer line msDelay={100}>*/}
        {/*  <Button label="REPAIR" fullWidth onClick={() => navigate(SYSTEMS.REPAIR)}/>*/}
        {/*</Sequencer>*/}

        <Sequencer line msDelay={100}>
          <Button label="MAINTENANCE" fullWidth onClick={() => navigate(SYSTEMS.MAINTENANCE)}/>
        </Sequencer>

        <div className="screen-spacer"/>

        <Sequencer line msDelay={100}>
          <Button label="LOGOUT" fullWidth onClick={() => navigate(SYSTEMS.LOGIN)}/>
        </Sequencer>
      </SequenceGroup>

      <Notification/>
    </div>
  );
}

// Vault-Tec: Keeping the fallout, out.
// Vault-Tec: You're not 6 feet under, you're 300!


// Ascii Font: pagga
const artTitle = `
░█░█░█▀█░█░█░█░░░▀█▀░░░█░█░█░█
░█░█░█▀█░█░█░█░░░░█░░░░▀▀█░▀▀█
░░▀░░▀░▀░▀▀▀░▀▀▀░░▀░░░░░░▀░░░▀
`.trimStart();

// access terminal on same floor
// cant access directly - too far
// activate relays
// relays cost power
// need 2 relays, can only afford one
// can relay to generator room, increase power
// now can relay twice to terminal
// 3 screens:
// - map: shows terminals and relays as nodes
// - network search?: finds a list of network nodes (include too far items?)
// - connection screen: activates nodes