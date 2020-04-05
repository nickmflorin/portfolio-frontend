import React from 'react';

import './image.sass'


export const Logo = (props) => (
  <img
    className='logo'
    alt="Need to put in a graphic here."
    src={props.src}
    onError={props.onError}
  />
)
