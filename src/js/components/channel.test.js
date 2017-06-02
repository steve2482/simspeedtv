import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import {Link} from 'react-router';

chai.use(chaiEnzyme());

import Channel from './channel';

describe('<Channel />', () => {
  it('Renders without crashing', () => {
    shallow(<Channel />);
  });

  it('Displays the channel name')
  it('Displays the channel favorites')
});