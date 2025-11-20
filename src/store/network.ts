export enum NODE_TYPES {
  TERMINAL = 'TERMINAL',
  RELAY = 'RELAY',
}

export enum NODE_CONDITION {
  PERMANENT = 'PERMANENT',
  POWERED = 'POWERED',
  UNPOWERED = 'UNPOWERED',
  DAMAGED = 'DAMAGED',
}

export type NetworkNode = {
  id: string;
  type: NODE_TYPES,
  condition: NODE_CONDITION,
  connections: string[],
}

export const NODE_IDS = {
  PLAYER_TERMINAL: 'player-terminal',
  RELAY_ALPHA: 'relay-alpha',
  RELAY_BETA: 'relay-beta',
  RELAY_CHARLIE: 'relay-charlie',
};

export const NETWORK_NODES: Record<string, NetworkNode> = {
  [NODE_IDS.PLAYER_TERMINAL]: {
    id: NODE_IDS.PLAYER_TERMINAL,
    type: NODE_TYPES.TERMINAL,
    condition: NODE_CONDITION.PERMANENT,
    connections: [NODE_IDS.RELAY_ALPHA, NODE_IDS.RELAY_BETA, NODE_IDS.RELAY_CHARLIE],
  },
  [NODE_IDS.RELAY_ALPHA]: {
    id: NODE_IDS.RELAY_ALPHA,
    type: NODE_TYPES.RELAY,
    condition: NODE_CONDITION.UNPOWERED,
    connections: [],
  },
  [NODE_IDS.RELAY_BETA]: {
    id: NODE_IDS.RELAY_BETA,
    type: NODE_TYPES.RELAY,
    condition: NODE_CONDITION.UNPOWERED,
    connections: [],
  },
  [NODE_IDS.RELAY_CHARLIE]: {
    id: NODE_IDS.RELAY_CHARLIE,
    type: NODE_TYPES.RELAY,
    condition: NODE_CONDITION.DAMAGED,
    connections: [],
  },
};
