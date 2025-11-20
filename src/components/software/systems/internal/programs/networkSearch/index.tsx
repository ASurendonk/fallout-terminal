import React, {useCallback, useEffect, useState} from 'react';
import './styles.scss';
import {SequenceGroup, Sequencer} from 'components/sequencer';
import {Button, Line, Title} from 'components/software/elements';
import {navigate} from 'helpers';
import {SYSTEMS} from 'types';
import {Notification} from "components/software/elements/notification";
import {TextLoader} from "components/software/elements/textLoader";
import {useDispatch, useSelector} from "react-redux";
import {addNode, getNetworkNodes} from "store/networkSlice.ts";
import {NETWORK_NODES, NetworkNode, NODE_IDS} from "store/network.ts";

export const NetworkSearch = () => {
  const dispatch = useDispatch();
  const [searching, setSearching] = useState<boolean>(true);
  const [nodes, setNodes] = useState<NetworkNode[]>([]);

  const raw_nodes = useSelector(getNetworkNodes);
  const rootNode = raw_nodes[NODE_IDS.PLAYER_TERMINAL];

  useEffect(() => {
    const internal_nodes = [];
    for (const key of Object.keys(raw_nodes)) {
      if (key !== NODE_IDS.PLAYER_TERMINAL) {
        internal_nodes.push(raw_nodes[key]);
      }
    }
    setNodes(internal_nodes);
  }, [raw_nodes]);

  const searchNetwork = useCallback(async () => {
    const new_connections: NetworkNode[] = [];
    const discovered_keys = Object.keys(raw_nodes);
    for (const key of discovered_keys) {
      raw_nodes[key].connections.forEach((connection) => {
        if (!discovered_keys.includes(connection)) {
          new_connections.push(NETWORK_NODES[connection]);
        }
      });
    }
    // a loop that waits a random amount of time between each item in the array, from 250 - 1000ms, then "discovers" a node
    for (const connection of new_connections) {
      const wait = Math.floor(250 + Math.random() * 1000);
      await new Promise(resolve => setTimeout(resolve, wait));
      dispatch(addNode(connection));
    }
    setSearching(false);
  }, [raw_nodes, dispatch]);

  useEffect(() => {
    void searchNetwork();
  }, [searchNetwork]);

  return (
    <div className="network-search screen">
      <Title loggedIn/>

      <Line />
      {"HOME > PROGRAMS > NETWORK SEARCH"}
      <Line />

      <SequenceGroup>
        {nodes.map((node) => (
          <div key={node.id}>{node.id}</div>
        ))}
        {searching && <TextLoader />}

        <div className="screen-spacer"/>

        <Sequencer line msDelay={100}>
          <Button label="BACK" fullWidth onClick={() => navigate(SYSTEMS.PROGRAMS)}/>
        </Sequencer>
      </SequenceGroup>

      <Notification/>
    </div>
  );
}
