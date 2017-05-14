import * as actions from '../actions/index';
import update from 'immutability-helper';
import store from '../store';

const appState = {
  channelNames: [],
  liveBroadcasts: [],
  channelVideos: []
};

export const simSpeedReducer = (state=appState, action) => {
  // Channel Names Reducer
  if (action.type === actions.FETCH_CHANNEL_NAMES) {
    const newAppState = update(state, {channelNames: {$set: action.names}});
    return newAppState;
  }
  // Live Broadcasts Reducer
  if (action.type === actions.FETCH_LIVE_BROADCASTS) {
    const newAppState = update(state, {liveBroadcasts: {$set: action.broadcasts}});
    return newAppState;
  }
  // Channel Videos Reducer
  if (action.type === actions.FETCH_CHANNEL_BROADCASTS) {
    const newAppState = update(state, {channelVideos: {$set: action.broadcasts}});
    return newAppState;
  }
  return state;
};
