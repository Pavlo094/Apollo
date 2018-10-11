import React, { Component } from 'react';
import { get, isNil } from 'lodash';
import { Button } from 'AppComponents';
import { YoutubeFrame } from './YoutubeFrame';
import { YoutubeInput } from './YoutubeInput';
import { YoutubeValidationText } from './YoutubeValidationText';

const YT_REGEX = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

export class Youtube extends Component {
  constructor(props, context) {
    super(props, context);

    const url = get(props, 'url', '');

    this.state = {
      urlText: url,
      validationErrorText: '',
    };
  }

  onChangeUrlText = (e) => {
    const urlText = e.target.value;
    const isValidLink = this.validateLink(urlText);
    this.setState({
      urlText,
      validationErrorText: isValidLink || urlText === '' ? '' : 'invalid youtube link',
    })
  }

  validateLink = (url) => {
    const match = url.match(YT_REGEX);
    if (isNil(match)) {
      return false;
    }
    return match && match[2].length === 11; // returns true if valid link format
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isEditHidden && !this.props.isEditHidden) {
      this.setState({
        urlText: this.props.url,
        validationErrorText: '',
      })
    }
  }

  handleConfirmYoutubeUrl = () => {
    if (this.state.validationErrorText === '' && this.state.urlText !== '') {
      const shortYouTubeId = this.state.urlText.match(YT_REGEX)[2];
      const shortUrl = `https://youtu.be/${shortYouTubeId}`;
      this.props.onSubmitUrl(this.state.urlText);
    }
  }

  render() {
    const { isEditHidden, url } = this.props;
    const { urlText, validationErrorText } = this.state;
    const displayedUrl = isEditHidden ? url : urlText;
    return (
      <div style={{ width: '100%' }}>
        <YoutubeFrame
          url={urlText}
          isValidLink={validationErrorText === ''}
        />
        <YoutubeInput
          isHidden={isEditHidden}
          value={urlText}
          onChange={this.onChangeUrlText}
        />
        <YoutubeValidationText
          validationErrorText={validationErrorText}
        />
        <Button
          onClick={this.handleConfirmYoutubeUrl}
          isHidden={isEditHidden}
        >
          <i className='fas fa-check-circle' style={{ flex: 1}}></i>
        </Button>
      </div>
    );
  }
}
