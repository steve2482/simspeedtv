// Fetch Channel Names List Action
export const FETCH_CHANNEL_NAMES = 'FETCH_CHANNEL_NAMES';
export const fetchChannelNames = names => ({
  type: FETCH_CHANNEL_NAMES,
  names
});

// Get Channel Names List for Sidebar
export const getChannelNames = () => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/channel-names';
  return fetch(url).then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while fetching channel names');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    dispatch(fetchChannelNames(data));
  })
  .catch(error => console.log(error));
};

// Fetch Live Broadcasts Action
export const FETCH_LIVE_BROADCASTS = 'FETCH_LIVE_BROADCASTS';
export const fetchLiveBroadcasts = broadcasts => ({
  type: FETCH_LIVE_BROADCASTS,
  broadcasts
});

// Get Current Live Broadcasts for Live Page
export const getLiveBroadcasts = () => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/live';
  return fetch(url).then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while fetching live broadcast');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(data => {
    dispatch(fetchLiveBroadcasts(data));
  })
  .catch(error => console.log(error));
}

// Fetch Channel Broadcasts
export const FETCH_CHANNEL_BROADCASTS = 'FETCH_CHANNEL_BROADCASTS';
export const fetchChannelBroadcasts = broadcasts => ({
  type: FETCH_CHANNEL_BROADCASTS,
  broadcasts
});

// Set nextPageToken
export const SET_NEXT_PAGE_TOKEN = 'SET_NEXT_PAGE_TOKEN';
export const setNextPageToken = nextPageToken => ({
  type: SET_NEXT_PAGE_TOKEN,
  nextPageToken
});

// Get Channel Videos for Channel Page
export const getChannelBroadcasts = (channelName, nextPageToken) => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/channel-videos';
  const payload = JSON.stringify({
    channelName: channelName,
    nextPageToken: nextPageToken
  });
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json",
    }
  });
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while fetching channel videos');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(data => {
    dispatch(setNextPageToken(data.nextPageToken));
    dispatch(fetchChannelBroadcasts(data.items));
  })
  .catch(error => console.log(error));
};

// Set User
export const SET_USER = 'SET_USER';
export const setUser = userName => ({
  type: SET_USER,
  userName
});

// Register User Server Request
export const registerNewUser = (newUser, history) => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/register';
  const payload = JSON.stringify(newUser);
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  });
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while registering user.');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(response => {
    dispatch(setUser(response));
  })
  .then(() => {
    history.push('/');
  })
  .catch(error => console.log(error));  
};

// LogIn User Server Request
export const userLogIn = (user, history) => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/login';
  const payload = JSON.stringify(user);
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  });
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong during user login.');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(response => {
    dispatch(setUser(response));
  })
  .then(() => {
    history.push('/');
  })
  .catch(error => console.log(error));
};

// Logout User
export const logoutUser = () => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/logout'; 
  const request = new Request(url, {
    credentials: 'include'
  }) ;
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong during user logout');
      console.log(error);
    }
    return response;
  })
  .then(() => {
    dispatch(setUser(''));
  })
  .catch(error => console.log(error));
};

// Add Favorite Channel to State
export const ADD_FAVORITE_CHANNEL = 'ADD_FAVORITE_CHANNEL';
export const addFavoriteChannelToState = channel => ({
  type: ADD_FAVORITE_CHANNEL,
  channel
});

// Favorite a Channel
export const addFavoriteChannel = (user, channel) => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/favorite-channel';
  const data = {
    userName: user,
    channel: channel
  };
  const payload = JSON.stringify(data);
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  });
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while favoriting a channel');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(response => {
    console.log(response);
    dispatch(addFavoriteChannelToState(response));
  })
  .catch(error => console.log(error));
};

// Remove Favorite Channel
export const REMOVE_FAVORITE_CHANNEL = 'REMOVE_FAVORITE_CHANNEL';
export const removeFavoriteChannel = channel => ({
  type: REMOVE_FAVORITE_CHANNEL,
  channel
});

// Call Server to Remove Favorite Channel
export const unFavoriteChannel = (user, channel) => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/remove-channel';
  const data = {
    userName: user,
    channel: channel
  };
  const payload = JSON.stringify(data);
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  });
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while favoriting a channel');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(response => {
    console.log(response);
    dispatch(removeFavoriteChannel(response));
  })
  .catch(error => console.log(error));
};
