import React from 'react';

import './image.sass'


export const Logo = (props) => (
  <img
    alt="Could not load."
    className="logo"
    onError={props.onError}
    src={props.src}
  />
)
