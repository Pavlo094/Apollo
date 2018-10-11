import React, { Component } from 'react';
import { get } from 'lodash';

export class PhoneTitle extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      inputText: get(props.data, 'postTitle', ''),
    };
  }

  onChangeText = (e) => {
    this.setState({
      inputText: e.target.value,
    })
  }

  onBlur = () => {
    this.props.updateTitle(this.state.inputText);
  }

  render() {
    return (
      <div className='phone-title-container'>
          <input
            placeholder={'Enter Title Here'}
            className='phone-title-input'
            value={this.state.inputText}
            onChange={this.onChangeText}
            onBlur={this.onBlur}
          ></input>
          <div className='phone-title-edit'><i className='fas fa-pencil-alt fa-2x' aria-hidden='true'></i></div>
      </div>
    );
  }
}
