import {simSpeedReducer} from './reducers';
import {
  fetchChannelNames,
  fetchLiveBroadcasts,
  fetchChannelBroadcasts,
  setNextPageToken,
  setUser,
  setErrors,
  addFavoriteChannelToState,
  removeFavoriteChannel,
} from '../actions/actions';

describe('simSpeedReducer', () => {
  // Set up some dummy data
  const channelName = 'channel 1';
  const channelName2 = 'channel 2';
  const broadcast = 'broadcast 1';
  const broadcast2 = 'broadcast 2';
  const pageToken = 'pageToken';
  const user = 'user';
  const error = ['error'];
  const channelNames = [channelName, channelName2];
  const broadcasts = [broadcast, broadcast2];

  it('Should set the initial state when nothing is passed in', () => {
    const state = simSpeedReducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual({
      channelNames: [],
      upcomingBroadcasts: [],
      liveBroadcasts: [],
      channelVideos: [],
      nextPageToken: null,
      user: '',
      errors: null,
      showMenu: false
    });
  });

  it('Should return the current state on unknown action', () => {
    let currentState = {};
    const state = simSpeedReducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  describe('fetchChannelNames', () => {
    it('Should add channel names', () => {
      let state;
      state = simSpeedReducer(state, fetchChannelNames(channelNames));
      expect(state).toEqual({
        channelNames: ['channel 1', 'channel 2'],
        upcomingBroadcasts: [],
        liveBroadcasts: [],
        channelVideos: [],
        nextPageToken: null,
        user: '',
        errors: null,
        showMenu: false
      });
    });
  });

  describe('fetchLiveBroadcasts', () => {
    it('Should add live broadcasts', () => {
      let state;
      state = simSpeedReducer(state, fetchLiveBroadcasts(broadcasts));
      expect(state).toEqual({
        channelNames: [],
        upcomingBroadcasts: [],
        liveBroadcasts: ['broadcast 1', 'broadcast 2'],
        channelVideos: [],
        nextPageToken: null,
        user: '',
        errors: null,
        showMenu: false
      });
    });
  });

  describe('fetchChannelBroadcasts', () => {
    it('Should add channel broadcasts', () => {
      let state;
      state = simSpeedReducer(state, fetchChannelBroadcasts(broadcasts));
      expect(state).toEqual({
        channelNames: [],
        upcomingBroadcasts: [],
        liveBroadcasts: [],
        channelVideos: ['broadcast 1', 'broadcast 2'],
        nextPageToken: null,
        user: '',
        errors: null,
        showMenu: false
      });
    });
  });

  describe('setNextPageToken', () => {
    it('Should set the next page token', () => {
      let state;
      state = simSpeedReducer(state, setNextPageToken(pageToken));
      expect(state).toEqual({
        channelNames: [],
        upcomingBroadcasts: [],
        liveBroadcasts: [],
        channelVideos: [],
        nextPageToken: pageToken,
        user: '',
        errors: null,
        showMenu: false
      });
    });
  });

  describe('setUser', () => {
    it('Should set the registered or signed in user', () => {
      let state;
      state = simSpeedReducer(state, setUser(user));
      expect(state).toEqual({
        channelNames: [],
        upcomingBroadcasts: [],
        liveBroadcasts: [],
        channelVideos: [],
        nextPageToken: null,
        user: 'user',
        errors: null,
        showMenu: false
      });
    });
  });

  describe('setErrors', () => {
    it('Should set errors', () => {
      let state;
      state = simSpeedReducer(state, setErrors(error));
      expect(state).toEqual({
        channelNames: [],
        upcomingBroadcasts: [],
        liveBroadcasts: [],
        channelVideos: [],
        nextPageToken: null,
        user: '',
        errors: ['error'],
        showMenu: false
      });
    });
  });

  describe('addFavoriteChanneltoState', () => {
    it('Should add a favorite channel', () => {
      let state = {
        channelNames: [],
        liveBroadcasts: [],
        channelVideos: [],
        nextPageToken: null,
        user: {
          userName: 'userName',
          favoriteChannels: []
        },
        errors: null,
        showMenu: false
      };
      state = simSpeedReducer(state, addFavoriteChannelToState(channelName));
      state = simSpeedReducer(state, addFavoriteChannelToState(channelName2));
      expect(state).toEqual({
        channelNames: [],
        liveBroadcasts: [],
        channelVideos: [],
        nextPageToken: null,
        user: {
          userName: 'userName',
          favoriteChannels: ['channel 1', 'channel 2']
        },
        errors: null,
        showMenu: false
      });
    });
  });

  describe('removeFavoriteChannel', () => {
    it('Should remove a favorite channel', () => {
      let state = {
        channelNames: [],
        liveBroadcasts: [],
        channelVideos: [],
        nextPageToken: null,
        user: {
          userName: 'userName',
          favoriteChannels: ['channel 1', 'channel 2']
        },
        errors: null,
        showMenu: false
      };
      state = simSpeedReducer(state, removeFavoriteChannel(channelName));
      expect(state).toEqual({
        channelNames: [],
        liveBroadcasts: [],
        channelVideos: [],
        nextPageToken: null,
        user: {
          userName: 'userName',
          favoriteChannels: ['channel 2']
        },
        errors: null,
        showMenu: false
      });
    });
  });
});