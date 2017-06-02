import React from 'react';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';
import {Link} from 'react-router';

chai.use(chaiEnzyme());

const Channel = ({ channel }) => {
  // If Favorite Channels List
  if (channel.favorites === undefined) {
    return (
      <div>
        <strong>
          <Link to={'/channels/' + channel.name} className='favoriteChannelName'>
            {channel.name}
          </Link>
        </strong>
      </div>
    );
  }
  // If Channel List
  else {
    return (
      <div>
        <strong>
          <Link to={'/channels/' + channel.name} className='channelName'>
            {channel.name}
          </Link>
        </strong>
        <p className='favorite-count'>({channel.favorites})</p>
      </div>
    );
  };
};  

describe('<Channel />', () => {
  let wrapper = null;
  let props = null;

  beforeEach(() => {
    props = {
      channel: {
        name: 'channel name',
        favorites: 2
      }
    };
    wrapper = shallow(<Channel {...props}/>);
  });

  it('Renders without crashing', () => {
    shallow(<Channel {...props}/>);
  });

  it('Displays the channel name and favorites', () => {
    expect(wrapper.find('.channelName').text()).to.equal('channel name');
    expect(wrapper.find('.favorite-count').text()).to.equal('(2)');
  });
});

describe('<Channel />', () => {
  let wrapper = null;
  let props = null;

  beforeEach(() => {
    props = {
      channel: {
        name: 'channel name',
        favorites: undefined
      }
    };
    wrapper = shallow(<Channel {...props}/>);
  });

  it('Renders without crashing', () => {
    shallow(<Channel {...props}/>);
  });

  it('Displays the channel name and favorites', () => {
    expect(wrapper.find('.favoriteChannelName').text()).to.equal('channel name');
    expect(wrapper).to.not.contain(<p className='favorite-count'></p>);
  });
});
