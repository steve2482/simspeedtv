import React from 'react';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import {Link} from 'react-router';

chai.use(chaiEnzyme());

import {Navbar} from './navbar';

describe('<Navbar />', () => {
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
    wrapper = shallow(<Navbar state={state} />);
  });

  it('Renders without crashing', () => {
    shallow(<Navbar state={state}/>);
  });

  it('Should render sign-in and register buttons when guest', () => {
    expect(wrapper.find('.nav-buttons').children()).to.have.length(2);
  });

  it('Should render logout button when user is signed in', () => {
    state.user = {
      userName: 'userName',
      favoriteChannels: []
    };
    wrapper = shallow(<Navbar state={state}/>);
    expect(wrapper.find('.nav-buttons').children()).to.have.length(1);
  });
});