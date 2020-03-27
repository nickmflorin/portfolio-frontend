import React from 'react';
import styled from 'styled-components';

import { NavBarButton, LogoButton } from './buttons'

var classNames = require('classnames');


const NavBarButtonContainer = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
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
  background-color: ${props => (props.overlay && props.theme.colors.navbar)};
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
      <NavBarContainer overlay={this.props.overlay}>
        <NavBarLeftContainer>
          <LogoButton to="/" />
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
