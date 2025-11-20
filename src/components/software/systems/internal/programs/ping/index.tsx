import React, {useState} from 'react';
import './styles.scss';
import {SequenceGroup, Sequencer} from 'components/sequencer';
import {Button, Line, Title} from 'components/software/elements';
import {navigate} from 'helpers';
import {SYSTEMS} from 'types';
import {Notification} from "components/software/elements/notification";
import {TextLoader} from "components/software/elements/textLoader";
import {useSelector} from "react-redux";
import {getNetworkNodes} from "store/networkSlice.ts";

export const Ping = () => {
  const [searching, setSearching] = useState<boolean>(true);
  const [discovered, setDiscovered] = useState([]);

  const nodes = useSelector(getNetworkNodes);
  console.log(nodes);

  return (
    <div className="ping screen">
      <Title loggedIn/>

      <Line />
      {"HOME > PROGRAMS > PING"}
      <Line />

      <SequenceGroup>
        <Sequencer line msDelay={100}>
          hey ping
        </Sequencer>
        {searching && <TextLoader />}

        <div className="screen-spacer"/>

        <Sequencer line msDelay={100}>
          <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.HOME)}/>
        </Sequencer>
      </SequenceGroup>

      <Notification/>
    </div>
  );
}
