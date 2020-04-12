import React from 'react';

import './image.sass'


export const onImageLoadError = (event) => {
  event.target.src = 'https://react.semantic-ui.com/images/wireframe/image.png'
}

export const Image = (props) => (
  <img
  alt=""
  onError={onImageLoadError}
  src={props.src}
  {...props}
  />
)

export const Logo = (props) => (
  <Image className={"logo"} {...props}/>
)

export const Headshot = (props) => (  // eslint-disable-line
  <div className="headshot-container">
    <Image className="headshot" {...props}/>
  </div>
)
