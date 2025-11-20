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

export const NETWORK_NODES: Record<string, NetworkNode> = {
  'player-terminal': {
    id: 'player-terminal',
    type: NODE_TYPES.TERMINAL,
    condition: NODE_CONDITION.PERMANENT,
    connections: ['relay-alpha', 'relay-beta'],
  },
  'relay-alpha': {
    id: 'relay-alpha',
    type: NODE_TYPES.RELAY,
    condition: NODE_CONDITION.UNPOWERED,
    connections: [],
  },
  'relay-beta': {
    id: 'relay-beta',
    type: NODE_TYPES.RELAY,
    condition: NODE_CONDITION.UNPOWERED,
    connections: [],
  },
  'relay-charlie': {
    id: 'relay-charlie',
    type: NODE_TYPES.RELAY,
    condition: NODE_CONDITION.DAMAGED,
    connections: [],
  },
};

export const NODE_IDS = {
  PLAYER_TERMINAL: 'player-terminal',
  RELAY_ALPHA: 'relay-alpha',
  RELAY_BETA: 'relay-beta',
  RELAY_CHARLIE: 'relay-charlie',
};