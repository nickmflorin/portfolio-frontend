import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LogoIcon from 'media/icons/logo192_white.png'


const LogoLink = styled(Link)`
  display: flex;
  height: 50px;
  width: 50px;
  text-align: center;
  padding: 5px 0px;
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
  display: block;
  margin: 0 auto;
  opacity:1.0;

  &:hover {
    opacity: 0.7;
  }
`;


class LogoButton extends React.Component {
  render() {
      return (
        <LogoLink to={this.props.to}>
          <Logo src={LogoIcon} onClick={this.props.onClick}/>
        </LogoLink>

      )
  }
}

export default LogoButton;
