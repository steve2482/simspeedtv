import * as actions from '../actions/actions';
import update from 'immutability-helper';

let width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

let showMenu = width >= 1150 ? true : false;

const appState = {
  channelNames: [],
  liveBroadcasts: [],
  channelVideos: [],
  nextPageToken: null,
  user: '',
  errors: null,
  showMenu: showMenu
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
    let currentChannelBroadcasts = JSON.parse(JSON.stringify(state.channelVideos));
    if (currentChannelBroadcasts[0] === undefined || currentChannelBroadcasts[0].snippet.channelId !== action.broadcasts[0].snippet.channelId) {
      let currentChannelBroadcasts = [];
      action.broadcasts.forEach(broadcast => {
        currentChannelBroadcasts.push(broadcast);
      });
      const newAppState = update(state, {channelVideos: {$set: currentChannelBroadcasts}});
      return newAppState;
    } else {
      action.broadcasts.forEach(broadcast => {
        currentChannelBroadcasts.push(broadcast);
      });
      const newAppState = update(state, {channelVideos: {$set: currentChannelBroadcasts}});
      return newAppState;
    }
  }
  // Set nextPageToken
  if (action.type === actions.SET_NEXT_PAGE_TOKEN) {
    const newAppState = update(state, {nextPageToken: {$set: action.nextPageToken}});
    return newAppState;
  }
  // Set User Name
  if (action.type === actions.SET_USER) {
    const newAppState = update(state, {user: {$set: action.userName}});
    return newAppState;
  }
  // Set Errors if Any
  if (action.type === actions.SET_ERRORS) {
    const newAppState = update(state, {errors: {$set: action.errors}});
    return newAppState;
  }
  // Add Channel to Favorited List
  if (action.type === actions.ADD_FAVORITE_CHANNEL) {
    if (state.user.favoriteChannels === undefined) {
      let currentFavChannels = [];
      currentFavChannels.push(action.channel);
      const newAppState = update(state, {user: {favoriteChannels: {$set: currentFavChannels}}});
      return newAppState;
    } else  {      
      let currentFavChannels = JSON.parse(JSON.stringify(state.user.favoriteChannels));
      currentFavChannels.push(action.channel);
      const newAppState = update(state, {user: {favoriteChannels: {$set: currentFavChannels}}});
      return newAppState;
    }    
  }
  // Remove Channel from Favorite List
  if (action.type === actions.REMOVE_FAVORITE_CHANNEL) {
    let currentFavChannels = JSON.parse(JSON.stringify(state.user.favoriteChannels));
    let index = currentFavChannels.indexOf(action.channel);
    currentFavChannels.splice(index, 1);
    const newAppState = update(state, {user: {favoriteChannels: {$set: currentFavChannels}}});
    return newAppState;
  }
  // Toggle Sidebar Menu
  if (action.type === actions.TOGGLE_SIDEBAR) {
    let showMenu = state.showMenu;
    const newAppState = update(state, {showMenu: {$set: !showMenu}});
    return newAppState;
  }
  return state;
};
