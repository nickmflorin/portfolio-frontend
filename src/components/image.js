import React from 'react';

import './image.sass'


export const Logo = (props) => (
  <img
    className='logo'
    alt="Could not load."
    src={props.src}
    onError={props.onError}
  />
)
