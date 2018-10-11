import React, { Component } from 'react';
import { isNil } from 'lodash';
import { Network } from 'AppServices';

class ReCaptcha extends Component {
  constructor() {
    super();
    const reCaptchaIsLoaded = window.reCaptchaInterface.checkIfLoaded();
    if (!reCaptchaIsLoaded) {
      window.reCaptchaInterface.setCallbackFunction(this.onReCaptchaLoaded)
    }
    this.state = {
      reCaptchaIsLoaded,
    }
  }

  componentDidMount() {
    if (this.state.reCaptchaIsLoaded) {
      grecaptcha.render('jh-reCaptcha', {
        'sitekey': '6LfTc0wUAAAAAIOx8Zxwf1rhZe7AHpkxJmzpOekR',
        callback: this.handleGoogleResponse,
      })
    }
  }

  handleGoogleResponse = (response) => {
    Network.service['recaptcha'].post({
      data: response,
    })
      .then(result => {
        this.props.onResponse(null, result);
      })
      .catch(err => {
        this.props.onResponse(err);
      })

  }

  onReCaptchaLoaded = () => {
    this.setState({
      reCaptchaIsLoaded: window.reCaptchaInterface.checkIfLoaded(),
    });
    grecaptcha.render('jh-reCaptcha', {
      'sitekey': '6LfTc0wUAAAAAIOx8Zxwf1rhZe7AHpkxJmzpOekR',
      callback: this.handleGoogleResponse,
    })
  }

  render() {
    return (
      <div id='jh-reCaptcha'></div>
    )
  }
}

export { ReCaptcha };
