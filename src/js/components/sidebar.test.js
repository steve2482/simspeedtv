import React from 'react';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import {Link} from 'react-router';

chai.use(chaiEnzyme());

import {Sidebar} from './sidebar';

describe('<Sidebar />', () => {
  let state = {
    channelNames: [],
    liveBroadcasts: [],
    channelVideos: [],
    nextPageToken: null,
    user: '',
    errors: null
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Sidebar state={state} />);
  });

  it('Renders without crashing', () => {
    shallow(<Sidebar state={state}/>);
  });

  it('Should render channel list only when guest user', () => {
    expect(wrapper.children('.sidebar').children()).to.have.length(3);
  });

  it('Should render channel list and favorites list when user is signed in', ()=> {
    state = {
      channelNames: [],
      liveBroadcasts: [],
      channelVideos: [],
      nextPageToken: null,
      user: {
        userName: 'user',
        favoriteChannels: ['Favorite Channel']
      },
      errors: null      
    };
    wrapper = shallow(<Sidebar state={state}/>);
    expect(wrapper.children('.sidebar').children()).to.have.length(5);
    expect(wrapper.find('li')).to.have.length(1);
  });
});
