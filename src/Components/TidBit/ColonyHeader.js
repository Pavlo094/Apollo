import React, { Component } from 'react';
import { ColonyHex } from 'AppComponents';

const UUID_TO_ICONS = {
  "824e0bb5-7c49-473a-8a1a-03af223b6515": 'fas fa-book', // Word of the Day
  "9daa344c-d52a-424e-8d53-c45c92f77530": 'far fa-grin-squint-tears', // LOL
  "0cb7ef28-9823-44b8-82a4-dc7c964967a3": 'far fa-lightbulb', // Fun Facts
  "b2cc4fd8-cc49-4367-820c-587f7947b5fd": 'fas fa-music', // Music
  "341ec46a-f40e-40f9-9e87-e20526c6770c": 'fas fa-plane', // Where to?
  "e455810b-9d09-496c-8759-a6a9d874166c": 'fab fa-bitcoin', // Cryptobuzz
  "a8ea00fd-0dbb-414b-9c38-53b972ac256f": 'far fa-newspaper', // World News
  "f59d076a-4938-490e-ad60-058ac1702b06": 'fas fa-desktop' // Techie
}

export class ColonyHeader extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let iconClass = UUID_TO_ICONS[this.props.colony.uuid];

    return (
      <div>
        <div className='tidbit-hex-container'>
          <ColonyHex
            width={143}
            height={143}
            backgroundColor='#0F1B39'
          />
          <i className={iconClass}></i>
        </div>
        <div className='tidbit-title-container'>
          {this.props.colony.name}
        </div>
      </div>
    );
  }
}
