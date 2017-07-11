import React from 'react';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';

chai.use(chaiEnzyme());

const ErrorComponent = ({ error }) => <p>{error.message}</p>;

describe('<ErrorComponent />', () => {
  let wrapper = null;
  let props = null;

  beforeEach(() => {
    props = {
      error: {
        message: 'error message'
      }
    };
    wrapper = shallow(<ErrorComponent {...props}/>);
  });

  it('Renders without crashing', () => {
    shallow(<ErrorComponent {...props}/>);
  });

  it('Displays the error message', () => {
    expect(wrapper.text()).to.equal('error message');
  })
})
