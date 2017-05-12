import * as actions from '../actions/index';
import update from 'immutability-helper';
import store from '../store';

const appState = {
  channelNames: [],
  liveBroadcasts: []
};

export const channelNamesReducer = (state=appState, action) => {
  if (action.type === actions.FETCH_CHANNEL_NAMES) {
    const newAppState = update(state, {channelNames: {$set: action.names}});
    return newAppState;
  }
  if (action.type === actions.FETCH_LIVE_BROADCASTS) {
  	const newAppState = update(state, {liveBroadcasts: {$set: action.broadcasts}});
  	return newAppState;
  }
  return state;
};
