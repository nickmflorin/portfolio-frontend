import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './icons.sass'


export const IconizedText = (props) => (  // eslint-disable-line
  <p className="iconized iconized-text">
    <span className="icon-container">
      <FontAwesomeIcon className="icon" icon={props.icon}/>
    </span>
    <span className="text">
      {props.children}
    </span>
  </p>
)

export const IconizedHeader = (props) => (  // eslint-disable-line
  <h4 className="iconized iconized-header margin-b-14">
    <span className="icon-container">
      <FontAwesomeIcon className="icon" icon={props.icon}/>
    </span>
    <span className="text">
      {props.children}
    </span>
  </h4>
)
