import React from 'react';

const YT_REGEX = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

export function YoutubeFrame({ url, isValidLink }) {
  if (url === '' || isValidLink === false) {
    return (
      <div style={{ height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <i className='fab fa-youtube'></i>
      </div>
    );
  }
  return (
    <iframe
      width="100%"
      height="350px"
      src={'https://www.youtube.com/embed/' + url.match(YT_REGEX)[2] + '?autoplay=0&enablejsapi=1'}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen>
    </iframe>
  )
}
