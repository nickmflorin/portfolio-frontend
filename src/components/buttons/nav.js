import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Private_Button = styled(Link)`
  font-family: 'Roboto', sans-serif;

  font-size: 1em;
  padding: 6px 8px;
  line-height: 18px;

  border: 1px solid #FFFFFF;
  border-radius: 4px !important;
  background: transparent;
  color: #FFFFFF;

  width: 100%;
  margin: 0 auto;

  text-transform: uppercase;

  &:hover {
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.gray2};
  }
`;

class NavBarButton extends React.Component {
  render(){
    return (
      <Private_Button to={this.props.link} >
        {this.props.label}
      </Private_Button>
    )
  }
}

export default NavBarButton;
