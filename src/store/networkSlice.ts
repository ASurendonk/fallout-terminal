import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/index";
import { NETWORK_NODES, NetworkNode, NODE_IDS } from "store/network";

interface NetworkState {
  nodes: Record<string, NetworkNode>;
}

const initialState: NetworkState = {
  nodes: {
    [NODE_IDS.PLAYER_TERMINAL]: NETWORK_NODES[NODE_IDS.PLAYER_TERMINAL],
  },
};

export const networkSlice = createSlice({
  name: "network",
  initialState: initialState,
  reducers: {
    addNode: (state, action: PayloadAction<NetworkNode>) => {
      const nodes = { ...state.nodes };
      nodes[action.payload.id] = action.payload;
      state.nodes = nodes;
    },
    powerNode: (state, action: PayloadAction<NetworkNode>) => {
      // todo: change this function
      const nodes = { ...state.nodes };
      nodes[action.payload.id] = action.payload;
      state.nodes = nodes;
    },
  },
});

export const {
  addNode,
  powerNode,
} = networkSlice.actions;

export const getNetworkNodes = (state: RootState) => state.network.nodes;

export default networkSlice.reducer
