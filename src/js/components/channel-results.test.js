import React from 'react';
import {shallow, mount} from 'enzyme';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

import {ChannelResults} from './channel-results';

describe('<ChannelResults />', () => {
  let props = {
    match: {
      params: {
        channelName: 'name'
      }  
    },
    state: {
      channelNames: [],
      liveBroadcasts: [],
      channelVideos: [],
      nextPageToken: null,
      user: '',
      errors: null
    }
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ChannelResults {...props} />);
  });

  it('Renders without crashing', () => {
    shallow(<ChannelResults {...props}/>);
  });

  it('Should render without favorite button for a guest user', () => {
    expect(wrapper.find('#favorite')).to.not.exist;
  });

  it('Should render the unfavorite button if channel is in user favorites', () => {
    props.state.user = {
      userName: 'userName',
      favoriteChannels: ['channel']
    };
    props.match.params.channelName = 'channel';
    wrapper = shallow(<ChannelResults {...props} />);
    expect(wrapper.childAt(2)).to.contain.text('Unfavorite');
  });

  it('Should render the favorite button if not in user favorites', () => {
    props.state.user = {
      userName: 'userName',
      favoriteChannels: []
    };
    wrapper = shallow(<ChannelResults {...props} />);
    expect(wrapper.childAt(2)).to.contain.text('Favorite');
  });
});