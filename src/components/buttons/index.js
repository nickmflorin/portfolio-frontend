import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import SocialButton from './social'
import LogoButton from './logo'
import FileLink from './file'

import './buttons.sass'

export { SocialButton, LogoButton, FileLink };


export const NavBarButton = (props) => {
  if (props.external) {
    return (
      <a className='navbar-button' href={props.url} target="_blank">
        {props.label}
      </a>
    )
  }
  return (
    <Link className='navbar-button' to={props.url} >
      {props.label}
    </Link>
  )
}

export const SideBarButton = (props) => {
  if (props.external) {
    return (
      <a className='sidebar-button' href={props.url} target="_blank">
        {props.label}
      </a>
    )
  }
  return (
    <Link className='sidebar-button' to={props.url} onClick={props.onClick}>
      {props.label}
    </Link>
  )
}

export const MenuButton = (props) => (
  <a className='menu-button' onClick={props.onClick}>
    <FontAwesomeIcon className='icon' size="3x" icon={faBars}/>
  </a>
)
