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
      "Content-Type": "application/json"
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
export const registerNewUser = newUser => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/register';
  const payload = JSON.stringify(newUser);
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json"
    }
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
  .catch(error => console.log(error));
};

// LogIn User Server Request
export const userLogIn = user => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/login';
  const payload = JSON.stringify(user);
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json"
    }
  });
  return fetch(request)
  .then(response => {
    console.log(response);
    if (!response.ok) {
      const error = new Error('Something when wrong during user login.');
      console.log(error);
    }
    return response;
  })
  .then(response => response.json())
  .then(response => {
    dispatch(setUser(response));
  })
  .catch(error => console.log(error));
};
