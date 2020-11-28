import React from 'react';

const Background = props => (
  <img
    src="assets/background/background-1-1.png"
    alt="race background"
    style={{
        minWidth: '100vw',
        height: '100vh',
        position: 'absolute',
        zIndex: '-100',
        left: props.left || '0px',
        top: 0,
      }}
  />
);

export default Background;

