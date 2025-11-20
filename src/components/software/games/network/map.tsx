import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {NetworkNode, NODE_IDS} from 'store/network';
import {Sequencer} from 'components/sequencer';

export const NetworkMap = () => {
  const networkNodes = useSelector((state: RootState) => state.network.nodes);

  const [nodes, setNodes] = useState<NetworkNode[][]>([]);
  const [map, setMap] = useState([[]]);

  const traverseNodes = useCallback(() => {
    const new_nodes = [];
    const playerTerminal = networkNodes[NODE_IDS.PLAYER_TERMINAL];
    new_nodes.push([playerTerminal]);

    const network_row: NetworkNode[] = [];
    playerTerminal.connections.forEach((connection) => {
      const discovered_node = networkNodes[connection];
      if (discovered_node) {
        network_row.push(discovered_node);
      }
    });
    new_nodes.push(network_row);

    setNodes(new_nodes);
  }, [networkNodes]);

  useEffect(() => {
    traverseNodes();
  }, [traverseNodes]);

  return (
    <Sequencer art>
      {nodes.map(row => (
        <div>{row.map(node => node.id).join('||')}</div>
      ))}
    </Sequencer>
  );
}