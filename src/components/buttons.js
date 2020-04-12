import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faFileDownload } from '@fortawesome/free-solid-svg-icons'

import BrandLogo from 'media/icons/logo192_white.png'

import { Logo } from 'components/image'

import './buttons.sass'


export const NavBarButton = (props) => {  // eslint-disable-line
  if (props.external) {
    return (
      <a className="navbar-button" href={props.url} rel="noopener noreferrer" target="_blank">
        {props.label}
      </a>
    )
  }
  return (
    <Link className="navbar-button" to={props.url} >
      {props.label}
    </Link>
  )
}

export const SideBarButton = (props) => {  // eslint-disable-line
  if (props.external) {
    return (
      <a className="sidebar-button" href={props.url} rel="noopener noreferrer" target="_blank">
        <div className="icon-container">
          <FontAwesomeIcon icon={props.icon} />
        </div>
        <div className="text">
          {props.label}
        </div>
      </a>
    )
  }
  return (
    <Link className="sidebar-button" onClick={props.onClick} to={props.url}>
      <div className="icon-container">
        <FontAwesomeIcon icon={props.icon} />
      </div>
      <div className="text">
        {props.label}
      </div>
    </Link>
  )
}

export const MenuButton = (props) => (  // eslint-disable-line
  <a className="menu-button" onClick={props.onClick}>
    <FontAwesomeIcon className="icon" icon={faBars} size="3x"/>
  </a>
)

export const BrandButton = (props) => (  // eslint-disable-line
  <Link className="brand-button" to={props.to}>
    <Logo onClick={props.onClick} src={BrandLogo}/>
  </Link>
)

export const LogoLink = (props) => (  // eslint-disable-line
  <a className="logo-link" href={props.href}>
    <Logo src={props.src} />
  </a>
)

export const FileLink = (props) => (  // eslint-disable-line
  <a className="file-link smaller" href={props.url} rel="noopener noreferrer" target="_blank">
    <div className="icon-container">
      <FontAwesomeIcon className="icon" icon={faFileDownload}/>
    </div>
    <div className="text">
      {props.label}
    </div>
  </a>
)

const SocialIcon = styled.img`
  content: ${props => 'url("' + props.icon + '")'};
`

export const SocialLink = (props) => (  // eslint-disable-line
  <div className="social-link-container">
    <a className="social-link" href={props.url}>
      <SocialIcon className="icon" icon={props.icon} />
    </a>
  </div>
)
