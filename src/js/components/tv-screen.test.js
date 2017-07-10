import React from 'react';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import {Link} from 'react-router';

chai.use(chaiEnzyme());

import TVScreen from './tv-screen';

describe('<TVScreen />', () => {
  let props = {
    match: {
      params: {
        videoId: 'WDqSKEj8CzM&t=16276s'
      }
    }
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TVScreen {...props} />);
  });

  it('Renders without crashing', () => {
    shallow(<TVScreen {...props}/>);
  });

  it('Renders the video screen and surounding boder', () => {
    expect(wrapper.children()).to.have.length(1);
    expect(wrapper.children().children()).to.have.length(1);
  });
});