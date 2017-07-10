import React from 'react';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import {Link} from 'react-router';

chai.use(chaiEnzyme());

import {LiveResults} from './live-results';

describe('<LiveResults />', () => {
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
    wrapper = shallow(<LiveResults state={state} />);
  });

  it('Should render without crashing', () => {
    shallow(<LiveResults state={state}/>);
  });

  it('Should render message of no current live results if none', () => {
    expect(wrapper.children()).to.have.length(2);
    expect(wrapper.children('.text-box').children()).to.have.length(4);
    expect(wrapper.find('.message').text()).to.equal('There are currently no races being broadcast live. Live broadcasts typically occur nights and weekends. Choose a channel from the channel guide to see previously broadcast races.');
  });

  it('Should render message to choose a live broadcast and render broadcasts when live results exist', () => {
    state.liveBroadcasts = [{items: ['broadcast 1']}, {items: ['broadcast 2']}];
    wrapper = shallow(<LiveResults state={state}/>);
    expect(wrapper.find('.video-container').children()).to.have.length(2);
    expect(wrapper.find('.message').text()).to.equal('Watch a live broadcast or choose your favorite channel from the channel guide to view past broadcasts.');
  });
});
