import React from 'react';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import {Link} from 'react-router';

chai.use(chaiEnzyme());

import App from './app';

describe('<App />', () => {
  it('Renders without crashing', () => {
    shallow(<App />);
  });
});