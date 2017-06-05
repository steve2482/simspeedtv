import React from 'react';
import {shallow, mount} from 'enzyme';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

import {ChannelResults} from './channel-results';

describe('<ChannelResults />', () => {
  let state = {
    channelNames: [],
    liveBroadcasts: [],
    channelVideos: [],
    nextPageToken: null,
    user: '',
    errors: null 
  }
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ChannelResults state={state} />);
  });

  it('Renders without crashing', () => {
    shallow(<ChannelResults />);
  });
});