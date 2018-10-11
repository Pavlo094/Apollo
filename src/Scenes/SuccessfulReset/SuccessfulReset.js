import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'AppComponents'

class SuccessfulReset extends Component {
  constructor(props) {
    super(props);

  }

  onTouchContinue = () => {
    this.props.history.push('/login');
  }


  render() {
    return (
      <div id="flex-container">
        <div id="login-container">
          <h1 style={{ textAlign: 'center' }}>Your Password was successfully reset</h1>
          <Button
            className="primary submit-button"
            type='button'
            onClick={this.onTouchContinue}
          >Continue</Button>
        </div>
      </div>
    )
  }
}

export default withRouter(SuccessfulReset);
