import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { NavBarButton } from './buttons'
import Logo from 'media/icons/logo192_white.png'
import './nav.scss'

var classNames = require('classnames');


const NavBarButtonContainer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 16px;
  padding-bottom: 16px;
`;


class NavBarItem extends React.Component {
  render() {
    return (
      <NavBarButtonContainer>
        <NavBarButton
          link={this.props.item.link}
          label={this.props.item.label}
        />
      </NavBarButtonContainer>
    )
  }
}


const NavBarContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  &.overlay {

  }
`;


const NavBarLeftContainer = styled.div`
  flex-grow: 100;
  display: flex;
  padding-left: 6px;
`;


const NavBarRightContainer = styled.div`
  display: flex;
  padding-right: 6px;
`;


export class NavBar extends React.Component {
  render() {
    return (
      <NavBarContainer>
        <NavBarLeftContainer>
          <Link to="/" className="nav-bar-logo">
          <div className="logo-container">
            <img className="logo" src={Logo} />
          </div>
          </Link>
        </NavBarLeftContainer>
        <NavBarRightContainer>
          {this.props.items.map((item) => {
            return <NavBarItem key={item.id} item={item} />
          })}
        </NavBarRightContainer>
      </NavBarContainer>
    );
  }
}

export default NavBar;
