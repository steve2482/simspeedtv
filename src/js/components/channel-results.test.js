import React from 'react';
import {shallow, mount} from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

import {ChannelResults} from './channel-results';

describe('<ChannelResults />', () => {
  it('Renders without crashing', () => {
    shallow(<ChannelResults />);
  });
});