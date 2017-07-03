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
  addFavoriteChannelToState,
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
  xit('Should dispatch fetchChannelNames', () => {
    const names = [{}];

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
  xit('Should dispatch fetchLiveBroadcasts', () => {
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
  xit('Should dispatch fetchChannelBroadcasts and setNextPageToken', () => {
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
describe('setUser', () => {
  it('Should return the action', () => {
    const userName = 'userName';
    const action = setUser(userName);
    expect(action.type).toEqual(SET_USER);
    expect(action.userName).toEqual(userName);
  });
});

// ==========================================================================
describe('setErrors', () => {
  it('Should return the action', () => {
    const errors = ['errors'];
    const action = setErrors(errors);
    expect(action.type).toEqual(SET_ERRORS);
    expect(action.errors).toEqual(errors);
  });
});

// ==========================================================================
describe('registerNewUser success', () => {
  xit('Should dispatch setUser', () => {
    const user = 'newUser';

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json() {
          return user;
        }
      });
    });

    const dispatch= jest.fn();
    return registerNewUser()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith('/register');
      expect(dispatch).toHaveBeenCalledWith(setUser(user));
    });
  });
});

// ==========================================================================
describe('registerNewUser error', () => {
  xit('Should dispatch setErrors', () => {
    const errors = ['errors'];

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: false,
        json() {
          return errors;
        }
      });
    });

    const dispatch= jest.fn();
    return registerNewUser()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith('/register');
      expect(dispatch).toHaveBeenCalledWith(setErrors(errors));
    });
  });
});

// ==========================================================================
describe('userLogIn success', () => {
  xit('Should dispatch setUser', () => {
    const user = 'user';

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json() {
          return user;
        }
      });
    });

    const dispatch= jest.fn();
    return userLogIn()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith('/login');
      expect(dispatch).toHaveBeenCalledWith(setUser(user));
    });
  });
});

// ==========================================================================
describe('userLogIn error', () => {
  xit('Should dispatch setErrors', () => {
    const errors = ['errors'];

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json() {
          return user;
        }
      });
    });

    const dispatch= jest.fn();
    return userLogIn()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith('/register');
      expect(dispatch).toHaveBeenCalledWith(setErrors(errors));
    });
  });
});

// ==========================================================================
describe('logoutUser', () => {
  xit('Should dispatch setUser', () => {
    const user = 'user';

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json() {
          return user;
        }
      });
    });

    const dispatch= jest.fn();
    return logoutUser()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith('/logout');
      expect(dispatch).toHaveBeenCalledWith(setUser(user));
    });
  });
});

// ==========================================================================
describe('addFavoriteChanneToState', () => {
  it('Should return the action', () => {
    const channel = 'channel';
    const action = addFavoriteChannelToState(channel);
    expect(action.type).toEqual(ADD_FAVORITE_CHANNEL);
    expect(action.channel).toEqual(channel);
  });
});

// ==========================================================================
describe('addFavoriteChannel', () => {
  xit('Should dispatch addFavoriteChanneToState', () => {
    const channel = 'channel';

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json() {
          return channel;
        }
      });
    });

    const dispatch= jest.fn();
    return addFavoriteChannel()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith('/favorite-channel');
      expect(dispatch).toHaveBeenCalledWith(addFavoriteChannelToState(channel));
    });
  });
});

// ==========================================================================
describe('removeFavoriteChannel', () => {
  it('Should return the action', () => {
    const channel = 'channel';
    const action = removeFavoriteChannel(channel);
    expect(action.type).toEqual(REMOVE_FAVORITE_CHANNEL);
    expect(action.channel).toEqual(channel);
  });
});

// ==========================================================================
describe('unFavoriteChannel', () => {
  xit('Should dispatch removeFavoriteChannel', () => {
    const channel = 'channel';

    global.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({
        ok: true,
        json() {
          return channel;
        }
      });
    });

    const dispatch= jest.fn();
    return unFavoriteChannel()(dispatch).then(() => {
      expect(dispatch).toHaveBeenCalledWith('/favorite-channel');
      expect(dispatch).toHaveBeenCalledWith(removeFavoriteChannel(channel));
    });
  });
});

