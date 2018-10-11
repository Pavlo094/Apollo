import React, { Component } from 'react';
import { isNil, isEmpty } from 'lodash';
import { HideOptionWrapper } from 'AppComponents';
import { CustomBox } from './CustomBox';


export class OverlayButton extends Component {
  constructor(props, context) {
    super(props, context);

  }

  onClickOverlayButton = (e) => {
    const { buttonFuncMap, data, tileData } = this.props;
    e.stopPropagation();
    if (!isNil(data.label)) {
      buttonFuncMap[data.label]({
        event: e,
        overlayButton: data.label,
        tileData,
        clickedButton: 'overlay',
      })
    }
  }

  onClickCustomBoxButton = (e, customBoxData) => {
    const { buttonFuncMap, data, tileData } = this.props;
    e.stopPropagation();
    if (!isNil(data.label)) {
      buttonFuncMap[data.label]({
        event: e,
        overlayButton: data.label,
        tileData,
        clickedButton: 'customBox',
        customBoxData,
      })
    }
  }

  render() {
    const { data, align, buttonFuncMap, selectedButton, tileData } = this.props;
    const containerClass = `button-type-${data.label}`;
    const buttonClass = `overlay-side-button ${align}-overlay-button`;
    const iconClassName = isNil(data.icon) ? '' : `fas ${data.icon}`;
    return (
      <div style={{
        position: 'relative',
        margin: '10px 0px',
      }}
      className={containerClass}
      onClick={this.onClickOverlayButton}
      >
        <div
          className={buttonClass}
          style={{
            backgroundColor: data.backgroundColor
          }}
          ><i className={iconClassName}></i></div>
          <CustomBox
            isHidden={selectedButton !== data.label}
            onClick={this.onClickCustomBoxButton}
            data={data}
            tileData={tileData}
            leftOffset={-30}
            topOffset={70}
          />
      </div>
    )
  }
}
