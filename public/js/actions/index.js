// Fetch Channel Names List Action
export const FETCH_CHANNEL_NAMES = 'FETCH_CHANNEL_NAMES';
export const fetchChannelNames = names => ({
  type: FETCH_CHANNEL_NAMES,
  names
});

// Get Channel Names List for Sidebar
export const getChannelNames = () => dispatch => {
  const url = 'http://localhost:3000/channel-names';
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
  const url = 'http://localhost:3000/live';
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

// Get Channel Videos for Channel Page
export const getChannelBroadcasts = (channelName) => dispatch => {
  const url = 'http://localhost:3000/channel-videos';
  const request = new Request(url, {
    method: 'POST',
    body: channelName,
    headers: new Headers()
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
    dispatch(fetchChannelBroadcasts(data));
  })
  .catch(error => console.log(error));
}