import React, { Component } from 'react';
import { isNil } from 'lodash';
import { NoDragImage } from 'AppComponents';

class LiveTidBit extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      countdown: Math.ceil(this.props.data.expires_at - (Date.now()/1000)),
    }
    this.startTimer = setInterval(() => {
        this.decrementCountdown(this.state.countdown)
      },
      1000
    );
  }

  componentDidMount() {
    this.startTimer;
  }

  componentWillUnmount() {
    clearInterval(this.startTimer);
  }

  decrementCountdown(time) {
    if (time <= 0) {
      clearInterval(this.startTimer);
      // Action to delete live tidbit and dequeue from list can be called here.
      return;
    }

    this.setState({
      countdown: this.state.countdown - 1,
    });
  }

  formatCountdown = (time) => {
    if (time <= 0) return '00:00:00';

    let seconds = time % 60
    time -= seconds
    let minutes = (time % (60 * 60)) / 60
    time -= minutes * 60
    let hours = time / (60 * 60)
    let secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    let minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    let hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  };

  render() {
    const { data } = this.props;
    let formattedCountdown = this.formatCountdown(this.state.countdown);
    if (isNil(data.postData)) {
      return (
        <div className='tidbitpost-container'>
          <div className='tidbitpost-img-container'>
            <div className='tidbitpost-img-notfound'>Image Not Found</div>
          </div>
          <div className='tidbitpost-txt-container'>
            <p className='tidbitpost-txt'>Tidbit Not Found</p>
          </div>
        </div>
      )
    }

    return (
      <div className='tidbitpost-container live-tidbit'>
        <div className='tidbitpost-img-container'>
          <NoDragImage className='tidbitpost-img' src={data.postData.thumbnailImagePath}></NoDragImage>
        </div>
        <div className='tidbitpost-txt-container'>
          <p className='tidbitpost-txt'>{data.postData.postTitle}</p>
        </div>
        <div className='tidbitpost-timer'>{formattedCountdown}</div>
      </div>
    )
  }
}

export default LiveTidBit;
