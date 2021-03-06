// Fetch Channel Names List Action
export const FETCH_CHANNEL_NAMES = 'FETCH_CHANNEL_NAMES';
export const fetchChannelNames = names => ({
  type: FETCH_CHANNEL_NAMES,
  names
});

// Get Channel Names List for Sidebar
export const getChannelNames = () => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/channel-names';
  return fetch(url, {
    credentials: 'include'})
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while fetching channel names');
      console.log(error);
    }
    return response.json();
  })
  .then(data => {
    dispatch(fetchChannelNames(data));
  })
  .catch(error => console.log(error));
};

// Fetch Upcoming Broadcasts
export const FETCH_UPCOMING_BROADCASTS = 'FETCH_UPCOMING_BROADCASTS';
export const fetchUpcomingBroadcasts = broadcasts => ({
  type: FETCH_UPCOMING_BROADCASTS,
  broadcasts
});

// Get Upcoming Broadcasts
export const getUpcomingBroadcasts = () => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/upcoming';
  return fetch(url, {
    credentials: 'include'})
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while fetching upcoming broadcast');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(data => {
    dispatch(fetchUpcomingBroadcasts(data));
  })
  .catch(error => console.log(error));
};

// Fetch Live Broadcasts
export const FETCH_LIVE_BROADCASTS = 'FETCH_LIVE_BROADCASTS';
export const fetchLiveBroadcasts = broadcasts => ({
  type: FETCH_LIVE_BROADCASTS,
  broadcasts
});

// Get Current Live Broadcasts for Live Page
export const getLiveBroadcasts = () => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/live';
  return fetch(url, {
    credentials: 'include'})
  .then(response => {
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
};

// Fetch Channel Name
export const FETCH_CHANNEL_NAME = 'FETCH_CHANNEL_NAME';
export const fetchChannelName = channelName => ({
  type: FETCH_CHANNEL_NAME,
  channelName
});

// Fetch Channel Banner
export const FETCH_CHANNEL_BANNER = 'FETCH_CHANNEL_BANNER';
export const fetchChannelBanner = banner => ({
  type: FETCH_CHANNEL_BANNER,
  banner
});

// Get Channel Info/Banner
export const getChannelInfo = (channelName) => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/channel-data';
  const payload = JSON.stringify({
    channelName: channelName
  });
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
      const error = new Error('Something went wrong while fetching channel data');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.banner);
    dispatch(fetchChannelName(data.channelName));
    dispatch(fetchChannelBanner(data.channelBanner));
  })
  .catch(error => console.log(error));
};

// Fetch Upcoming Channel Broadcasts
export const FETCH_UPCOMING_CHANNEL_BROADCASTS = 'FETCH_UPCOMING_CHANNEL_BROADCASTS';
export const fetchUpcomingChannelBroadcasts = broadcasts => ({
  type: FETCH_UPCOMING_CHANNEL_BROADCASTS,
  broadcasts
});

// Get Upcoming Channel Broadcasts for Channel Page
export const getUpcomingChannelBroadcasts = (channelName) => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/channel-upcoming';
  const payload = JSON.stringify({
    channelName: channelName
  });
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
      const error = new Error('Something went wrong while fetching upcoming channel videos');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(data => {
    dispatch(fetchUpcomingChannelBroadcasts(data));
  })
  .catch(error => console.log(error));
};

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
    },
    credentials: 'include'
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

export const SET_ERRORS = 'SET_ERRORS';
export const setErrors = errors => ({
  type: SET_ERRORS,
  errors
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
      response.json()
      .then(response => {
        dispatch(setErrors(response));
      });      
    }
    return response.json();
  })
  .then(response => {
    dispatch(setUser(response));
  })
  .then(() => history.push('/'))
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
      response.json()
      .then(response => {
        dispatch(setErrors(response));
      });
    }
    else {
      response.json()
      .then(response => {
        dispatch(setUser(response));
      })
      .then(() => {
        history.push('/');
      });      
    }
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
    dispatch(setUser(null));
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
    dispatch(removeFavoriteChannel(response));
  })
  .catch(error => console.log(error));
};

// Toggle Sidebar Menu
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
});
