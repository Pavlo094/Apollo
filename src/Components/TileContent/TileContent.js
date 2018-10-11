import React from 'react';
import { SingleImage } from 'AppComponents';

const YT_REGEX = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/

export function TileContent({ tileData: tile }) {
  if (tile.type === 'single-image') {
    return (
      <SingleImage
        url={tile.content[0][0]}
      />
    )
  }

  if (tile.type === 'youtube') {
    return (
      <iframe
        width="600px"
        height="350px"
        src={'https://www.youtube.com/embed/' + tile.content.match(YT_REGEX)[2] + '?autoplay=0&enablejsapi=1'}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen>
      </iframe>
    )
  }

  if (tile.type === 'text') {
    const readOnlyContent = tile.content[0][0].replace(/contenteditable="true"/g, 'contenteditable="false"');

    return (
      <div className="RichEditor-preview">
        <div className="RichEditor-container">
          <div className="RichEditor-root none-padding">
            <div
              className="RichEditor-editor RichEditor-hidePlaceholder none-padding"
              dangerouslySetInnerHTML={{ __html: readOnlyContent }}
              id="text-tile"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div></div>
  )
}
