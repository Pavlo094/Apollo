import React, { Component } from 'react';
import { isNil } from 'lodash';
import { CustomBox } from './CustomBox';

export class CenterOverlay extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };
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
    const { tileData, buttons, buttonFuncMap, data, selectedButton } = this.props;
    const containerClass = `button-type-${data.label}`;
    return (
      <div id='center-overlay'>
        <div style={{ color: 'red', position: 'relative' }} className={containerClass} onClick={this.onClickOverlayButton}>
          <i className='fas fa-link fa-2x'></i>
          <CustomBox
            isHidden={selectedButton !== data.label}
            onClick={this.onClickCustomBoxButton}
            data={data}
            tileData={tileData}
            leftOffset={0}
            topOffset={40}
          />
        </div>
      </div>
    )
  }
}
