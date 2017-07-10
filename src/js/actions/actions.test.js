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
  getChannelBroadcasts,
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
  it('Should dispatch fetchChannelNames', () => {
    const names = [{}];

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json() {
          return names;
        }
      });
    });

    const dispatch = jest.fn();
    return getChannelNames()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(process.env.REACT_APP_ROOT_URL + '/channel-names', {credentials: 'include'});
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
      return Promise.resolve({
        ok: true,
        json() {
          return broadcasts;
        }
      });
    });

    const dispatch = jest.fn();
    return getLiveBroadcasts()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(process.env.REACT_APP_ROOT_URL + '/live', {credentials: 'include'});
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
describe('getChannelBroadcasts', () => {
  it('Should dispatch fetchChannelBroadcasts and setNextPageToken', () => {
    const data = {
      items: ['broadcasts'],
      nextPageToken: 'page token'
    };

    const url = process.env.REACT_APP_ROOT_URL + '/channel-videos';
    const request = new Request(url, {
      method: 'POST',
      body: '{}',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json() {
          return data;
        }
      });
    });

    const dispatch= jest.fn();
    return getChannelBroadcasts()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(request);
      expect(dispatch).toHaveBeenCalledWith(fetchChannelBroadcasts(data.items));
      expect(dispatch).toHaveBeenCalledWith(setNextPageToken(data.nextPageToken));
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
  it('Should dispatch setUser', () => {
    const user = 'newUser';

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json() {
          return user;
        }
      });
    });

    const url = process.env.REACT_APP_ROOT_URL + '/register';
    const request = new Request(url, {
      method: 'POST',
      body: undefined,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    });

    const dispatch= jest.fn();
    return registerNewUser()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(request);
      expect(dispatch).toHaveBeenCalledWith(setUser(user));
    });
  });
});

// ==========================================================================
describe('registerNewUser error', () => {
  xit('Should dispatch setErrors', () => {
    const errors = ['errors'];

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
        json() {
          return errors;
        }
      });
    });

    const url = process.env.REACT_APP_ROOT_URL + '/register';
    const request = new Request(url, {
      method: 'POST',
      body: undefined,
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    });

    const dispatch= jest.fn();
    return registerNewUser()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(request);
      expect(dispatch).toHaveBeenCalledWith(setErrors(errors));
    });
  });
});

// ==========================================================================
describe('userLogIn success', () => {
  xit('Should dispatch setUser', () => {
    const user = 'user';

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json() {
          return user;
        }
      });
    });

    const url = process.env.REACT_APP_ROOT_URL + '/login';
    const request = new Request(url, {
      method: 'POST',
      body: undefined,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });

    const dispatch= jest.fn();
    return userLogIn()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(request);
      expect(dispatch).toHaveBeenCalledWith(setUser(user));
    });
  });
});

// ==========================================================================
describe('userLogIn error', () => {
  xit('Should dispatch setErrors', () => {
    const errors = ['errors'];

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json() {
          return errors;
        }
      });
    });

    const url = process.env.REACT_APP_ROOT_URL + '/login';
    const request = new Request(url, {
      method: 'POST',
      body: undefined,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });

    const dispatch= jest.fn();
    return userLogIn()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(request);
      expect(dispatch).toHaveBeenCalledWith(setErrors(errors));
    });
  });
});

// ==========================================================================
describe('logoutUser', () => {
  it('Should dispatch setUser', () => {
    const user = null;

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json() {
          return user;
        }
      });
    });

    const url = process.env.REACT_APP_ROOT_URL + '/logout'; 
    const request = new Request(url, {
      credentials: 'include'
    }) ;

    const dispatch= jest.fn();
    return logoutUser()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(request);
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
  it('Should dispatch addFavoriteChanneToState', () => {
    const channel = 'channel';

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json() {
          return channel;
        }
      });
    });

    const url = process.env.REACT_APP_ROOT_URL + '/favorite-channel';
    const request = new Request(url, {
      method: 'POST',
      body: '{}',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    });

    const dispatch= jest.fn();
    return addFavoriteChannel()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(request);
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
  it('Should dispatch removeFavoriteChannel', () => {
    const channel = 'channel';

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json() {
          return channel;
        }
      });
    });

    const url = process.env.REACT_APP_ROOT_URL + '/remove-channel';
    const request = new Request(url, {
      method: 'POST',
      body: '{}',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    });

    const dispatch= jest.fn();
    return unFavoriteChannel()(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(request);
      expect(dispatch).toHaveBeenCalledWith(removeFavoriteChannel(channel));
    });
  });
});

