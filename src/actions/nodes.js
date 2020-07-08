import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res
  };
};

const checkNodeStatusFailure = node => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if(res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));

      dispatch(pullBlockData(node));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach(node => {
      dispatch(checkNodeStatus(node));
    });
  };
}

export function pullBlockData(node) {
  return async dispatch => {
    try {
      dispatch(pullBlockDataStart(node))

      const res = await fetch(`${node.url}/api/v1/blocks`);

      if(res.status >= 400) {
        dispatch(pullBlockDataFailure(node));
      }

      const json = await res.json();

      dispatch(pullBlockDataSuccess(node, json.data))


    } catch (err) {
      dispatch(pullBlockDataFailure(node));
    }
  }
}

const pullBlockDataStart = (node) => {
  return {
    type: types.PULL_BLOCK_DATA_START,
    node
  };
};

const pullBlockDataSuccess = (node, json) => {
  return {
    type: types.PULL_BLOCK_DATA_SUCCESS,
    node,
    json,
  };
};

const pullBlockDataFailure = (node) => {
  return {
    type: types.PULL_BLOCK_DATA_FAILURE,
    node
  };
};