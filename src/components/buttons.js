import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFileDownload } from '@fortawesome/free-solid-svg-icons'

import BrandLogo from 'media/icons/logo192_white.png'

import { Logo } from 'components/image'

import './buttons.sass'


export const NavBarButton = (props) => {
  if (props.external) {
    return (
      <a className='navbar-button' href={props.url} target="_blank" rel="noopener noreferrer">
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
      <a className='sidebar-button' href={props.url} target="_blank" rel="noopener noreferrer">
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
  <button className='menu-button' onClick={props.onClick}>
    <FontAwesomeIcon className='icon' size="3x" icon={faBars}/>
  </button>
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

export const FileLink = (props) => (
  <a className='file-link smaller' href={props.url} target="_blank" rel="noopener noreferrer">
    <div className='icon-container'>
      <FontAwesomeIcon className='icon' icon={faFileDownload}/>
    </div>
    <div className='text'>
      {props.label}
    </div>
  </a>
)

const SocialIcon = styled.img`
  content: ${props => 'url("' + props.icon + '")'};
`

export const SocialLink = (props) => (
  <div className='social-link-container'>
    <a className='social-link' href={props.url}>
      <SocialIcon className='icon' icon={props.icon} />
    </a>
  </div>
)
