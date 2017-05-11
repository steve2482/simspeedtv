export const FETCH_CHANNEL_NAMES = 'FETCH_CHANNEL_NAMES';
export const fetchChannelNames = names => ({
  type: FETCH_CHANNEL_NAMES,
  names
});

export const getChannelNames = () => dispatch => {
  const url = 'http://localhost:3000/channel-names';
  return fetch(url).then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while fetching channel names');
      console.log(error);
    }
    console.log(response);
    return response;
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    dispatch(fetchChannelNames(data));
  })
  .catch(error => console.log(error));
};
