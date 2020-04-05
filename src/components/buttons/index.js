import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import BrandLogo from 'media/icons/logo192_white.png'

import { Logo } from 'components/image'
import SocialButton from './social'
import FileLink from './file'

import './buttons.sass'

export { SocialButton, FileLink };


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
        <div className='icon-container'>
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <div className='text'>
          {props.label}
        </div>
      </a>
    )
  }
  return (
    <Link className='sidebar-button' to={props.url} onClick={props.onClick}>
      <div className='icon-container'>
        <FontAwesomeIcon icon={props.icon} />
      </div>
      <div className='text'>
        {props.label}
      </div>
    </Link>
  )
}

export const MenuButton = (props) => (
  <a className='menu-button' onClick={props.onClick}>
    <FontAwesomeIcon className='icon' size="3x" icon={faBars}/>
  </a>
)

export const BrandButton = (props) => (
  <Link className='brand-button' to={props.to}>
    <img className='logo' src={BrandLogo} onClick={props.onClick}/>
  </Link>
)

export const LogoLink = (props) => (
  <a className='logo-link' href={props.href}>
    <Logo src={props.src} onError={props.onError} />
  </a>
)
