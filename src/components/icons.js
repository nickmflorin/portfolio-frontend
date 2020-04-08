import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './icons.sass'


export const IconizedText = (props) => (
  <p className="iconized iconized-text">
    <span className='icon-container'>
      <FontAwesomeIcon className='icon' icon={props.icon}/>
    </span>
    <span className='text'>
      {props.children}
    </span>
  </p>
)

export const IconizedHeader = (props) => (
  <h7 className="iconized iconized-header">
    <span className='icon-container'>
      <FontAwesomeIcon className='icon' icon={props.icon}/>
    </span>
    <span className='text'>
      {props.children}
    </span>
  </h7>
)
