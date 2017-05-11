import * as actions from '../actions/index';
import update from 'immutability-helper';
import store from '../store';

const channelNameState = {
  channelNames: []
};

export const channelNamesReducer = (state=channelNameState, action) => {
  if (action.type === actions.FETCH_CHANNEL_NAMES) {
    const newChannelNameState = update(state, {channelNames: {$set: action.names}});
    return newChannelNameState;
  }
  return state;
};
