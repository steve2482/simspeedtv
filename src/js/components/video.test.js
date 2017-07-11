import React from 'react';
import chai from 'chai';
import {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import {mount, render, shallow} from 'enzyme';

chai.use(chaiEnzyme());

const Video = ({ video }) => 
  <div id='video-info'>
    <iframe id='video-thumbnail' width='320' height='180' src='https://static.pexels.com/photos/24353/pexels-photo.jpg' frameBorder='0' allowFullScreen />
    <h4 id='channel-title'>{video.channelTitle}</h4>
    <p id='video-title'>{video.title}</p>
  </div>;

describe('<Video />', () => {
  let wrapper = null;
  let props = null;

  beforeEach(() => {
    props = {
      video: {
        channelTitle: 'channel title',
        title: 'video title'
      }
    };
    wrapper = shallow(<Video {...props} />);
  });

  it('Renders without crashing', () => {
    shallow(<Video {...props}/>);
  });

  it('Displays the video thumbnail, channel name, and video title', () => {
    expect(wrapper.find('#video-info').children()).to.have.length(3);
    expect(wrapper.find('#channel-title').text()).to.equal('channel title');
    expect(wrapper.find('#video-title').text()).to.equal('video title');
  }) 
})