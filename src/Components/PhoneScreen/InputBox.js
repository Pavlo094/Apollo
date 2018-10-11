import React, { Component } from 'react';
import { get } from 'lodash';
import { Button } from 'AppComponents';

export class InputBox extends Component {
  constructor(props, context) {
    super(props, context);

    const overlayButtonLabel = props.data.label;
    this.state = {
      inputText: get(props.tileData, overlayButtonLabel, ''),
    };
  }

  onTextChange = (e) => {
    this.setState({
      inputText: e.target.value,
    })
  }

  onClickConfirm = (e) => {
    this.props.onClick(e, {
      inputText: this.state.inputText,
      boxType: 'inputBox',
    })
  }

  render() {
    const { onClick, data, topOffset, leftOffset } = this.props;
    return (
      <div style={{
        backgroundColor: 'orange',
        position: 'absolute',
        top: topOffset,
        left: leftOffset,
        zIndex: 10,
      }}>
      <div style={{ paddingLeft: 5 }}>
        <div style={{
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '20px solid red'
        }}></div>
      </div>
      <input
        placeholder={data.inputBox.placeHolder}
        onChange={this.onTextChange}
        value={this.state.inputText}
        style={{
          height: 100,
          width: 300,
          backgroundColor: 'yellow',
      }}></input>
        <Button
          onClick={this.onClickConfirm}
          style={{
            height: 40,
            backgroundColor: 'green',
          }}
        >Confirm</Button>
      </div>
    )
  }
}
