import React from 'react';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import {Link} from 'react-router';

chai.use(chaiEnzyme());

import {SignIn} from './sign-in';

describe('<SignIn />', () => {
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
    wrapper = shallow(<SignIn state={state} />);
  });

  it('Renders without crashing', () => {
    shallow(<SignIn state={state}/>);
  });

  it('Should render without errors', () => {
    expect(wrapper.children()).to.have.length(1);
  });

  it('Should render with errors if errors exist', () => {
    state.errors = ['error 1', 'error 2'];
    wrapper = shallow(<SignIn state={state} />);
    expect(wrapper.children()).to.have.length(3);
  })
});
