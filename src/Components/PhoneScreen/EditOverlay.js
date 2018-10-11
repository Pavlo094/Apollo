import React from 'react';
import { OverlayButton } from './OverlayButton';
import { CenterOverlay } from './CenterOverlay';

export function EditOverlay({ isHidden, buttons, buttonFuncMap, isDraftTile, noCenterOverlay, selectedButton, tileData }) {
  const args = {
    buttonFuncMap,
    selectedButton,
    tileData,
  }
  if (noCenterOverlay) {
    return [
      <div className='overlay-wing left-wing' key={0}>
        {buttons.left.map((buttonData, index) => (
          <OverlayButton align={'left'} data={buttonData} key={index} {...args} />
        ))}
      </div>,
      <div className='overlay-wing right-wing' key={1}>
        {buttons.right.map((buttonData, index) => (
          <OverlayButton align={'right'} data={buttonData} key={index} {...args} />
        ))}
      </div>
    ]
  }
  return (
    <div className='phone-edit-overlay'>
      <CenterOverlay data={buttons.center} {...args}/>
      <div className='overlay-wing left-wing'>
        {buttons.left.map((buttonData, index) => (
          <OverlayButton align='left' data={buttonData} key={index} {...args}  />
        ))}
      </div>
      <div className='overlay-wing right-wing'>
        {buttons.right.map((buttonData, index) => (
          <OverlayButton align={'right'} data={buttonData} key={index} {...args}  />
        ))}
      </div>
    </div>
  )
}
