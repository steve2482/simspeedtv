import {
  FETCH_CHANNEL_NAMES,
  fetchChannelNames,
  getChannelNames,
  FETCH_LIVE_BROADCASTS,
  fetchLiveBroadcasts,
  getLiveBroadcasts,
  FETCH_CHANNEL_BROADCASTS,
  fetchChannelBroadcasts,
  SET_NEXT_PAGE_TOKEN,
  setNextPageToken,
  getChanneBroadcasts,
  SET_USER,
  setUser,
  SET_ERRORS,
  setErrors,
  registerNewUser,
  userLogIn,
  logoutUser,
  ADD_FAVORITE_CHANNEL,
  addFavoriteChanneToState,
  addFavoriteChannel,
  REMOVE_FAVORITE_CHANNEL,
  removeFavoriteChannel,
  unFavoriteChannel,
} from './actions';

describe('fetchChannelNames', () => {
  it('Should return the action', () => {
    const names = ['name 1', 'name 2'];
    const action = fetchChannelNames(names);
    expect(action.type).toEqual(FETCH_CHANNEL_NAMES);
    expect(action.names).toEqual(names);
  });
});

// ==========================================================================
describe('getChannelNames', () => {
  it('Should dispatch fetchChannelNames', () => {
    const names = ['name 1'];

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json() {
          return names;
        }
      });
    });

    const dispatch = jest.fn();
    return getChannelNames()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith('/channel-names');
      expect(dispatch).toHaveBeenCalledWith(fetchChannelNames(names));
    });
  });
});

// ==========================================================================
describe('fetchLiveBroadcasts', () => {
  it('Should return the action', () => {
    const broadcasts = ['broadcasts'];
    const action = fetchLiveBroadcasts(broadcasts);
    expect(action.type).toEqual(FETCH_LIVE_BROADCASTS);
    expect(action.broadcasts).toEqual(broadcasts);
  });
});

// ==========================================================================
describe('getLiveBroadcasts', () => {
  it('Should dispatch fetchLiveBroadcasts', () => {
    const broadcasts = ['broadcast'];

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json() {
          return broadcasts;
        }
      });
    });

    const dispatch = jest.fn();
    return getLiveBroadcasts()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith('/live');
      expect(dispatch).toHaveBeenCalledWith(fetchLiveBroadcasts(broadcasts));
    });
  });
});

// ==========================================================================
describe('fetchChannelBroadcasts', () => {
  it('Should return the action', () => {
    const broadcasts = ['broadcasts'];
    const action = fetchChannelBroadcasts(broadcasts);
    expect(action.type).toEqual(FETCH_CHANNEL_BROADCASTS);
    expect(action.broadcasts).toEqual(broadcasts);
  });
});

// ==========================================================================
describe('setNextPageToken', () => {
  it('Should return the action', () => {
    const nextPageToken = 'nextPageToken';
    const action = setNextPageToken(nextPageToken);
    expect(action.type).toEqual(SET_NEXT_PAGE_TOKEN);
    expect(action.nextPageToken).toEqual(nextPageToken);
  });
});

// ==========================================================================
describe('getChanneBroadcasts', () => {
  it('Should dispatch fetchChannelBroadcasts and setNextPageToken', () => {
    const data = {
      broadcasts: [broadcasts],
      pageToken: 'page token'
    };

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json() {
          return data;
        }
      });
    });

    const dispatch= jest.fn();
    return getChanneBroadcasts()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith('/channel-videos');
      expect(dispatch).toHaveBeenCalledWith(fetchChannelBroadcasts(data.broadcasts));
      expect(dispatch).toHaveBeenCalledWith(setNextPageToken(data.pageToken));
    });
  });
});

// ==========================================================================
